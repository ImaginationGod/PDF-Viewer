import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API}/auth/login`, form);
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm sm:max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Login
                </h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors"
                >
                    Login
                </button>

                <p className="text-sm mt-4 text-center text-gray-600">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
}
