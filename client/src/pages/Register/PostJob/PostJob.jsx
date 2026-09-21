import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage("Job posted successfully!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        "Failed to post job"
      );
    }
  };

  return (
    <div>
      <h1>Post a Job</h1>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="role"
          placeholder="Job Role"
          value={formData.role}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="qualification"
          placeholder="Qualification"
          value={formData.qualification}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="experienceRequired"
          placeholder="Experience Required"
          value={formData.experienceRequired}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="stipend"
          placeholder="Stipend"
          value={formData.stipend}
          onChange={handleChange}
          required
        />

        <select
          name="workMode"
          value={formData.workMode}
          onChange={handleChange}
        >
          <option value="REMOTE">Remote</option>
          <option value="HYBRID">Hybrid</option>
          <option value="ONSITE">Onsite</option>
        </select>

        <input
          type="text"
          name="duration"
          placeholder="Duration"
          value={formData.duration}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="workingHours"
          placeholder="Working Hours"
          value={formData.workingHours}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
        />

        <button type="submit">
          Post Job
        </button>

      </form>
    </div>
  );
}

export default PostJob;