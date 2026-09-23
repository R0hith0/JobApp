import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PostJob.css";

function PostJob() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    role: "",
    qualification: "",
    experienceRequired: "Fresher",
    stipend: "",
    workMode: "REMOTE",
    duration: "",
    workingHours: "",
    description: "",
    deadline: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3000/api/jobs",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setMessage("Job posted successfully!");
      setTimeout(() => {
        navigate("/recruiter");
      }, 1000);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to post job"
      );
    }
  };

  return (
    <div className="post-job-page">
      <div className="post-job-container">
        <div className="post-job-header">
          <h1>Post a Job</h1>
          <p>Share a new internship or job opportunity with applicants.</p>
        </div>

        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}

        <form className="post-job-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Job Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Enter company name"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Job Role</label>
                <input
                  type="text"
                  name="role"
                  placeholder="e.g. Software Developer Intern"
                  value={formData.role}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  placeholder="e.g. B.Tech CSE"
                  value={formData.qualification}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Experience Required</label>
                <input
                  type="text"
                  name="experienceRequired"
                  placeholder="e.g. Fresher"
                  value={formData.experienceRequired}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Stipend</label>
                <input
                  type="text"
                  name="stipend"
                  placeholder="e.g. ₹30,000 / month"
                  value={formData.stipend}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Work Mode</label>
                <select
                  name="workMode"
                  value={formData.workMode}
                  onChange={handleChange}
                >
                  <option value="REMOTE">Remote</option>
                  <option value="HYBRID">Hybrid</option>
                  <option value="ONSITE">Onsite</option>
                </select>
              </div>
              <div className="form-group">
                <label>Duration</label>
                <input
                  type="text"
                  name="duration"
                  placeholder="e.g. 6 Months"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Working Hours</label>
                <input
                  type="text"
                  name="workingHours"
                  placeholder="e.g. 9 AM - 5 PM"
                  value={formData.workingHours}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Additional Details</h2>
            <div className="form-group">
              <label>Job Description</label>
              <textarea
                name="description"
                placeholder="Describe the role, responsibilities and requirements..."
                value={formData.description}
                onChange={handleChange}
                rows="6"
              />
            </div>
            <div className="form-group deadline-group">
              <label>Application Deadline</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/recruiter")}
            >
              Cancel
            </button>
            <button type="submit" className="post-button">
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostJob;
