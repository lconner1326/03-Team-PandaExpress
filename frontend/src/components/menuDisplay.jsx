import React from 'react';
import { Link } from "react-router-dom";
import './menuDisplaystyle.css';
/**
 * MenuPage Component
 *
 * A functional React component that provides navigation links for the menu display.
 * Includes a link to the manager page and a link to navigate to the next menu display page.
 *
 * @component
 * @example
 * return (
 *   <MenuPage />
 * )
 */
function MenuPage () {
   return(
    <div className="menu-display">
        <Link to="/manager" className="manager-nav-bar-button">Manager</Link>
        <Link to="/menu Display 1" className="menu display page">Next page</Link>
    </div>
   );
    

   
}

export default MenuPage;
