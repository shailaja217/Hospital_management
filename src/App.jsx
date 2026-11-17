import { useState } from "react";
import "./App.css";

import Login from "./Login";
import Register from "./Register";
import AppointmentManagement from "./AppointmentManagement";
import PatientManagement from "./PatientManagement";
import AdminDashboard from "./AdminDashboard";
import DoctorManagement from "./DoctorManagement";
import PharmacyManagement from "./PharmacyManagement";
import PrescriptionManagement from "./PrescriptionManagement";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);
  const [showPatients, setShowPatients] = useState(false);
  const [showDoctors, setShowDoctors] = useState(false);
  const [showPharmacy, setShowPharmacy] = useState(false);
  const [showPrescriptions, setShowPrescriptions] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const [appointment, setAppointment] = useState({
    patientName: "",
    doctor: "",
    department: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: ""
  });

  const handleChange = (event) => {
    setAppointment({
      ...appointment,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/appointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(appointment)
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Appointment booked successfully!");

        setAppointment({
          patientName: "",
          doctor: "",
          department: "",
          appointmentDate: "",
          appointmentTime: "",
          reason: ""
        });
      } else {
        alert(data.message || "Failed to book appointment");
      }

    } catch (error) {
      console.error(error);
      alert("Backend connection failed");
    }
  };

  const goToAppointments = () => {
    document.getElementById("appointments").scrollIntoView({
      behavior: "smooth"
    });
  };

  // ===============================
  // LOGIN PAGE
  // ===============================

  if (showLogin) {
    return (
      <div>

        <button
          onClick={() => setShowLogin(false)}
          style={{
            margin: "20px",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          ← Back to Home
        </button>

        <Login
          onLoginSuccess={(user) => {
            alert(`Welcome ${user.name}!`);
            setShowLogin(false);
            setShowDashboard(true);
          }}

          onRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />

      </div>
    );
  }

  // ===============================
  // REGISTER PAGE
  // ===============================

  if (showRegister) {
    return (
      <div>

        <button
          onClick={() => setShowRegister(false)}
          style={{
            margin: "20px",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          ← Back to Home
        </button>

        <Register />

      </div>
    );
  }

  // ===============================
  // APPOINTMENTS
  // ===============================

  if (showAppointments) {
    return (
      <div>

        <button
          onClick={() => setShowAppointments(false)}
          style={{
            margin: "20px",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          ← Back to Home
        </button>

        <AppointmentManagement />

      </div>
    );
  }

  // ===============================
  // PATIENTS
  // ===============================

  if (showPatients) {
    return (
      <div>

        <button
          onClick={() => setShowPatients(false)}
          style={{
            margin: "20px",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          ← Back to Home
        </button>

        <PatientManagement />

      </div>
    );
  }

  // ===============================
  // DOCTORS
  // ===============================

  if (showDoctors) {
    return (
      <div>

        <button
          onClick={() => setShowDoctors(false)}
          style={{
            margin: "20px",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          ← Back to Home
        </button>

        <DoctorManagement />

      </div>
    );
  }

  // ===============================
  // PHARMACY
  // ===============================

  if (showPharmacy) {
    return (
      <div>

        <button
          onClick={() => setShowPharmacy(false)}
          style={{
            margin: "20px",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          ← Back to Home
        </button>

        <PharmacyManagement />

      </div>
    );
  }

  // ===============================
  // PRESCRIPTIONS
  // ===============================

  if (showPrescriptions) {
    return (
      <div>

        <button
          onClick={() => setShowPrescriptions(false)}
          style={{
            margin: "20px",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          ← Back to Home
        </button>

        <PrescriptionManagement />

      </div>
    );
  }

  // ===============================
  // DASHBOARD
  // ===============================

  if (showDashboard) {
    return (
      <div>

        <button
          onClick={() => setShowDashboard(false)}
          style={{
            margin: "20px",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          ← Back to Home
        </button>

        <AdminDashboard />

      </div>
    );
  }

  // ===============================
  // HOME PAGE
  // ===============================

  return (
    <div className="app">

      {/* ===============================
          NAVBAR
      =============================== */}

      <nav className="navbar">

        <h2>🏥 MediCare</h2>

        <div className="nav-links">

          <a href="#home">Home</a>

          <a href="#doctors">Doctors</a>

          <a href="#appointments">Appointments</a>

          <a href="#contact">Contact</a>

        </div>

        <div>

          {/* LOGIN */}

          <button
            className="login-btn"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>


          {/* DOCTORS */}

          <button
            className="login-btn"
            onClick={() => setShowDoctors(true)}
            style={{ marginLeft: "10px" }}
          >
            👨‍⚕️ Doctors
          </button>


          {/* APPOINTMENTS */}

          <button
            className="login-btn"
            onClick={() => setShowAppointments(true)}
            style={{ marginLeft: "10px" }}
          >
            📅 Appointments
          </button>


          {/* PATIENTS */}

          <button
            className="login-btn"
            onClick={() => setShowPatients(true)}
            style={{ marginLeft: "10px" }}
          >
            👤 Patients
          </button>


          {/* PHARMACY */}

          <button
            className="login-btn"
            onClick={() => setShowPharmacy(true)}
            style={{ marginLeft: "10px" }}
          >
            💊 Pharmacy
          </button>


          {/* PRESCRIPTIONS */}

          <button
            className="login-btn"
            onClick={() => setShowPrescriptions(true)}
            style={{ marginLeft: "10px" }}
          >
            📝 Prescriptions
          </button>


          {/* DASHBOARD */}

          <button
            className="login-btn"
            onClick={() => setShowDashboard(true)}
            style={{ marginLeft: "10px" }}
          >
            📊 Dashboard
          </button>

        </div>

      </nav>


      {/* ===============================
          HERO SECTION
      =============================== */}

      <section
        className="hero"
        id="home"
      >

        <div className="hero-text">

          <h1>
            Hospital Management & Appointment System
          </h1>

          <p>
            Manage patients, doctors and appointments easily
            through one simple healthcare system.
          </p>

          <button
            className="appointment-btn"
            onClick={goToAppointments}
          >
            Book Appointment
          </button>

        </div>


        <div className="hero-card">

          <div className="hero-icon">
            🩺
          </div>

          <h2>
            Healthcare Made Simple
          </h2>

          <p>
            Easy appointment booking and hospital management.
          </p>

        </div>

      </section>


      {/* ===============================
          DOCTORS SECTION
      =============================== */}

      <section
        className="doctors"
        id="doctors"
      >

        <h2>
          Our Doctors
        </h2>

        <p className="section-text">
          Our hospital provides experienced doctors across
          different medical departments.
        </p>


        <div className="doctor-container">

          <div className="doctor-card">

            <div className="doctor-icon">
              👨‍⚕️
            </div>

            <h3>
              Dr. Cardiology
            </h3>

            <p>
              Cardiology Specialist
            </p>

          </div>


          <div className="doctor-card">

            <div className="doctor-icon">
              👩‍⚕️
            </div>

            <h3>
              Dr. Neurology
            </h3>

            <p>
              Neurology Specialist
            </p>

          </div>


          <div className="doctor-card">

            <div className="doctor-icon">
              👨‍⚕️
            </div>

            <h3>
              Dr. General Medicine
            </h3>

            <p>
              General Physician
            </p>

          </div>

        </div>

      </section>


      {/* ===============================
          SERVICES
      =============================== */}

      <section className="services">

        <h2>
          Our Services
        </h2>


        <div className="service-container">

          <div className="service-card">

            <h3>
              👨‍⚕️ Doctors
            </h3>

            <p>
              View doctors and their specializations.
            </p>

          </div>


          <div className="service-card">

            <h3>
              📅 Appointments
            </h3>

            <p>
              Book and manage hospital appointments.
            </p>

          </div>


          <div className="service-card">

            <h3>
              👤 Patients
            </h3>

            <p>
              Manage patient information and records.
            </p>

          </div>


          <div className="service-card">

            <h3>
              💊 Pharmacy
            </h3>

            <p>
              Manage prescriptions and medicines.
            </p>

          </div>


          <div className="service-card">

            <h3>
              📝 Prescriptions
            </h3>

            <p>
              Create and manage patient prescriptions.
            </p>

          </div>

        </div>

      </section>


      {/* ===============================
          APPOINTMENT FORM
      =============================== */}

      <section
        className="appointment"
        id="appointments"
      >

        <h2>
          Book an Appointment
        </h2>


        <form
          className="form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="patientName"
            placeholder="Patient Name"
            value={appointment.patientName}
            onChange={handleChange}
            required
          />


          <select
            name="department"
            value={appointment.department}
            onChange={handleChange}
            required
          >

            <option value="">
              Select Department
            </option>

            <option value="Cardiology">
              Cardiology
            </option>

            <option value="Neurology">
              Neurology
            </option>

            <option value="General Medicine">
              General Medicine
            </option>

          </select>


          <select
            name="doctor"
            value={appointment.doctor}
            onChange={handleChange}
            required
          >

            <option value="">
              Select Doctor
            </option>

            <option value="Dr. Cardiology">
              Dr. Cardiology
            </option>

            <option value="Dr. Neurology">
              Dr. Neurology
            </option>

            <option value="Dr. General Medicine">
              Dr. General Medicine
            </option>

          </select>


          <input
            type="date"
            name="appointmentDate"
            value={appointment.appointmentDate}
            onChange={handleChange}
            required
          />


          <input
            type="time"
            name="appointmentTime"
            value={appointment.appointmentTime}
            onChange={handleChange}
            required
          />


          <input
            type="text"
            name="reason"
            placeholder="Reason for Appointment"
            value={appointment.reason}
            onChange={handleChange}
            required
          />


          <button type="submit">
            Book Appointment
          </button>

        </form>

      </section>


      {/* ===============================
          REGISTER
      =============================== */}

      <section
        style={{
          textAlign: "center",
          padding: "50px 20px",
          background: "#f4f7fb"
        }}
      >

        <h2>
          New to MediCare?
        </h2>

        <p>
          Create an account to access the hospital system.
        </p>

        <button
          className="appointment-btn"
          onClick={() => setShowRegister(true)}
        >
          Create an Account
        </button>

      </section>


      {/* ===============================
          FOOTER
      =============================== */}

      <footer id="contact">

        <h3>
          🏥 MediCare Hospital
        </h3>

        <p>
          Hospital Management & Appointment System
        </p>

        <p>
          © 2026 MediCare. All Rights Reserved.
        </p>

      </footer>

    </div>
  );
}

export default App;