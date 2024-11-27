import React from "react";
import './styles.css';

const Dashboard = () => {
  return (
    <section id="dashboard" className="module">
      <div className="container">
        {/* Dashboard Header */}
        <h2>Dashboard</h2>
        
        {/* Statistics Section */}
        <div className="stats">
          <div className="card">
            <p>Total Users:</p>
            <span>1,234</span>
          </div>
          <div className="card">
            <p>Total Roles:</p>
            <span>15</span>
          </div>
          <div className="card">
            <p>Total Permissions:</p>
            <span>56</span>
          </div>
          <div className="card">
            <p>Total Resources:</p>
            <span>28</span>
          </div>
        </div>
        
        {/* Recent Activity Section */}
        <div className="activity">
          <h3>Recent Activity</h3>
          <ul>
            <li><span className="material-icons">person_add</span> New user assigned: John Doe</li>
            <li><span className="material-icons">assignment_ind</span> Role Editor assigned to user: Jane Smith</li>
            <li><span className="material-icons">create_new_folder</span> New permission created: "Delete Articles"</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
