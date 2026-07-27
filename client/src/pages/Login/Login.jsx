import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password
        }
      );


      login(
        res.data.token,
        res.data.user
      );


      navigate("/");


    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Login failed"
      );

    }
  };


  return (
    <div className="auth-container">

      <form
        className="auth-card"
        onSubmit={handleSubmit}
      >

        <h2>
          Login
        </h2>


        {error && (
          <p className="error">
            {error}
          </p>
        )}


        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />


        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />


        <button type="submit">
          Login
        </button>


      </form>

    </div>
  );
}

export default Login;