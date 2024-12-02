import React from "react";
import ItemTable from "./table";
import { useState,useEffect } from "react";

function MenuItemsTable () {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://project-3-03-team-2xy5.onrender.com/api/menuItems')
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
          <h1 className="page-header">Menu Items Table</h1>
          <div className="staff-table-wrapper">
              <ItemTable columns={["menuid",'item_name','category','premium' , 'ingredientsused']} rows={data} />
          </div>
      </div>
  )
}

export default MenuItemsTable;