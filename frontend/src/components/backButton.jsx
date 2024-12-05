import React from 'react';
import { Link, useLocation } from 'react-router-dom';
/**
 * BackButton Component
 *
 * A simple React component that conditionally renders a "Back" button to navigate
 * back to the home page (`/`). The button is hidden when the user is already on the home page.
 *
 * @component
 * @example
 * return (
 *   <BackButton />
 * )
 */
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