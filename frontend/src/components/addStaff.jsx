import { useState } from "react";

function AddStaff(){
    const [showForm, setShowForm] = useState(false);
    const [employeeName, setEmployeeName] = useState('');
    const [position, setPosition] = useState('employee');

    const handleButtonClick = () => {
        setShowForm(true);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(employeeName, position);
        // Handle form submission logic here
        fetch('https://project-3-03-team-2xy5.onrender.com/api/addStaffData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: employeeName,
                position,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        setShowForm(false);
    };

    return (
        <div>
            <button  className="manager-nav-bar-button" onClick={handleButtonClick}>Add Staff</button>
            {showForm && (
                <div className="form">
                    <form onSubmit={handleFormSubmit} className="employee-form">
                        <label>
                            Employee Name:
                            <input
                                type="text"
                                value={employeeName}
                                onChange={(e) => setEmployeeName(e.target.value)}
                            />
                        </label>
                        <label className="form-label">
                            Position:
                            <select
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                            >
                                <option value="manager">Manager</option>
                                <option value="employee">Employee</option>
                            </select>
                        </label>
                        <button type="submit" className="manager-nav-bar-button" id="submit">Submit</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default AddStaff;