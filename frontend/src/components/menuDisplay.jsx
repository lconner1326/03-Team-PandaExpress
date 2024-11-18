import React from 'react';
import { Link } from "react-router-dom";
import './menuDisplaystyle.css';

function MenuPage () {
   return(
    <div className="menu-display">
        <Link to="/manager" className="manager-nav-bar-button">Manager</Link>
        <Link to="/menu Display 1" className="menu display page">Next page</Link>
    </div>
   );
    

   
}

export default MenuPage;
