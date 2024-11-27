import React, { useState, useEffect } from "react";
import "./styles.css";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]); // Store role data
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [formData, setFormData] = useState({ roleName: "", permissions: [] }); // Form data

  // Fetch initial roles on component mount
  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = () => {
    fetch("http://localhost:5000/api/roles") // Replace with your API endpoint
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch roles");
        return res.json();
      })
      .then((data) => setRoles(data)) // Populate roles state
      .catch((error) => console.error("Error fetching roles:", error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      permissions: checked
        ? [...prev.permissions, value]
        : prev.permissions.filter((perm) => perm !== value),
    }));
  };

  const handleAddRole = () => {
    if (!formData.roleName) {
      alert("Role name is required.");
      return;
    }

    fetch("http://localhost:5000/api/roles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.roleName,
        permissions: formData.permissions,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add role");
        return res.json();
      })
      .then((newRole) => {
        setRoles([...roles, newRole.role]); // Update roles list
        setIsModalOpen(false); // Close modal
        setFormData({ roleName: "", permissions: [] }); // Reset form
      })
      .catch((error) => console.error("Error adding role:", error));
  };

  return (
    <section id="user-management" className="module">
      <div className="container">
        <h2>Role Management</h2>
        <div className="actions">
          <input type="text" placeholder="Search roles..." />
          <button className="add-user-btn" onClick={() => setIsModalOpen(true)}>
            <span className="material-icons">add</span> Add Role
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Role Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role._id}>
                <td>{role.name}</td>
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
      {/* Close Button */}
      <span className="modal-close" onClick={() => setIsModalOpen(false)}>
        &times;
      </span>

      {/* Modal Header */}
      <h3>Add New Role</h3>
      <p>Fill in the details below to create and customize a new role.</p>

      {/* Role Name Input */}
      <input
        type="text"
        name="roleName"
        placeholder="Role Name"
        value={formData.roleName}
        onChange={handleInputChange}
      />

<div className="permissions">
  <h4>Permissions</h4>
  <div className="permissions-wrapper">
    <label>View Users
      <input
        type="checkbox"
        value="View Users"
        checked={formData.permissions.includes("View Users")}
        onChange={handlePermissionChange}
      />
      
    </label>
    <label>Create Posts
      <input
        type="checkbox"
        value="Create Posts"
        checked={formData.permissions.includes("Create Posts")}
        onChange={handlePermissionChange}
      />
      
    </label>
    <label> Edit Settings
      <input
        type="checkbox"
        value="Edit Settings"
        checked={formData.permissions.includes("Edit Settings")}
        onChange={handlePermissionChange}
      />
     
    </label>
  </div>
</div>


      {/* Button Container */}
      <div className="button-container">
        <button
          className="cancel-btn"
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </button>
        <button className="add-btn" onClick={handleAddRole}>
          Add Role
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </section>
  );
};

export default RoleManagement;
