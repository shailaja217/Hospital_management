import { useState } from "react";
import "./Login.css";

function Login({ onLoginSuccess, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      if (data.success) {
        alert("Login successful!");

        if (onLoginSuccess) {
          onLoginSuccess(data.user);
        }
      } else {
        alert(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      alert("Backend connection failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="hospital-icon">🏥</div>

        <h1>MediCare Hospital</h1>

        <p className="subtitle">
          Hospital Management & Appointment System
        </p>

        <div className="welcome">
          <h2>Welcome Back!</h2>
          <p>Please login to your account</p>
        </div>

        <form onSubmit={handleLogin}>

          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <div className="forgot">
            <a href="#forgot">Forgot Password?</a>
          </div>

          <button type="submit" className="login-button">
            LOGIN
          </button>

        </form>

        <div className="register-section">

          <p>Don't have an account?</p>

          <button
            className="register-button"
            onClick={onRegister}
          >
            Create an Account
          </button>

        </div>

        <div className="back-home">
          <a href="/">← Back to Home</a>
        </div>

      </div>
    </div>
  );
}

export default Login;