import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { CheckCircle, XCircle, User, FileText, Calendar, ArrowLeft } from "lucide-react";

const Applicants = () => {
  const { jobId } = useParams();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [demoStatus, setDemoStatus] = useState("Pending");

  const fetchApps = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/applications/job/${jobId}`);
      setApps(res.data);
    } catch (error) {
      console.error("Error fetching applicants:", error);
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    fetchApps();
  }, [fetchApps]);

  const updateStatus = async (id, status) => {
    try {
      setUpdating(id);
      await axiosInstance.put(`/applications/${id}`, { status });
      fetchApps(); // Refresh the list
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update application status. Please try again.");
    } finally {
      setUpdating(null);
    }
  };

  const updateDemoStatus = async (status) => {
    // Simulate API call delay
    setUpdating("demo");
    setTimeout(() => {
      setDemoStatus(status);
      setUpdating(null);
    }, 800);
  };

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
        return <FileText className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 px-6">
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
          <Link
            to="/dashboard"
            className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Applicants</h1>
          <p className="text-gray-600">Review and manage applications for your job posting</p>
        </div>

        {/* Applicants List */}
        {apps.length === 0 ? (
          <div className="space-y-6">
            {/* Demo/Sample Application Card */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Sample Applicant
                      </h3>
                      <p className="text-purple-100 text-sm">
                        sample@example.com
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(demoStatus)}`}>
                    {getStatusIcon(demoStatus)}
                    <span className="text-sm font-medium">{demoStatus}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Sample Proposal</h4>
                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-purple-500">
                    <p className="text-gray-700 leading-relaxed">
                      This is a sample proposal to demonstrate the accept/reject functionality.
                      When real applications come in, they will appear here with the freelancer's
                      actual proposal and details. You can accept or reject applications using the
                      buttons below.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Sample Application</span>
                    </div>
                  </div>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">Demo</span>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">ℹ</span>
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-blue-800 mb-1">Interactive Demo</h5>
                      <p className="text-sm text-blue-700">
                        Try clicking the Accept or Reject buttons below to see how the status changes in real-time.
                        Use the Reset Demo button to try again. Real applications will work the same way!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => updateDemoStatus("Accepted")}
                    disabled={demoStatus !== "Pending" || updating === "demo"}
                    className={`flex-1 px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors ${
                      demoStatus === "Accepted"
                        ? "bg-green-600 text-white"
                        : demoStatus === "Pending" && updating !== "demo"
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {updating === "demo" ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <CheckCircle className="w-4 h-4" />
                    )}
                    <span>Accept Application</span>
                  </button>

                  <button
                    onClick={() => updateDemoStatus("Rejected")}
                    disabled={demoStatus !== "Pending" || updating === "demo"}
                    className={`flex-1 px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors ${
                      demoStatus === "Rejected"
                        ? "bg-red-600 text-white"
                        : demoStatus === "Pending" && updating !== "demo"
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {updating === "demo" ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )}
                    <span>Reject Application</span>
                  </button>
                </div>

                {demoStatus !== "Pending" && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setDemoStatus("Pending")}
                      disabled={updating === "demo"}
                      className="w-full bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
                    >
                      Reset Demo
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Original No Applications Message */}
            <div className="bg-white rounded-2xl shadow-md p-12 text-center">
              <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Real Applications Yet</h3>
              <p className="text-gray-600">Applications will appear here once freelancers apply to your job.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {apps.map((application) => (
              <div
                key={application._id}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
              >

                {/* Applicant Header */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {application.user?.name || "Anonymous"}
                        </h3>
                        <p className="text-purple-100 text-sm">
                          {application.user?.email || "No email provided"}
                        </p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(application.status)}`}>
                      {getStatusIcon(application.status)}
                      <span className="text-sm font-medium">{application.status}</span>
                    </div>
                  </div>
                </div>

                {/* Application Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Proposal</h4>
                    <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-purple-500">
                      <p className="text-gray-700 leading-relaxed">
                        {application.coverLetter || application.proposal || "No proposal provided"}
                      </p>
                    </div>
                  </div>

                  {/* Application Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Applied {new Date(application.createdAt || Date.now()).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {application.status === "Pending" && (
                    <div className="flex space-x-3 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => updateStatus(application._id, "Accepted")}
                        disabled={updating === application._id}
                        className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        {updating === application._id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            <span>Accept Application</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => updateStatus(application._id, "Rejected")}
                        disabled={updating === application._id}
                        className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        {updating === application._id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4" />
                            <span>Reject Application</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {application.status !== "Pending" && (
                    <div className="pt-4 border-t border-gray-100">
                      <div className="text-center text-gray-600">
                        <p className="text-sm">
                          This application has been {application.status.toLowerCase()}.
                        </p>
                      </div>
                    </div>
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

export default Applicants;