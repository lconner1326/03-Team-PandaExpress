import React from "react";
import ItemTable from "./table";
import { useState,useEffect } from "react";

function MenuItemsTable () {
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
      <div>
          <h1>Menu Items Table</h1>
          <div className="staff-table-wrapper">
              <ItemTable columns={["id","week","day","hour","priceditem","side","entree1","entree2","entree3","cost","premium",'item_id']} rows={data} />
          </div>
      </div>
  )
}

export default MenuItemsTable;