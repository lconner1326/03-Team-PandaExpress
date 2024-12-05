import { useState, useEffect } from "react";
import ItemTable from "./table";
/**
 * OrderHistoryTable Component
 *
 * Fetches and displays order history data from an API in a table format using the `ItemTable` component.
 *
 * @component
 * @example
 * return (
 *   <OrderHistoryTable />
 * )
 */
function OrderHistoryTable(){
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch('https://project-3-03-team-2xy5.onrender.com/api/OrderHistoryData')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => setData(data))
        .catch(err => setError(err.message));
    }, []);
  
    if (error) {
      return <div>Error: {error}</div>;
    }


    return (
        <div className="page-wrapper">
            <h1 className="page-header">Order History Table</h1>
            <div className="staff-table-wrapper">
                <ItemTable columns={["id","week","day","hour","priceditem","side","entree1","entree2","entree3","cost","premium",'item_id']} rows={data} table={"neworderhistory"}/>
            </div>
        </div>
    )
}

export default OrderHistoryTable;