import { useEffect, useState } from "react";

function PrescriptionManagement() {

  const [prescription, setPrescription] = useState({
    patientName: "",
    doctorName: "",
    medicine: "",
    dosage: "",
    duration: "",
    instructions: ""
  });

  const [prescriptions, setPrescriptions] = useState([]);

  const handleChange = (event) => {
    setPrescription({
      ...prescription,
      [event.target.name]: event.target.value
    });
  };

  const fetchPrescriptions = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/prescriptions"
      );

      const data = await response.json();

      if (data.success) {
        setPrescriptions(data.prescriptions);
      }

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:5000/api/prescriptions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(prescription)
        }
      );

      const data = await response.json();

      if (data.success) {

        alert("Prescription created successfully!");

        setPrescription({
          patientName: "",
          doctorName: "",
          medicine: "",
          dosage: "",
          duration: "",
          instructions: ""
        });

        fetchPrescriptions();

      } else {

        alert(data.message || "Failed to create prescription");

      }

    } catch (error) {

      console.error(error);
      alert("Backend connection failed");

    }
  };

  const deletePrescription = async (id) => {

    try {

      const response = await fetch(
        `http://localhost:5000/api/prescriptions/${id}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (data.success) {

        alert("Prescription deleted successfully!");

        fetchPrescriptions();

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.error(error);
      alert("Failed to delete prescription");

    }
  };

  return (
    <div style={{
      padding: "30px",
      maxWidth: "1000px",
      margin: "auto"
    }}>

      <h1>💊 Prescription Management</h1>

      <p>
        Create and manage patient prescriptions.
      </p>


      {/* ================= FORM ================= */}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "15px",
          marginTop: "25px",
          padding: "25px",
          borderRadius: "10px",
          background: "#f4f7fb"
        }}
      >

        <input
          type="text"
          name="patientName"
          placeholder="Patient Name"
          value={prescription.patientName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="doctorName"
          placeholder="Doctor Name"
          value={prescription.doctorName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="medicine"
          placeholder="Medicine Name"
          value={prescription.medicine}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="dosage"
          placeholder="Dosage (Example: 1 tablet twice a day)"
          value={prescription.dosage}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="duration"
          placeholder="Duration (Example: 5 days)"
          value={prescription.duration}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="instructions"
          placeholder="Instructions"
          value={prescription.instructions}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            background: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Create Prescription
        </button>

      </form>


      {/* ================= LIST ================= */}

      <h2 style={{ marginTop: "40px" }}>
        📋 Prescription Records
      </h2>

      {prescriptions.length === 0 ? (

        <p>No prescriptions found.</p>

      ) : (

        prescriptions.map((item) => (

          <div
            key={item.id}
            style={{
              marginTop: "15px",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              background: "white"
            }}
          >

            <h3>
              👤 {item.patientName}
            </h3>

            <p>
              <strong>Doctor:</strong> {item.doctorName}
            </p>

            <p>
              <strong>Medicine:</strong> {item.medicine}
            </p>

            <p>
              <strong>Dosage:</strong> {item.dosage}
            </p>

            <p>
              <strong>Duration:</strong> {item.duration}
            </p>

            <p>
              <strong>Instructions:</strong> {item.instructions}
            </p>

            <button
              onClick={() => deletePrescription(item.id)}
              style={{
                padding: "8px 15px",
                background: "#d32f2f",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              🗑️ Delete
            </button>

          </div>

        ))

      )}

    </div>
  );
}

export default PrescriptionManagement;