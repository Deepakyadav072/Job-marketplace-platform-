import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-purple-600 hover:text-purple-800 transition-colors">
          FreelancePro
        </Link>

        <div className="flex items-center space-x-6">
          {!user && (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-purple-600 font-semibold transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 font-semibold transition-colors"
              >
                Signup
              </Link>
            </>
          )}

          {user && user.role === "freelancer" && (
            <>
              <Link
                to="/explore-jobs"
                className="text-gray-700 hover:text-purple-600 font-semibold transition-colors"
              >
                Explore Jobs
              </Link>
              <Link
                to="/my-orders"
                className="text-gray-700 hover:text-purple-600 font-semibold transition-colors"
              >
                My Orders
              </Link>
              <Link
                to="/accepted-jobs"
                className="text-gray-700 hover:text-purple-600 font-semibold transition-colors"
              >
                Accepted Jobs
              </Link>
            </>
          )}

          {user && user.role === "client" && (
            <>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-purple-600 font-semibold transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/post-job"
                className="text-gray-700 hover:text-purple-600 font-semibold transition-colors"
              >
                Post Job
              </Link>
            </>
          )}

          {user && (
            <>
              <Link
                to="/profile"
                className="text-gray-700 hover:text-purple-600 font-semibold transition-colors"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 font-semibold transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;