import React from "react";
import './styles.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; 2024 RBAC Admin. All Rights Reserved.</p>
        <div className="footer-links">
          <a href="#privacy-policy">Privacy Policy</a>
          <a href="#terms-of-service">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
