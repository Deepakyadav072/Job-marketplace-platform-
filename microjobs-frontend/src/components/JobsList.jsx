import { useEffect, useState } from "react";
import API from "../api";

const JobsList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    API.get("/jobs")
      .then(res => setJobs(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Available Jobs</h2>

      {jobs.map(job => (
        <div key={job._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <p><b>Category:</b> {job.category}</p>
          <p><b>Budget:</b> ₹{job.budget}</p>
        </div>
      ))}
    </div>
  );
};

export default JobsList;
