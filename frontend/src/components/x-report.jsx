import { useState,useEffect } from "react";
import ItemTable from "./table";
/**
 * XReport Component
 *
 * Fetches and displays the X-Report data from the API. 
 * The report includes hourly data, order IDs, and costs.
 *
 * @component
 * @example
 * return (
 *   <XReport />
 * )
 */
function XReport(){
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch('https://project-3-03-team-2xy5.onrender.com/api/XReportData')
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
            <h1 className="page-header">X Report</h1>
            <div className="staff-table-wrapper">
                <ItemTable columns={["hour", "id", "cost"]} rows={data} />
            </div>
        </div>
    )
}


export default XReport;