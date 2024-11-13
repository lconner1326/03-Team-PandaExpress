import { useState,useEffect } from "react";
import ItemTable from "./table";

function XReport(){
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch('http://localhost:3000/api/XReportData')
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
            <h1>X Report</h1>
            <div className="staff-table-wrapper">
                <ItemTable columns={["hour", "id", "cost"]} rows={data} />
            </div>
        </div>
    )
}


export default XReport;