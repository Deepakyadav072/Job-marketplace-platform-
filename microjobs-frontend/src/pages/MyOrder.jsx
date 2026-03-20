import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { Clock, CheckCircle, XCircle, FileText, User, Calendar, DollarSign, Eye } from "lucide-react";

const MyOrders = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/applications/my");
        console.log("MY ORDERS:", res.data);
        setApplications(res.data);
      } catch (err) {
        console.error("MY ORDERS ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Accepted":
        return <CheckCircle className="w-4 h-4" />;
      case "Rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case "Accepted":
        return "Congratulations! Your application was accepted.";
      case "Rejected":
        return "Your application was not selected this time.";
      default:
        return "Your application is under review.";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-28 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Applications</h1>
          <p className="text-gray-600">Track all the jobs you've applied to and their current status.</p>
        </div>

        {/* Applications List */}
        {applications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Applications Yet</h3>
            <p className="text-gray-600 mb-6">
              You haven't applied to any jobs yet. Start exploring and applying to jobs that interest you!
            </p>
            <Link
              to="/explore-jobs"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Explore Jobs
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
              >

                {/* Status Header */}
                <div className={`px-6 py-4 ${
                  application.status === "Accepted"
                    ? "bg-gradient-to-r from-green-500 to-green-600"
                    : application.status === "Rejected"
                    ? "bg-gradient-to-r from-red-500 to-red-600"
                    : "bg-gradient-to-r from-yellow-500 to-yellow-600"
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        application.status === "Accepted"
                          ? "bg-white/20"
                          : application.status === "Rejected"
                          ? "bg-white/20"
                          : "bg-white/20"
                      }`}>
                        {getStatusIcon(application.status)}
                      </div>
                      <div>
                        <h3 className={`text-lg font-semibold ${
                          application.status === "Accepted" || application.status === "Rejected"
                            ? "text-white"
                            : "text-gray-900"
                        }`}>
                          {application.status === "Accepted" ? "Application Accepted! 🎉" :
                           application.status === "Rejected" ? "Application Not Selected" :
                           "Application Under Review"}
                        </h3>
                        <p className={`text-sm ${
                          application.status === "Accepted" || application.status === "Rejected"
                            ? "text-white/80"
                            : "text-gray-600"
                        }`}>
                          {getStatusMessage(application.status)}
                        </p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${
                      application.status === "Accepted"
                        ? "bg-white/20 text-white border-white/30"
                        : application.status === "Rejected"
                        ? "bg-white/20 text-white border-white/30"
                        : "bg-white text-gray-800 border-white/50"
                    }`}>
                      {getStatusIcon(application.status)}
                      <span className="text-sm font-medium">{application.status}</span>
                    </div>
                  </div>
                </div>

                {/* Application Content */}
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        {application.job?.title || "Job Title"}
                      </h2>

                      <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                        {application.job?.description || "Job description not available"}
                      </p>

                      {/* Job Details Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <DollarSign className="w-4 h-4" />
                          <span className="font-medium">₹{application.job?.budget || "N/A"}</span>
                        </div>
                        <div className="text-gray-600">
                          <span className="font-medium">{application.job?.category || "General"}</span>
                        </div>
                      </div>

                      {/* Client Info */}
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="flex items-center space-x-3">
                          <User className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Client: {application.job?.postedBy?.name || "Client Name"}
                            </p>
                            <p className="text-sm text-gray-600">
                              {application.job?.postedBy?.email || "client@example.com"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Your Proposal */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Your Proposal:</h4>
                        <div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-500">
                          <p className="text-sm text-blue-900 leading-relaxed">
                            {application.coverLetter || application.proposal || "No proposal text available"}
                          </p>
                        </div>
                      </div>

                      {/* Application Timeline */}
                      <div className="text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>Applied on: {new Date(application.createdAt || Date.now()).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 md:items-end">
                      <Link
                        to={`/job/${application.job?._id}`}
                        className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition-colors space-x-2"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Job</span>
                      </Link>

                      {application.status === "Accepted" && (
                        <div className="text-center">
                          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                            <CheckCircle className="w-4 h-4" />
                            <span>Accepted</span>
                          </div>
                        </div>
                      )}

                      {application.status === "Rejected" && (
                        <div className="text-center">
                          <div className="inline-flex items-center space-x-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium">
                            <XCircle className="w-4 h-4" />
                            <span>Rejected</span>
                          </div>
                        </div>
                      )}

                      {application.status === "Pending" && (
                        <div className="text-center">
                          <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
                            <Clock className="w-4 h-4" />
                            <span>Under Review</span>
                          </div>
                        </div>
                      )}
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

export default MyOrders;