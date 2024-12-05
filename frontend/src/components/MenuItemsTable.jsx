import React from "react";
import ItemTable from "./table";
import { useState,useEffect } from "react";
/**
 * MenuItemsTable Component
 *
 * A functional React component that fetches menu items data from an API and displays it
 * in a table format using the `ItemTable` component.
 *
 * @component
 * @example
 * return (
 *   <MenuItemsTable />
 * )
 */
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
              <ItemTable columns={["menuid",'item_name','category','premium' , 'ingredientsused']} rows={data} table={"menuitems"}/>
          </div>
      </div>
  )
}

export default MenuItemsTable;