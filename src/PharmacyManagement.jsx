import { useEffect, useState } from "react";

function PharmacyManagement() {
  const [medicines, setMedicines] = useState([]);

  const [medicine, setMedicine] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    expiryDate: ""
  });

  const fetchMedicines = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/pharmacy"
      );

      const data = await response.json();

      if (data.success) {
        setMedicines(data.medicines);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch medicines");
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleChange = (event) => {
    setMedicine({
      ...medicine,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/pharmacy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(medicine)
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Medicine added successfully!");

        setMedicine({
          name: "",
          category: "",
          quantity: "",
          price: "",
          expiryDate: ""
        });

        fetchMedicines();
      } else {
        alert(data.message || "Failed to add medicine");
      }
    } catch (error) {
      console.error(error);
      alert("Backend connection failed");
    }
  };

  const deleteMedicine = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this medicine?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/pharmacy/${id}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Medicine deleted successfully!");
        fetchMedicines();
      } else {
        alert(data.message || "Failed to delete medicine");
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
      <h1>💊 Pharmacy Management</h1>

      <p>
        Add, view and manage medicines in the MediCare
        hospital system.
      </p>

      <hr />

      <h2>➕ Add Medicine</h2>

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
          placeholder="Medicine Name"
          value={medicine.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={medicine.category}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={medicine.quantity}
          onChange={handleChange}
          min="1"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={medicine.price}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />

        <label>
          Expiry Date
        </label>

        <input
          type="date"
          name="expiryDate"
          value={medicine.expiryDate}
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
          Add Medicine
        </button>
      </form>

      <hr />

      <h2>📋 Medicine List</h2>

      {medicines.length === 0 ? (
        <p>No medicines found.</p>
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
                <th>Medicine</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Expiry Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {medicines.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price}</td>
                  <td>{item.expiryDate}</td>

                  <td>
                    <button
                      onClick={() => deleteMedicine(item.id)}
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

export default PharmacyManagement;