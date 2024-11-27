import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState(""); // state to store email
  const [password, setPassword] = useState(""); // state to store password
  const [error, setError] = useState(""); // state to store error message
  const navigate = useNavigate(); // useNavigate instead of useHistory

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // If login is successful, save the token in localStorage
      localStorage.setItem("token", response.data.token);

      // Show success message using toast
      toast.success("Login successful! Redirecting to dashboard...");
      // Redirect to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
      
    
    } catch (err) {
      // Show error message using toast
      toast.error("Invalid credentials. Please try again.");
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>RBAC Admin</h1>
      </div>
      <div className="login-box">
        <h2>Sign in to your account</h2>
        <p>
          Or <Link to="/register">register for a new account</Link>
        </p>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // update email on change
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // update password on change
              required
            />
          </div>
          {error && <p className="error">{error}</p>} {/* Show error message if exists */}
          <div className="extra-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/forgot-password">Forgot your password?</Link>
          </div>
          <button type="submit">Sign in</button>
        </form>
      </div>
      {/* <footer>
        <p>© 2025 RBAC Admin. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-service">Terms of Service</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </footer> */}


      {/* Add ToastContainer to display the toasts */}
      <ToastContainer />
    </div>
    
  );
};

export default LoginPage;
