import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthServices from "../../Services/AuthServices";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "../../Utils/ErrorMessage";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Register function
  const registerHandler = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return toast.error("All fields are required!");
    }

    try {
      setLoading(true);
      const res = await AuthServices.registerUser(formData);
      toast.success(res.data.message);
      navigate("/login");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <div className="text-center text-white mb-6">
          <i className="fa-solid fa-circle-user text-6xl mb-4"></i>
          <h2 className="text-2xl font-semibold">Create an Account</h2>
          <p className="text-sm text-gray-300">Sign up to get started</p>
        </div>
        <form onSubmit={registerHandler}>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold py-3 rounded-lg"
          >
            {loading ? "Registering..." : "REGISTER"}
          </button>
          <p className="text-center text-gray-300 text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
