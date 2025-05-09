import ItemTable from "./table";
import { useEffect, useState } from "react";

/**
 * ZReport Component
 *
 * Displays the Z-Report data, which includes summarized order information.
 * Allows the user to generate a new report, fetching the updated data from the API.
 *
 * @component
 * @example
 * return (
 *   <ZReport />
 * )
 */
function ZReport(){
    const [error, setError] = useState(null);
    const [zreportdata, setZReportData] = useState([]);

    useEffect(() => {
      fetch('https://project-3-03-team-2xy5.onrender.com/api/zreportdata/request')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(zreportdata => setZReportData(zreportdata))
        .catch(err => setError(err.message));
    }, []);
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    const handleSubmit = () => {
        fetch('https://project-3-03-team-2xy5.onrender.com/api/ZReportData/generate')
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
          })
          .then(() => {
            return fetch('https://project-3-03-team-2xy5.onrender.com/api/ZReportData/request');
          })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(zreportdata => setZReportData(zreportdata))
          .catch(err => setError(err.message));
    
      if (error) {
        return <div>Error: {error}</div>;
      }
    }


    return (
        <div className="page-wrapper">
            <h1 className="page-header">Z Report</h1>
            {console.log(zreportdata)}
            <div className="staff-table-wrapper">
                <button onClick={handleSubmit} className="manager-nav-bar-button">Generate new Z-Report</button>
                <ItemTable columns={["hour", "order_id", "cost"]} rows={zreportdata} />
            </div>
        </div>
    )
}

export default ZReport;