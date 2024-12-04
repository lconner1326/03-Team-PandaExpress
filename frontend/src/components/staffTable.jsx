import React, { useEffect, useState } from 'react';
import ItemTable from './table';
import AddStaff from './addStaff';
import '../App.css';

function StaffTable(){

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch('https://project-3-03-team-2xy5.onrender.com/api/StaffData')
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
        <div className='page-wrapper'>
            <AddStaff />
            <h1 className='page-header'>Staff Table</h1>
            <div className="staff-table-wrapper">
                <ItemTable columns={["employee_id", "staff_name","position","active"]} rows={data} table={"staff"}/>
            </div>
        </div>
    )
}

export default StaffTable;