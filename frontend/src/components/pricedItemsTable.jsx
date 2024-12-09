import React from "react";
import ItemTable from "./table";
import { useState,useEffect } from "react";
import AddPricedItem from "./addPricedItem";
/**
 * PricedItemsTable Component
 *
 * Fetches and displays priced items data from an API in a table format using the `ItemTable` component.
 *
 * @component
 * @example
 * return (
 *   <PricedItemsTable />
 * )
 */
function PricedItemsTable () {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://project-3-03-team-2xy5.onrender.com/api/priceditems')
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
        <AddPricedItem/>
          <h1 className="page-header">Priced Items Table</h1>
          <div className="staff-table-wrapper">
              <ItemTable columns={["itemid",'item_name','category','price' ]} rows={data} table={"priceditems"} />
          </div>
      </div>
  )
}

export default PricedItemsTable;