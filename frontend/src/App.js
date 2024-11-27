import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route to Login Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Route to Register Page */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Route to Dashboard */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Default Route */}
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
