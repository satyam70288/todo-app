import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import AuthServices from "../../Services/AuthServices"; // Adjust the import path

const Login = ({ setUser, setIsAuthenticated, setIsAdmin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const data = { email, password };
            const res = await AuthServices.loginUSer(data);

            toast.success(res.data.message);

            localStorage.setItem("todoapp", JSON.stringify(res.data)); // Store user in localStorage
            setUser(res.data);  
            setIsAuthenticated(true);
            setIsAdmin(res.data.role === "admin");

            navigate("/todo"); // Redirect to Todo page
        } catch (err) {
            toast.error("Invalid email or password!");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-sm">
                <div className="text-center text-white mb-6">
                    <i className="fa-solid fa-circle-user text-6xl mb-4"></i>
                    <h2 className="text-2xl font-semibold">Welcome Back</h2>
                    <p className="text-sm text-gray-300">Log in to your account</p>
                </div>
                <form onSubmit={loginHandler}>
                    <div className="mb-4">
                        <input
                            type="email"
                            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold py-3 rounded-lg"
                    >
                        LOGIN
                    </button>
                    <p className="text-center text-gray-300 text-sm mt-4">
                        Not a user?{" "}
                        <Link to="/register" className="text-blue-400 hover:text-blue-500">
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
