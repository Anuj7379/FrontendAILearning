import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrainCircuit, Mail, Lock, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/authContext.jsx";
import authService from "../../services/authService.js";
import Logo from "../../assets/Logo.png";
import loginBg from "../../assets/loginBg.jpg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authService.login(email, password);

      //  correct response handling
      login(response.user, response.token);

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="bg-white/90 p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <img src={Logo} alt="Logo" className="w-32 h-18 " />
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-600">Please login to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <div
              className={`flex items-center border ${
                focusedField === "email"
                  ? "border-green-500"
                  : "border-gray-300"
              } rounded-md`}
            >
              <Mail size={20} className="text-gray-400 ml-2" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-3 py-2 focus:outline-none rounded-md"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <div
              className={`flex items-center border ${
                focusedField === "password"
                  ? "border-green-500"
                  : "border-gray-300"
              } rounded-md`}
            >
              <Lock size={20} className="text-gray-400 ml-2" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-3 py-2 focus:outline-none rounded-md"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md transition duration-200 flex items-center justify-center
              ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-500 text-white"}
            `}
          >
            {loading ? "Logging in..." : "Login"}
            {!loading && <ArrowRight size={20} className="ml-2" />}
          </button>
        </form>

        {/* Footer */}
        <p className="text-gray-600 mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
