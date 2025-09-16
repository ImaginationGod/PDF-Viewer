import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [menuOpen, setMenuOpen] = useState(false);

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center shadow-md relative">
            <div
                onClick={() => navigate("/")}
                className="text-xl font-bold hover:text-blue-300 cursor-pointer"
            >
                PDF Annotator
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:flex space-x-4">
                {token ? (
                    <>
                        <Link
                            to="/dashboard"
                            className="hover:text-blue-300 transition-colors flex items-center"
                        >
                            Dashboard
                        </Link>
                        <button
                            onClick={logout}
                            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded flex items-center"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="hover:text-blue-300 transition-colors"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="hover:text-blue-300 transition-colors"
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>

            {/* Mobile Hamburger */}
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="sm:hidden text-white focus:outline-none"
            >
                {menuOpen ? "✖" : "☰"}
            </button>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="absolute top-14 left-0 w-full bg-gray-800 flex flex-col items-center sm:hidden shadow-lg z-50">
                    {token ? (
                        <>
                            <Link
                                to="/dashboard"
                                onClick={() => setMenuOpen(false)}
                                className="py-2 w-full text-center hover:bg-gray-700"
                            >
                                Dashboard
                            </Link>
                            <button
                                onClick={() => {
                                    logout();
                                    setMenuOpen(false);
                                }}
                                className="py-2 w-full text-center bg-red-600 hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                onClick={() => setMenuOpen(false)}
                                className="py-2 w-full text-center hover:bg-gray-700"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                onClick={() => setMenuOpen(false)}
                                className="py-2 w-full text-center hover:bg-gray-700"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
