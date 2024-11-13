import ItemTable from "./table";
import { useEffect, useState } from "react";

function ZReport(){
    const [error, setError] = useState(null);
    const [zreportdata, setZReportData] = useState([]);

    useEffect(() => {
      fetch('http://localhost:3000/api/zreportdata/request')
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
        fetch('http://localhost:3000/api/ZReportData/generate')
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
          })
          .then(() => {
            return fetch('http://localhost:3000/api/ZReportData/request');
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
        <div>
            <h1>Z Report</h1>
            {console.log(zreportdata)}
            <div className="staff-table-wrapper">
                <button onClick={handleSubmit} className="manager-nav-bar-button">Generate new Z-Report</button>
                <ItemTable columns={["hour", "order_id", "cost"]} rows={zreportdata} />
            </div>
        </div>
    )
}

export default ZReport;