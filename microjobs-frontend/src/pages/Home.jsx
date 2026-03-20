import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaClipboardList, FaMoneyBillWave, FaChartLine } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";

const dummyJobs = [
  { id: 1, title: "Design Poster for College Fest" },
  { id: 2, title: "Write Python Script for Excel" },
  { id: 3, title: "Create Logo for Student Startup" },
];

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // 🔥 Redirect logged-in users automatically
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.role === "client") {
          navigate("/dashboard", { replace: true });
        } else if (parsedUser?.role === "freelancer") {
          navigate("/explore-jobs", { replace: true });
        }
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err);
      }
    }
  }, [navigate]);

  const handleTrackProgress = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role === "freelancer") {
      navigate("/my-orders");
    } else if (user.role === "client") {
      navigate("/dashboard");
    } else {
      navigate("/my-orders");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 flex flex-col">

      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-pink-400 rounded-full opacity-30 animate-pulse-slow"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[600px] h-[600px] bg-blue-400 rounded-full opacity-20 animate-pulse-slow"></div>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center mt-24 px-4">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          Get Freelance Jobs Instantly
        </h2>

        <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl">
          Connect with clients, showcase your skills, and earn while learning.
        </p>

        <Link
          to="/explore-jobs"
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-4 px-10 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          Explore Jobs
        </Link>
      </section>

      {/* Feature Cards */}
      <section className="relative z-10 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-20 px-4">

        {/* Post Job */}
        <Link
          to="/post-job"
          className="bg-white/90 backdrop-blur-md rounded-2xl p-8 text-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          <FaClipboardList size={40} className="mx-auto mb-4 text-purple-600" />
          <h3 className="text-2xl font-bold mb-4">Post Jobs</h3>
          <p className="text-gray-700">
            Clients can post tasks easily and manage responses.
          </p>
        </Link>

        {/* ⭐ Apply Job → freelancer only */}
        {user?.role !== "client" && (
          <Link
            to={`/apply/${dummyJobs[0].id}`}
            className="bg-white/90 backdrop-blur-md rounded-2xl p-8 text-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <FaMoneyBillWave size={40} className="mx-auto mb-4 text-green-500" />
            <h3 className="text-2xl font-bold mb-4">Apply & Earn</h3>
            <p className="text-gray-700">
              Students can apply, complete tasks, and get paid securely.
            </p>
          </Link>
        )}

        {/* Track Progress */}
        <div
          onClick={handleTrackProgress}
          className="cursor-pointer bg-white/90 backdrop-blur-md rounded-2xl p-8 text-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          <FaChartLine size={40} className="mx-auto mb-4 text-blue-500" />
          <h3 className="text-2xl font-bold mb-4">Track Progress</h3>
          <p className="text-gray-700">
            Track your applications, tasks and earnings.
          </p>
        </div>

      </section>

      {/* CTA */}
      <section className="relative z-10 text-center mt-24 mb-24 px-4">
        <h2 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">
          Ready to Start Your Freelance Journey?
        </h2>

        <Link
          to="/signup"
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-4 px-10 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          Join Now
        </Link>
      </section>

      <Footer />

      <style>
        {`
        @keyframes pulse-slow {
          0%,100%{transform:scale(1);opacity:0.3;}
          50%{transform:scale(1.2);opacity:0.5;}
        }
        .animate-pulse-slow{
          animation:pulse-slow 10s ease-in-out infinite;
        }
        `}
      </style>

    </div>
  );
};

export default Home;