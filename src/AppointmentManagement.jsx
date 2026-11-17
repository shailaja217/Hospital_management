import { useEffect, useState } from "react";

function AppointmentManagement() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/appointments"
      );

      const data = await response.json();

      if (data.success) {
        setAppointments(data.appointments);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // ===============================
  // UPDATE STATUS
  // ===============================

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/appointments/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            status: status
          })
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Appointment status updated!");
        fetchAppointments();
      } else {
        alert("Failed to update appointment");
      }
    } catch (error) {
      console.error(error);
      alert("Backend connection failed");
    }
  };

  // ===============================
  // DELETE APPOINTMENT
  // ===============================

  const deleteAppointment = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this appointment?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/appointments/${id}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Appointment deleted successfully!");
        fetchAppointments();
      } else {
        alert("Failed to delete appointment");
      }
    } catch (error) {
      console.error(error);
      alert("Backend connection failed");
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        minHeight: "100vh",
        background: "#f4f7fb"
      }}
    >
      <h1>🏥 Appointment Management</h1>

      <p>
        Manage all patient appointments from the hospital system.
      </p>

      {loading ? (
        <h3>Loading appointments...</h3>
      ) : appointments.length === 0 ? (
        <h3>No appointments found.</h3>
      ) : (
        <div
          style={{
            overflowX: "auto",
            marginTop: "30px"
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "white"
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Patient</th>
                <th style={thStyle}>Doctor</th>
                <th style={thStyle}>Department</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Time</th>
                <th style={thStyle}>Reason</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td style={tdStyle}>{appointment.id}</td>

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
                    {appointment.appointmentTime}
                  </td>

                  <td style={tdStyle}>
                    {appointment.reason}
                  </td>

                  <td style={tdStyle}>
                    <strong>{appointment.status}</strong>
                  </td>

                  <td style={tdStyle}>
                    <button
                      onClick={() =>
                        updateStatus(
                          appointment.id,
                          "Confirmed"
                        )
                      }
                    >
                      Confirm
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          appointment.id,
                          "Completed"
                        )
                      }
                      style={{ marginLeft: "5px" }}
                    >
                      Complete
                    </button>

                    <button
                      onClick={() =>
                        deleteAppointment(appointment.id)
                      }
                      style={{
                        marginLeft: "5px"
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

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

export default AppointmentManagement;