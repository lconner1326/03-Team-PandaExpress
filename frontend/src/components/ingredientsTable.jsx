import React from "react";
import ItemTable from "./table";
import { useState,useEffect } from "react";
/**
 * IngredientsTable Component
 *
 * A React component that fetches ingredients data from an API and displays it in a table format.
 * The data is passed to the `ItemTable` component for rendering. Handles API errors gracefully.
 *
 * @component
 * @example
 * return (
 *   <IngredientsTable />
 * )
 */
function IngredientsTable () {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://project-3-03-team-2xy5.onrender.com/api/ingredients')
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
          <h1 className="page-header">Ingredients Table</h1>
          <div className="staff-table-wrapper">
              <ItemTable columns={["ingredientid",'ingredient_name','units','restock_level']} rows={data} table={"ingredients"}/>
          </div>
      </div>
  )
}

export default IngredientsTable;