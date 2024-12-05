import { useState } from "react";


/**
 * AddStaff Component
 *
 * A React component that allows the manager to add a new staff member by entering their
 * name and selecting their position. On form submission, the data is sent to the backend
 * API for storage.
 *
 * @component
 * @example
 * return (
 *   <AddStaff />
 * )
 */
function AddStaff(){
    
    const [showForm, setShowForm] = useState(false);
    
    const [staff_name, setStaff_name] = useState('');
     
    const [position, setPosition] = useState('Employee');

    const handleButtonClick = () => {
        setShowForm(true);
    };
  /**
   * Handles form submission.
   * Prevents default form behavior, sends staff data to the backend API, and
   * hides the form after successful submission.
   *
   * @param {Object} e - The form submission event.
   */
    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(staff_name, position);
        // Handle form submission logic here
        fetch('https://project-3-03-team-2xy5.onrender.com/api/addStaffData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                staff_name,
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
                                value={staff_name}
                                onChange={(e) => setStaff_name(e.target.value)}
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