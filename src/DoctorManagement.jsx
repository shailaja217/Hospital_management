import { useEffect, useState } from "react";

function DoctorManagement() {
  const [doctors, setDoctors] = useState([]);

  const [doctor, setDoctor] = useState({
    name: "",
    specialization: "",
    department: "",
    phone: "",
    email: ""
  });

  const fetchDoctors = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/doctors"
      );

      const data = await response.json();

      if (data.success) {
        setDoctors(data.doctors);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch doctors");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleChange = (event) => {
    setDoctor({
      ...doctor,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/doctors",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(doctor)
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Doctor added successfully!");

        setDoctor({
          name: "",
          specialization: "",
          department: "",
          phone: "",
          email: ""
        });

        fetchDoctors();
      } else {
        alert(data.message || "Failed to add doctor");
      }
    } catch (error) {
      console.error(error);
      alert("Backend connection failed");
    }
  };

  const deleteDoctor = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/doctors/${id}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Doctor deleted successfully!");
        fetchDoctors();
      } else {
        alert(data.message || "Failed to delete doctor");
      }
    } catch (error) {
      console.error(error);
      alert("Backend connection failed");
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1100px",
        margin: "auto"
      }}
    >
      <h1>👨‍⚕️ Doctor Management</h1>

      <p>
        Add, view and manage doctors in the MediCare
        hospital system.
      </p>

      <hr />

      <h2>➕ Add Doctor</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "12px",
          maxWidth: "600px"
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Doctor Name"
          value={doctor.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={doctor.specialization}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={doctor.department}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={doctor.phone}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={doctor.email}
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
          Add Doctor
        </button>
      </form>

      <hr />

      <h2>📋 Doctor List</h2>

      {doctors.length === 0 ? (
        <p>No doctors found.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            border="1"
            cellPadding="10"
            style={{
              width: "100%",
              borderCollapse: "collapse"
            }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Specialization</th>
                <th>Department</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {doctors.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.specialization}</td>
                  <td>{item.department}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>
                    <button
                      onClick={() => deleteDoctor(item.id)}
                      style={{
                        background: "#d32f2f",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "5px",
                        cursor: "pointer"
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

export default DoctorManagement;