import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import workerSrc from "pdfjs-dist/legacy/build/pdf.worker.min.mjs?url";
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function PdfViewer() {
    const { pdfId } = useParams();
    const [pdfUrl, setPdfUrl] = useState("");
    const [numPages, setNumPages] = useState(null);
    const [highlights, setHighlights] = useState([]);
    const [pageWidth, setPageWidth] = useState(null);
    const token = localStorage.getItem("token");
    const viewerRef = useRef(null);

    // Resize handler for responsiveness
    useEffect(() => {
        const updateWidth = () => {
            if (viewerRef.current) {
                setPageWidth(viewerRef.current.offsetWidth);
            }
        };
        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    // Load PDF
    useEffect(() => {
        const fetchPdf = async () => {
            try {
                const res = await axios.get(`${API}/pdfs`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const pdf = res.data.find((p) => p._id === pdfId);
                if (pdf) setPdfUrl(pdf.url);
            } catch (err) {
                console.error(err);
            }
        };
        fetchPdf();
    }, [pdfId]);

    // Load highlights
    useEffect(() => {
        const fetchHighlights = async () => {
            try {
                const res = await axios.get(`${API}/highlights/${pdfId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setHighlights(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchHighlights();
    }, [pdfId]);

    // Save highlight
    const handleMouseUp = async () => {
        const selection = window.getSelection();
        if (!selection || selection.toString().trim() === "") return;

        const text = selection.toString();
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        const containerRect = viewerRef.current.getBoundingClientRect();
        const position = {
            x: rect.x - containerRect.x,
            y: rect.y - containerRect.y,
            width: rect.width,
            height: rect.height,
        };

        try {
            const res = await axios.post(
                `${API}/highlights`,
                { pdfId, page: 1, text, position },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setHighlights((prev) => [...prev, res.data]);
            selection.removeAllRanges();
        } catch (err) {
            console.error("Error saving highlight:", err);
        }
    };

    // Undo last highlight
    const undoLastHighlight = async () => {
        if (highlights.length === 0) return;
        const lastHighlight = highlights[highlights.length - 1];

        try {
            await axios.delete(`${API}/highlights/${lastHighlight._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setHighlights((prev) => prev.slice(0, -1));
        } catch (err) {
            console.error("Error deleting highlight:", err);
        }
    };

    return (
        <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                <h1 className="text-lg font-bold">PDF Viewer with Highlights</h1>
                <button
                    onClick={undoLastHighlight}
                    disabled={highlights.length === 0}
                    className={`px-4 py-2 rounded text-white ${highlights.length === 0
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                >
                    Undo Highlight
                </button>
            </div>

            <div
                ref={viewerRef}
                className="relative border rounded shadow max-w-full overflow-x-hidden"
                onMouseUp={handleMouseUp}
            >
                {pdfUrl && (
                    <Document
                        file={pdfUrl}
                        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                        className="flex flex-col items-center"
                    >
                        {Array.from(new Array(numPages), (el, index) => (
                            <Page
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                                width={pageWidth || 600}
                            />
                        ))}
                    </Document>
                )}

                {/* Highlight overlays */}
                {highlights.map((h) => (
                    <div
                        key={h._id}
                        className="absolute bg-yellow-300 opacity-40 pointer-events-none"
                        style={{
                            top: h.position.y,
                            left: h.position.x,
                            width: h.position.width,
                            height: h.position.height,
                        }}
                        title={h.text}
                    />
                ))}
            </div>
        </div>
    );
}
