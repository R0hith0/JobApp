import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./Register.css";


function Register() {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData
      );


      login(
        res.data.token,
        res.data.user
      );


      navigate("/");


    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Registration failed"
      );

    }
  };


  return (
    <div className="register-container">

      <form
        className="register-card"
        onSubmit={handleSubmit}
      >

        <h2>Create Account</h2>


        {error && (
          <p className="error">
            {error}
          </p>
        )}


        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />


        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />


        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />


        <button type="submit">
          Register
        </button>


        <p>
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>


      </form>

    </div>
  );
}


export default Register;