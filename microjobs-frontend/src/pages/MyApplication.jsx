import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axiosInstance.get("/applications/my");
        setApplications(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen pt-28 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold text-purple-700 mb-8">
          My Applications
        </h1>

        {applications.length === 0 ? (
          <p className="text-gray-500">No applications yet.</p>
        ) : (
          applications.map((app) => (
            <div
              key={app._id}
              className="bg-white p-6 rounded-xl shadow mb-4"
            >
              <h2 className="text-xl font-semibold text-purple-700">
                {app.jobId?.title}
              </h2>

              <p className="text-gray-600 mt-2">
                Status: <span className="font-semibold">{app.status}</span>
              </p>
            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default MyApplications;