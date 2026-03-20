// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-800 via-pink-700 to-indigo-800 text-white mt-12 rounded-t-3xl">
      <div className="max-w-6xl mx-auto py-8 px-6 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-2xl mb-2">MicroJobs</h3>
          <p className="text-gray-200">Your platform to earn, learn and grow.</p>
        </div>
        <div>
          <h3 className="font-semibold text-xl mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
            <li><Link to="/login" className="hover:text-yellow-400">Login</Link></li>
            <li><Link to="/signup" className="hover:text-yellow-400">Sign Up</Link></li>
            <li><Link to="/about" className="hover:text-yellow-400">About Us</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-xl mb-2">Subscribe</h3>
          <div className="flex">
            <input type="email" placeholder="Your email" className="w-full rounded-l-lg px-4 py-2 text-gray-800" />
            <button className="bg-yellow-400 text-purple-800 px-4 py-2 rounded-r-lg font-bold hover:bg-yellow-500">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 text-center text-gray-300 text-sm py-2">&copy; 2025 MicroJobs. All rights reserved.</div>
    </footer>
  );
};

export default Footer; // <--- Default export sahi se hai
