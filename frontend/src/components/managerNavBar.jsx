import React from "react";
import { Link } from "react-router-dom";

function ManagerNavBar() {
    return (
        <div className="manager-nav-bar">
            <Link to="/manager/x-report" className="manager-nav-bar-button">x-report</Link>
            <Link to="/manager/z-report" className="manager-nav-bar-button">z-report</Link>
            <Link to="/manager/restock-report" className="manager-nav-bar-button">restock-report</Link>
            <Link to="/manager/sales-report" className="manager-nav-bar-button">sales report</Link>
            <Link to="/manager/menuitems-table" className="manager-nav-bar-button">menuitems table</Link>
            <Link to="/manager/priceditems-table" className="manager-nav-bar-button">priceditems table</Link>
            <Link to="/manager/ingredients-table" className="manager-nav-bar-button">ingredients table</Link>
            <Link to="/manager/staff-table" className="manager-nav-bar-button">staff table</Link>
            <Link to="/manager/order-history-table" className="manager-nav-bar-button">order history table</Link>
        </div>
    );
}

export default ManagerNavBar;