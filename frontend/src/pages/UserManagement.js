import React, { useState, useEffect } from "react";


import "./styles.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]); // Store user data
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [formData, setFormData] = useState({ fullName: "", email: "", role: "" }); // Form data

  // Fetch initial users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch("http://localhost:5000/api/users") // Replace with your API endpoint
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => setUsers(data)) // Populate users state
      .catch((error) => console.error("Error fetching users:", error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddUser = () => {
    if (!formData.fullName || !formData.email || !formData.role) {
      alert("All fields are required.");
      return;
    }

    fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        role: formData.role,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add user");
        return res.json();
      })
      .then((newUser) => {
        setUsers([...users, newUser]); // Update users list
        setIsModalOpen(false); // Close modal
        setFormData({ fullName: "", email: "", role: "" }); // Reset form
      })
      .catch((error) => console.error("Error adding user:", error));
  };

  return (
    <section id="user-management" className="module">
      <div className="container">
        <h2>User Management</h2>
        <div className="actions">
          <input type="text" placeholder="Search users..." />
          <button className="add-user-btn" onClick={() => setIsModalOpen(true)}>
            <span className="material-icons">add</span> Add User
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
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

        {isModalOpen && (
  <div className="modal">
    <div className="modal-content">
      <span className="modal-close" onClick={() => setIsModalOpen(false)}>
        &times;
      </span>
      <h3>Add New User</h3>
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <select
        name="role"
        value={formData.role}
        onChange={handleInputChange}
      >
        <option value="">Select Role</option>
        <option value="Admin">Admin</option>
        <option value="Editor">Editor</option>
      </select>
      <div className="button-container">
        <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>
          Cancel
        </button>
        <button className="add-btn" onClick={handleAddUser}>
          Add User
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </section>
  );
};

export default UserManagement;
