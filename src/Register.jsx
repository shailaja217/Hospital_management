import { useState } from "react";
import "./Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Account created successfully!");

        setName("");
        setEmail("");
        setPassword("");
      } else {
        alert(data.message || "Registration failed");
      }

    } catch (error) {
      console.error(error);
      alert("Backend connection failed");
    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <div className="register-icon">
          🏥
        </div>

        <h1>
          MediCare Hospital
        </h1>

        <p className="register-subtitle">
          Hospital Management & Appointment System
        </p>

        <h2>
          Create an Account
        </h2>

        <p className="register-description">
          Register to access the MediCare hospital system.
        </p>

        <form onSubmit={handleRegister}>

          <label>
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />


          <label>
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />


          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />


          <button
            type="submit"
            className="register-submit"
          >
            CREATE ACCOUNT
          </button>

        </form>


        <div className="register-login">

          <p>
            Already have an account?
          </p>

          <a href="/">
            ← Back to Login
          </a>

        </div>

      </div>

    </div>
  );
}

export default Register;