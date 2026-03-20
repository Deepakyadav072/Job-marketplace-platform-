import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleApply = () => {
    navigate(`/apply/${job._id}`);
  };

  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p>{job.description}</p>

      <div className="job-info">
        <span>{job.category}</span>
        <span>₹ {job.budget}</span>
      </div>

      <button onClick={handleApply} className="apply-btn">
        Apply Job
      </button>
    </div>
  );
};

export default JobCard;



