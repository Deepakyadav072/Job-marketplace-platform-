import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { CheckCircle, User, Calendar, DollarSign, MessageCircle } from "lucide-react";

const AcceptedJobs = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/applications/my");

        const accepted = res.data.filter(
          a => a.status === "Accepted"
        );

        setApps(accepted);
      } catch (error) {
        console.error("Error fetching accepted jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-28 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Accepted Jobs</h1>
          <p className="text-gray-600">Congratulations! These are the jobs where your application was accepted by the client.</p>
        </div>

        {/* Jobs List */}
        {apps.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Accepted Jobs Yet</h3>
            <p className="text-gray-600 mb-6">
              Keep applying to jobs! When a client accepts your application, it will appear here.
            </p>
            <Link
              to="/explore-jobs"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Explore More Jobs
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {apps.map((application) => (
              <div
                key={application._id}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
              >

                {/* Success Header */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Application Accepted! 🎉
                      </h3>
                      <p className="text-green-100 text-sm">
                        The client has accepted your application for this job
                      </p>
                    </div>
                  </div>
                </div>

                {/* Job Details */}
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        {application.job?.title || "Job Title"}
                      </h2>

                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {application.job?.description || "Job description not available"}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <DollarSign className="w-4 h-4" />
                          <span className="font-medium">₹{application.job?.budget || "N/A"}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <span className="font-medium">{application.job?.category || "General"}</span>
                        </div>
                      </div>

                      {/* Client Info */}
                      <div className="bg-blue-50 rounded-lg p-4 mb-4">
                        <div className="flex items-center space-x-3">
                          <User className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="text-sm font-medium text-blue-900">
                              Client: {application.job?.postedBy?.name || "Client Name"}
                            </p>
                            <p className="text-sm text-blue-700">
                              {application.job?.postedBy?.email || "client@example.com"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Application Details */}
                      <div className="text-sm text-gray-500">
                        <div className="flex items-center space-x-2 mb-2">
                          <Calendar className="w-4 h-4" />
                          <span>Applied on: {new Date(application.createdAt || Date.now()).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MessageCircle className="w-4 h-4" />
                          <span>Your proposal was accepted</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 md:items-end">
                      <Link
                        to={`/job/${application.job?._id}`}
                        className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition-colors"
                      >
                        View Job Details
                      </Link>

                      <div className="text-center">
                        <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                          <CheckCircle className="w-4 h-4" />
                          <span>Accepted</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AcceptedJobs;