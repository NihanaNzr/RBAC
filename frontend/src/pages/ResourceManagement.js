import React from "react";
import './styles.css';

const ResourceManagement = () => {
  return (
    <section id="user-management" className="module">
      <div className="container">
        <h2>Resource Management</h2>
        <div className="actions">
          <input type="text" placeholder="Search resources..." />
          <button className="add-user-btn">
            <span className="material-icons">add</span>Resource
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Resource Name</th>
              <th>Type</th>
              <th>Permissions</th>
	      <th>Actions</th>
             
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>User API</td>
              <td>API</td>
	      <td>View, Create, Update, Delete</td>
             
              <td>
                <button className="edit-btn">
                  <span className="material-icons">edit</span>
                </button>
                <button className="delete-btn">
                  <span className="material-icons">delete</span>
                </button>
              </td>
            </tr>
            <tr>
              <td> Dashboard</td>
              <td>Page</td>
	      <td>View</td>
              
              <td>
                <button className="edit-btn">
                  <span className="material-icons">edit</span>
                </button>
                <button className="delete-btn">
                  <span className="material-icons">delete</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div> 
    </section>
  );
};

export default ResourceManagement;
