import React from 'react';
import { Link, useLocation } from 'react-router-dom';
function BackButton() {
    const location = useLocation();
  
    if (location.pathname === '/') {
      return null; // Don't show the back button on the home page
    }
  
    return (
      <Link to="/" className="manager-nav-bar-button back-button">
        Back
      </Link>
    );
  }
  
  export default BackButton;