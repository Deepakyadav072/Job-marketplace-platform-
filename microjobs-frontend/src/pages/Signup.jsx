import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("freelancer");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      const res = await axiosInstance.post("/auth/register", {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        role,
      });

      console.log("SIGNUP RESPONSE:", res.data);

      // ✅ CORRECT SAVE
      login({
        ...res.data.user,
        token: res.data.token,
      });

      // ✅ ROLE BASED REDIRECT
      if (res.data.user.role === "client") {
        navigate("/dashboard");
      } else {
        navigate("/explore-jobs");
      }

    } catch (err) {
      console.error("SIGNUP ERROR:", err);

      // Better error handling
      let errorMessage = "Signup failed. Please try again.";

      if (err.response) {
        // Server responded with error status
        errorMessage = err.response.data?.message || `Server error: ${err.response.status}`;
      } else if (err.request) {
        // Network error - request was made but no response
        errorMessage = "Network error. Please check your connection and try again.";
      } else {
        // Something else happened
        errorMessage = "An unexpected error occurred. Please try again.";
      }

      setError(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
          <p className="text-gray-600">Join our freelancing community</p>
        </div>

        {/* Role Selection - Moved Above Form */}
        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
            I want to:
          </label>
          <div className="space-y-4">
            <label className="flex items-center cursor-pointer p-4 rounded-lg border-2 border-transparent hover:border-purple-200 hover:bg-purple-50 transition-all">
              <input
                type="radio"
                name="role"
                value="freelancer"
                checked={role === "freelancer"}
                onChange={(e) => setRole(e.target.value)}
                className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500"
              />
              <div className="ml-4">
                <div className="font-semibold text-gray-900">Work as a Freelancer</div>
                <div className="text-sm text-gray-600">Apply for jobs and earn money doing what you love</div>
              </div>
            </label>
            <label className="flex items-center cursor-pointer p-4 rounded-lg border-2 border-transparent hover:border-purple-200 hover:bg-purple-50 transition-all">
              <input
                type="radio"
                name="role"
                value="client"
                checked={role === "client"}
                onChange={(e) => setRole(e.target.value)}
                className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500"
              />
              <div className="ml-4">
                <div className="font-semibold text-gray-900">Hire Freelancers</div>
                <div className="text-sm text-gray-600">Post jobs and find talented freelancers for your projects</div>
              </div>
            </label>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 font-semibold hover:text-purple-800 transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;