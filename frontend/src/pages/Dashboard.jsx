import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Dashboard() {
    const [pdfs, setPdfs] = useState([]);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const fetchPdfs = async () => {
        try {
            const res = await axios.get(`${API}/pdfs`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPdfs(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append("pdf", file);

        try {
            await axios.post(`${API}/pdfs/upload`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFile(null);
            fetchPdfs();
        } catch (err) {
            alert(err.response?.data?.message || "Upload failed");
        }
    };

    useEffect(() => {
        fetchPdfs();
    }, []);

    return (
        <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
                <h1 className="text-2xl font-bold">My Library</h1>
            </div>

            <form
                onSubmit={handleUpload}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6"
            >
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="border rounded px-2 py-1 text-sm w-full sm:w-auto"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
                >
                    Upload
                </button>
            </form>

            {/* PDF list */}
            <ul className="space-y-2">
                {pdfs.map((pdf) => (
                    <li
                        key={pdf._id}
                        className="p-3 bg-gray-100 rounded cursor-pointer hover:bg-gray-200 text-sm sm:text-base truncate"
                        onClick={() => navigate(`/viewer/${pdf._id}`)}
                    >
                        {pdf.filename}
                    </li>
                ))}
            </ul>
        </div>
    );
}
