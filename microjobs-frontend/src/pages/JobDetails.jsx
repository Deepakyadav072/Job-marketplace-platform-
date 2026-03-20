import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";

const JobDetails = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axiosInstance.get(`/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error("Error fetching job details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = () => {
    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }
    if (user.role !== "freelancer") {
      alert("Only freelancers can apply");
      return;
    }
    navigate(`/apply/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-28 flex justify-center items-center bg-gray-50">
        <p className="text-lg font-semibold text-purple-700 animate-pulse">
          Loading job details...
        </p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen pt-28 flex justify-center items-center bg-gray-50">
        <p className="text-lg text-gray-600">Job not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
            <span className="bg-purple-100 text-purple-700 text-xl px-4 py-2 rounded-full font-semibold">
              ₹{job.budget}
            </span>
          </div>
          
          <div className="flex gap-4 mb-6">
            <span className="bg-gray-100 px-3 py-1 rounded-lg text-gray-700">
              {job.category || "General"}
            </span>
            <span className="bg-gray-100 px-3 py-1 rounded-lg text-gray-700">
              {job.timeline || "Flexible"}
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Description</h2>
            <p className="text-gray-600 leading-relaxed">{job.description}</p>
          </div>

          {job.requirements && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">Requirements</h2>
              <p className="text-gray-600 leading-relaxed">{job.requirements}</p>
            </div>
          )}

          {job.skills && job.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {user && user.role === "freelancer" && (
            <div className="flex gap-4">
              <button
                onClick={handleApply}
                className="px-8 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 font-semibold transition-colors"
              >
                Apply Now
              </button>
              <Link
                to="/explore-jobs"
                className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 font-semibold transition-colors"
              >
                Back to Jobs
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;