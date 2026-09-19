import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("applicant");

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
          role
        }
      );

      if (role === "recruiter") {
        navigate("/recruiter");
      } else {
        navigate("/login");
      }

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Registration failed"
      );

    }
  };

  return (
    <div>

      <h1>Register</h1>

      <form onSubmit={handleRegister}>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="applicant">Applicant</option>
          <option value="recruiter">Recruiter</option>
        </select>

        <button type="submit">
          Register
        </button>

      </form>

      {error && <p>{error}</p>}

    </div>
  );
}

export default Register;
