import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

const PermissionManagement = () => {
  const [permissions, setPermissions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
  });
  const [error, setError] = useState("");

  // Fetch permissions from the backend
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/permissions");
        setPermissions(response.data);
      } catch (err) {
        console.error("Error fetching permissions:", err);
      }
    };

    fetchPermissions();
  }, []);

  // Handle opening the popup
  const handleAddPermission = () => {
    setFormData({ name: "", category: "", description: "" });
    setShowPopup(true);
    setError("");
  };

  // Handle closing the popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Handle input changes in the popup form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submitting the new permission
  const handleAddUser = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:5000/api/permissions", setFormData);
      setPermissions((prev) => [...prev, setFormData]); // Update UI with new permission
      setShowPopup(false);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to add permission");
      console.error("Error adding permission:", err);
    }
  };

  return (
    <section id="user-management" className="module">
      <div className="container">
        <h2>Permission Management</h2>
        <div className="actions">
          <input type="text" placeholder="Search permissions..." />
          <button className="add-user-btn" onClick={handleAddPermission}>
            <span className="material-icons">add</span> Permission
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Permission Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((permission) => (
              <tr key={permission._id}>
                <td>{permission.name}</td>
                <td>{permission.category}</td>
                <td>{permission.description}</td>
                <td>
                  <button className="edit-btn">
                    <span className="material-icons">edit</span>
                  </button>
                  <button className="delete-btn">
                    <span className="material-icons">delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Permission Popup */}
      {showPopup && (
  <div className="modal">
    <div className="modal-content">
      <span className="modal-close" onClick={() => setShowPopup(false)}>
        &times;
      </span>
      <h3>Add New Permission</h3>
      <input
        type="text"
        name="Permission Name"
        placeholder="Permission Name"
        value={formData.fullName}
        onChange={handleInputChange}
      />
            <select
        name="Category"
        value={formData.role}
        onChange={handleInputChange}
      >
        <option value="">Select a category</option>
        <option value="Read">Read</option>
        <option value="Write">Write</option>
	<option value="Execute">Execute</option>
      </select>

<input
        type="Description"
        name="Description"
        placeholder="Description"
        value={formData.email}
        onChange={handleInputChange}
      />

      <div className="button-container">
        <button className="cancel-btn" onClick={() => setShowPopup(false)}>
          Cancel
        </button>
        <button className="add-btn" onClick={handleAddUser}>
          Add 
        </button>
      </div>
    </div>
  </div>
)}
    </section>
  );
};

export default PermissionManagement;
