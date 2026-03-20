import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const Dashboard = () => {

  const { user } = useAuth();
  const [postedJobs, setPostedJobs] = useState([]);

  useEffect(() => {
    if (user?.role === "client") {
      const fetchPostedJobs = async () => {
        try {
          const res = await axiosInstance.get("/jobs/my");
          setPostedJobs(res.data);
        } catch (err) {
          console.error("Error fetching posted jobs:", err);
        }
      };

      fetchPostedJobs();
    }
  }, [user]);

  return (

    <div className="min-h-screen bg-gray-50 pt-28 px-6">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold text-purple-700 mb-10 text-center">
          Dashboard
        </h1>


        {/* CLIENT DASHBOARD */}

        {user?.role === "client" && (

          <>

            <div className="grid md:grid-cols-2 gap-6 mb-10">

              <Link
                to="/post-job"
                className="bg-white shadow-md p-8 rounded-2xl hover:shadow-xl transition border"
              >
                <h2 className="text-xl font-semibold text-purple-700 mb-2">
                  Post a Job
                </h2>

                <p className="text-gray-600">
                  Create a new job and hire freelancers.
                </p>
              </Link>


              <Link
                to="/my-posted-jobs"
                className="bg-white shadow-md p-8 rounded-2xl hover:shadow-xl transition border"
              >
                <h2 className="text-xl font-semibold text-purple-700 mb-2">
                  My Posted Jobs
                </h2>

                <p className="text-gray-600">
                  View and manage jobs you posted.
                </p>
              </Link>

            </div>

            {/* MY POSTED JOBS SECTION */}
            <div className="bg-white shadow-md rounded-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-purple-700">My Posted Jobs</h2>
                <Link
                  to="/my-posted-jobs"
                  className="text-purple-600 hover:text-purple-800 font-medium"
                >
                  View All →
                </Link>
              </div>

              {postedJobs.length === 0 ? (
                <p className="text-gray-600 text-center py-8">
                  No jobs posted yet. <Link to="/post-job" className="text-purple-600 hover:text-purple-800">Post your first job</Link>
                </p>
              ) : (
                <div className="space-y-4">
                  {postedJobs.slice(0, 3).map((job) => (
                    <div key={job._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h3>
                          <p className="text-gray-600 mb-3 line-clamp-2">{job.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                              {job.category}
                            </span>
                            <span className="font-medium text-green-600">₹{job.budget}</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Link
                            to={`/job/${job._id}`}
                            className="text-purple-600 hover:text-purple-800 font-medium text-sm"
                          >
                            View Details →
                          </Link>
                          <Link
                            to={`/applicants/${job._id}`}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                          >
                            View Applicants →
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </>

        )}



        {/* FREELANCER DASHBOARD */}

        {user?.role === "freelancer" && (

          <div className="grid md:grid-cols-2 gap-6">

            <Link
              to="/explore-jobs"
              className="bg-white shadow-md p-8 rounded-2xl hover:shadow-xl transition border"
            >
              <h2 className="text-xl font-semibold text-purple-700 mb-2">
                Explore Jobs
              </h2>

              <p className="text-gray-600">
                Browse all available jobs.
              </p>
            </Link>


            <Link
              to="/my-orders"
              className="bg-white shadow-md p-8 rounded-2xl hover:shadow-xl transition border"
            >
              <h2 className="text-xl font-semibold text-purple-700 mb-2">
                My Orders
              </h2>

              <p className="text-gray-600">
                See the jobs you applied for.
              </p>
            </Link>

          </div>

        )}

      </div>

    </div>

  );

};

export default Dashboard;