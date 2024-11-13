import { useState,useEffect } from "react";
import ItemTable from "./table";
import '../App.css';

function RestockTable(){
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch('http://localhost:3000/api/RestockData')
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
            <h1>Restock Table</h1>
            <div className="staff-table-wrapper">
                <ItemTable columns={["ingredientid", "ingredient_name", "restock_level","units"]} rows={data.filter(item => item.units < item.restock_level)} />

            </div>
        </div>
    )
}

export default RestockTable;

