import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [proposal, setProposal] = useState("");
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    if (!proposal) return alert("Write proposal first");

    // 🔥 DEBUG CHECK
    const storedUser = localStorage.getItem("user");
    console.log("USER:", storedUser);

    setLoading(true);
    try {
      const res = await axiosInstance.post(
        `/applications/apply/${id}`,
        { proposal }
      );

      alert("Applied Successfully 🚀");
      navigate("/my-orders");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error applying");
    }
    setLoading(false);
  };

  // 🔥 not logged in
  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Apply for Job
        </h2>

        <textarea
          className="w-full border p-3 rounded-lg mb-4"
          placeholder="Write your proposal..."
          value={proposal}
          onChange={(e) => setProposal(e.target.value)}
        />

        <button
          onClick={handleApply}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700"
        >
          {loading ? "Submitting..." : "Submit Proposal"}
        </button>

      </div>
    </div>
  );
};

export default ApplyJob;