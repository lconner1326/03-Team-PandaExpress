import { useState,useEffect } from "react";
import ItemTable from "./table";
import '../App.css';
/**
 * RestockTable Component
 *
 * Fetches ingredient data from an API and displays a table of items needing restocking.
 *
 * @component
 * @example
 * return (
 *   <RestockTable />
 * )
 */
function RestockTable(){
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch('https://project-3-03-team-2xy5.onrender.com/api/RestockData')
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
            <h1 className="page-header">Restock Table</h1>
            <div className="staff-table-wrapper">
                <ItemTable columns={["ingredientid", "ingredient_name", "restock_level","units"]} rows={data.filter(item => item.units < item.restock_level)} />
            </div>
        </div>
    )
}

export default RestockTable;

