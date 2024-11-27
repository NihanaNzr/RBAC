import React from "react";
import Navbar from "../pages/Navbar";
import Dashboard from "../pages/Dashboard";
import UserManagement from "../pages/UserManagement";
import RoleManagement from "../pages/RoleManagement";
import PermissionManagement from "../pages/PermissionManagement";
import ResourceManagement from "../pages/ResourceManagement";
import Footer from "../pages/Footer";
import './styles.css';

const DashboardPage = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Dashboard />
        <UserManagement />
        <RoleManagement />
        <PermissionManagement />
        <ResourceManagement />
       
      </main>
        <Footer/>
    </div>
  );
};

export default DashboardPage;
