import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PdfViewer from "./pages/PdfViewer";
import Navbar from "./components/Navbar";

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/viewer/:pdfId"
          element={token ? <PdfViewer /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
