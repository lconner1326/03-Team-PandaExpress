import React from "react";
import { Link } from "react-router-dom";

function ManagerNavBar() {
    return (
        <div className="manager-nav-bar">
            <Link to="/manager/x-report" className="manager-nav-bar-button">X-Report</Link>
            <Link to="/manager/z-report" className="manager-nav-bar-button">Z-Report</Link>
            <Link to="/manager/restock-report" className="manager-nav-bar-button">Restock-Report</Link>
            <Link to="/manager/sales-report" className="manager-nav-bar-button">Sales Report</Link>
            <Link to="/manager/menuitems-table" className="manager-nav-bar-button">MenuItems Table</Link>
            <Link to="/manager/priceditems-table" className="manager-nav-bar-button">PricedItems Table</Link>
            <Link to="/manager/ingredients-table" className="manager-nav-bar-button">Ingredients Table</Link>
            <Link to="/manager/staff-table" className="manager-nav-bar-button">Staff Table</Link>
            <Link to="/manager/order-history-table" className="manager-nav-bar-button">Order History Table</Link>
        </div>
    );
}

export default ManagerNavBar;