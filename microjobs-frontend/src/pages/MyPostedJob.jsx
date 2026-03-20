import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const MyPostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [jobStats, setJobStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/jobs/my"); // 🔥 important
        setJobs(res.data);

        // Fetch application statuses for each job
        const stats = {};
        await Promise.all(
          res.data.map(async (job) => {
            try {
              const applications = await axiosInstance.get(`/applications/job/${job._id}`);
              stats[job._id] = applications.data.reduce(
                (acc, app) => {
                  const status = app.status || "Pending";
                  acc.total += 1;
                  if (status === "Accepted") acc.accepted += 1;
                  else if (status === "Rejected") acc.rejected += 1;
                  else acc.pending += 1;
                  return acc;
                },
                { total: 0, accepted: 0, rejected: 0, pending: 0 }
              );
            } catch (err) {
              console.error("Failed to fetch applications for job", job._id, err);
            }
          })
        );

        setJobStats(stats);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const renderStatus = (jobId) => {
    const stats = jobStats[jobId];
    if (!stats) return null;

    return (
      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
        <div className="bg-green-50 text-green-700 px-3 py-2 rounded flex items-center justify-between">
          <span>Accepted</span>
          <span className="font-semibold">{stats.accepted}</span>
        </div>
        <div className="bg-red-50 text-red-700 px-3 py-2 rounded flex items-center justify-between">
          <span>Rejected</span>
          <span className="font-semibold">{stats.rejected}</span>
        </div>
        <div className="bg-yellow-50 text-yellow-700 px-3 py-2 rounded flex items-center justify-between">
          <span>Pending</span>
          <span className="font-semibold">{stats.pending}</span>
        </div>
        <div className="bg-gray-50 text-gray-700 px-3 py-2 rounded flex items-center justify-between">
          <span>Total</span>
          <span className="font-semibold">{stats.total}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-28 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl mb-6 font-bold">My Posted Jobs</h1>

        {loading ? (
          <p className="text-gray-600">Loading your jobs...</p>
        ) : jobs.length === 0 ? (
          <p>No jobs posted yet.</p>
        ) : (
          jobs.map((job) => (
            <div key={job._id} className="bg-white p-6 mb-6 shadow rounded-lg">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">{job.title}</h2>
                  <p className="text-gray-600 mt-2 line-clamp-3">{job.description}</p>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="text-gray-600">
                      <strong>Budget:</strong> ₹{job.budget}
                    </div>
                    <div className="text-gray-600">
                      <strong>Category:</strong> {job.category}
                    </div>
                  </div>

                  {renderStatus(job._id)}
                </div>

                <div className="flex flex-col gap-2 md:items-end">
                  <Link
                    to={`/applicants/${job._id}`}
                    className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-5 py-2 text-sm font-semibold text-white hover:bg-purple-700 transition"
                  >
                    View Applicants
                  </Link>
                  <Link
                    to={`/job/${job._id}`}
                    className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                  >
                    View Job Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyPostedJobs;