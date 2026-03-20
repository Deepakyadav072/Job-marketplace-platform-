import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can call backend API to send reset email
    console.log("Password reset email sent to:", email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 px-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 relative z-10">
        <h2 className="text-3xl font-bold text-purple-700 mb-4 text-center">
          Forgot Password
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        {submitted ? (
          <div className="text-center">
            <p className="text-green-600 font-semibold mb-4">
              Password reset link sent successfully!
            </p>
            <Link
              to="/login"
              className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg shadow hover:shadow-lg transition"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-purple-600 text-white font-semibold px-6 py-2 rounded-lg shadow hover:shadow-lg transition"
            >
              Send Reset Link
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-gray-500 text-sm">
          Remember your password?{" "}
          <Link to="/login" className="text-purple-700 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
