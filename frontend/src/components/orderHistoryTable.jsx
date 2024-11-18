import { useState, useEffect } from "react";
import ItemTable from "./table";

function OrderHistoryTable(){
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch('http://localhost:3000/api/OrderHistoryData')
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
            <h1>Order History Table</h1>
            <div className="staff-table-wrapper">
                <ItemTable columns={["id","week","day","hour","priceditem","side","entree1","entree2","entree3","cost","premium",'item_id']} rows={data} />
            </div>
        </div>
    )
}

export default OrderHistoryTable;