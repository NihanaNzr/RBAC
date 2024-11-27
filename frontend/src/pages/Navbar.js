import React from "react";
import { Link } from "react-router-dom";
import './styles.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="container">
        <h1 className="navbar-title">RBAC Admin</h1>
        <nav>
          <ul>
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#user-management">Users</a></li>
            <li><a href="#role-management">Roles</a></li>
            <li><a href="#permission-management">Permissions</a></li>
            <li><a href="#resource-management">Resources</a></li>
          </ul>
        </nav>
        <div className="user-actions">
          <span>Admin User</span>
          <Link to="/login" className="logout-button">Logout</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
