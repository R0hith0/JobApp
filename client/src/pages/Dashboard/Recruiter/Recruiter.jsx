import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RecruiterRegister.css";

function RecruiterRegister() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");
  const [designation, setDesignation] = useState("");

  const [error, setError] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();
    setError("");

    try {

      await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          name,
          email,
          password,
          role: "recruiter"
        }
      );

      navigate("/recruiter");

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Registration failed"
      );

    }
  };

  return (
    <div className="recruiter-register-page">

      <div className="recruiter-form-card">

        <div className="form-header">
          <h1>Recruiter Registration</h1>
          <p>
            Create your recruiter account and start finding great talent.
          </p>
        </div>

        <form onSubmit={handleRegister}>

          <div className="form-section">

            <h2>Personal Information</h2>

            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Work Email *</label>
              <input
                type="email"
                placeholder="Enter your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Designation *</label>
              <select
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                required
              >
                <option value="">Select your designation</option>
                <option value="HR">HR</option>
                <option value="Recruiter">Recruiter</option>
                <option value="Hiring Manager">Hiring Manager</option>
                <option value="Other">Other</option>
              </select>
            </div>

          </div>

          <div className="form-section">

            <h2>Company Information</h2>

            <div className="form-group">
              <label>Company Name *</label>
              <input
                type="text"
                placeholder="Enter company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Company Website</label>
              <input
                type="url"
                placeholder="https://example.com"
                value={companyWebsite}
                onChange={(e) => setCompanyWebsite(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Company Location *</label>
              <input
                type="text"
                placeholder="City, Country"
                value={companyLocation}
                onChange={(e) => setCompanyLocation(e.target.value)}
                required
              />
            </div>

          </div>

          <div className="form-section">

            <h2>Account Security</h2>

            <div className="form-group">
              <label>Password *</label>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

          </div>

          {error && (
            <p className="register-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="create-account-btn"
          >
            Create Recruiter Account
          </button>

        </form>

        <div className="form-footer">
          <p>
            Already have an account?
            <button onClick={() => navigate("/login")}>
              Login
            </button>
          </p>

          <button
            className="applicant-link"
            onClick={() => navigate("/register")}
          >
            Register as an Applicant
          </button>
        </div>

      </div>

    </div>
  );
}

export default RecruiterRegister;

