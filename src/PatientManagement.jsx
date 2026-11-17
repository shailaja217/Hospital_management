import { useEffect, useState } from "react";

function PatientManagement() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // ===============================
  // GET ALL PATIENTS
  // ===============================

  const fetchPatients = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/patients"
      );

      const data = await response.json();

      if (data.success) {
        setPatients(data.patients);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load patients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // ===============================
  // DELETE PATIENT
  // ===============================

  const deletePatient = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this patient?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/patients/${id}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Patient deleted successfully!");
        fetchPatients();
      } else {
        alert(data.message || "Failed to delete patient");
      }
    } catch (error) {
      console.error(error);
      alert("Backend connection failed");
    }
  };

  // ===============================
  // SEARCH PATIENTS
  // ===============================

  const filteredPatients = patients.filter((patient) => {
    const searchText = search.toLowerCase();

    return (
      patient.name.toLowerCase().includes(searchText) ||
      patient.email.toLowerCase().includes(searchText) ||
      patient.phone.toLowerCase().includes(searchText)
    );
  });

  return (
    <div
      style={{
        padding: "40px",
        minHeight: "100vh",
        background: "#f4f7fb"
      }}
    >
      <h1>🏥 Patient Management</h1>

      <p>
        View, search and manage registered patient information.
      </p>

      {/* ===============================
          SEARCH BOX
      =============================== */}

      <input
        type="text"
        placeholder="🔍 Search by name, email or phone..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "12px",
          marginTop: "20px",
          marginBottom: "20px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          fontSize: "16px"
        }}
      />

      {loading ? (
        <h3>Loading patients...</h3>
      ) : filteredPatients.length === 0 ? (
        <h3>No matching patients found.</h3>
      ) : (
        <div
          style={{
            overflowX: "auto",
            marginTop: "10px"
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
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Phone</th>
                <th style={thStyle}>Age</th>
                <th style={thStyle}>Gender</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id}>

                  <td style={tdStyle}>
                    {patient.id}
                  </td>

                  <td style={tdStyle}>
                    {patient.name}
                  </td>

                  <td style={tdStyle}>
                    {patient.email}
                  </td>

                  <td style={tdStyle}>
                    {patient.phone}
                  </td>

                  <td style={tdStyle}>
                    {patient.age}
                  </td>

                  <td style={tdStyle}>
                    {patient.gender}
                  </td>

                  <td style={tdStyle}>
                    <button
                      onClick={() =>
                        deletePatient(patient.id)
                      }
                      style={{
                        padding: "8px 12px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                      }}
                    >
                      🗑️ Delete
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

export default PatientManagement;