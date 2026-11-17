import { useEffect, useState } from "react";

function AdminDashboard() {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    try {
      const patientResponse = await fetch(
        "http://localhost:5000/api/patients"
      );

      const patientData = await patientResponse.json();

      const appointmentResponse = await fetch(
        "http://localhost:5000/api/appointments"
      );

      const appointmentData = await appointmentResponse.json();

      if (patientData.success) {
        setPatients(patientData.patients);
      }

      if (appointmentData.success) {
        setAppointments(appointmentData.appointments);
      }

    } catch (error) {
      console.error(error);
      alert("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "Pending"
  ).length;

  const confirmedAppointments = appointments.filter(
    (appointment) => appointment.status === "Confirmed"
  ).length;

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "Completed"
  ).length;

  if (loading) {
    return (
      <div style={pageStyle}>
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div style={pageStyle}>

      <h1>🏥 MediCare Admin Dashboard</h1>

      <p style={{ color: "#555" }}>
        Hospital Management System Overview
      </p>

      {/* ===============================
          STATISTICS
      =============================== */}

      <div style={cardContainer}>

        <div style={cardStyle}>
          <h2>👤</h2>
          <h3>Total Patients</h3>
          <p style={numberStyle}>
            {patients.length}
          </p>
        </div>

        <div style={cardStyle}>
          <h2>📅</h2>
          <h3>Total Appointments</h3>
          <p style={numberStyle}>
            {appointments.length}
          </p>
        </div>

        <div style={cardStyle}>
          <h2>⏳</h2>
          <h3>Pending</h3>
          <p style={numberStyle}>
            {pendingAppointments}
          </p>
        </div>

        <div style={cardStyle}>
          <h2>✅</h2>
          <h3>Confirmed</h3>
          <p style={numberStyle}>
            {confirmedAppointments}
          </p>
        </div>

        <div style={cardStyle}>
          <h2>✔️</h2>
          <h3>Completed</h3>
          <p style={numberStyle}>
            {completedAppointments}
          </p>
        </div>

      </div>


      {/* ===============================
          RECENT APPOINTMENTS
      =============================== */}

      <div style={sectionStyle}>

        <h2>📋 Recent Appointments</h2>

        {appointments.length === 0 ? (
          <p>No appointments available.</p>
        ) : (
          <table style={tableStyle}>

            <thead>
              <tr>
                <th style={thStyle}>Patient</th>
                <th style={thStyle}>Doctor</th>
                <th style={thStyle}>Department</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>

            <tbody>

              {appointments.slice(0, 5).map((appointment) => (

                <tr key={appointment.id}>

                  <td style={tdStyle}>
                    {appointment.patientName}
                  </td>

                  <td style={tdStyle}>
                    {appointment.doctor}
                  </td>

                  <td style={tdStyle}>
                    {appointment.department}
                  </td>

                  <td style={tdStyle}>
                    {appointment.appointmentDate}
                  </td>

                  <td style={tdStyle}>
                    {appointment.status}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        )}

      </div>


      {/* ===============================
          HOSPITAL INFORMATION
      =============================== */}

      <div style={sectionStyle}>

        <h2>🏥 Hospital Information</h2>

        <p>
          <strong>Hospital:</strong> MediCare Hospital
        </p>

        <p>
          <strong>Departments:</strong> Cardiology,
          Neurology, General Medicine
        </p>

        <p>
          <strong>System:</strong> Hospital Management &
          Appointment System
        </p>

      </div>

    </div>
  );
}


// ===============================
// STYLES
// ===============================

const pageStyle = {
  minHeight: "100vh",
  padding: "40px",
  background: "#f4f7fb"
};

const cardContainer = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
  marginTop: "30px"
};

const cardStyle = {
  background: "white",
  padding: "25px",
  width: "180px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};

const numberStyle = {
  fontSize: "30px",
  fontWeight: "bold"
};

const sectionStyle = {
  background: "white",
  marginTop: "30px",
  padding: "25px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px"
};

const thStyle = {
  padding: "12px",
  border: "1px solid #ddd",
  background: "#eaf1f8",
  textAlign: "left"
};

const tdStyle = {
  padding: "12px",
  border: "1px solid #ddd"
};

export default AdminDashboard;