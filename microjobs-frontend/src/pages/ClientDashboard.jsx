import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const ClientDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await axiosInstance.get("/jobs");

      const stored = JSON.parse(localStorage.getItem("user"));
      const currentUser = stored?.user || stored;

      const myJobs = res.data.filter(
        (job) => job.postedBy === currentUser._id
      );

      setJobs(myJobs);
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen pt-28 px-6">
      <h1 className="text-3xl mb-6">My Posted Jobs</h1>

      {jobs.map((job) => (
        <div key={job._id} className="bg-white p-4 mb-4 shadow">
          <h2>{job.title}</h2>

          <button
            onClick={() => navigate(`/applicants/${job._id}`)}
            className="bg-purple-600 text-white px-4 py-1 mt-2"
          >
            View Applicants
          </button>
        </div>
      ))}
    </div>
  );
};

export default ClientDashboard;