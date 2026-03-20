  import { useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  import axiosInstance from "../utils/axiosInstance";
  import { useAuth } from "../context/AuthContext";

  const ExploreJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { user } = useAuth();

    const fetchJobs = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await axiosInstance.get("/jobs");
        setJobs(res.data || []);
      } catch (err) {
        console.error("Error fetching jobs:", err.message);
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchJobs();
    }, []);

    if (loading) {
      return (
        <div className="min-h-screen pt-28 flex justify-center items-center bg-gray-50">
          <p className="text-lg font-semibold text-purple-700 animate-pulse">
            Loading jobs...
          </p>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Header Section */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl p-8 mb-10 shadow-lg text-center">
            <h1 className="text-3xl sm:text-4xl font-bold">
              Explore Freelance Jobs 🚀
            </h1>
            <p className="opacity-90 mt-2">
              Find opportunities and start earning today
            </p>
          </div>

          {error && (
            <div className="text-center mt-10">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchJobs}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Retry
              </button>
            </div>
          )}

          {!error && jobs.length === 0 && (
            <p className="text-gray-500 text-center text-lg mt-10">
              No jobs available at the moment.
            </p>
          )}

          {!error && jobs.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-2xl shadow-md p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border flex flex-col justify-between"
                >

                  <div>

                    <div className="flex justify-between items-start">

                      <h2 className="text-xl font-semibold text-purple-700">
                        {job.title || "Untitled Job"}
                      </h2>

                      <span className="bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full font-semibold">
                        ₹{job.budget || "N/A"}
                      </span>

                    </div>

                    <p className="text-gray-600 mt-3 line-clamp-3">
                      {job.description || "No description provided."}
                    </p>

                    <div className="flex justify-between mt-4 text-sm text-gray-500">

                      <span className="bg-gray-100 px-2 py-1 rounded">
                        {job.category || "General"}
                      </span>

                      <span className="bg-gray-100 px-2 py-1 rounded">
                        {job.timeline || "Flexible"}
                      </span>

                    </div>

                  </div>

                  <div className="flex justify-between items-center mt-6">

                    <Link
                      to={`/job/${job._id}`}
                      className="text-purple-700 font-semibold hover:underline"
                    >
                      View Details →
                    </Link>

                    {user?.role !== "client" && (
                      <Link
                        to={`/apply/${job._id}`}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition shadow"
                      >
                        Apply
                      </Link>
                    )}

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>
      </div>
    );
  };

  export default ExploreJobs;