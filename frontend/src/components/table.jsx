import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './table.css';

const ItemTable = ({ columns, rows, table }) => {
  const [data, setData] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false);

  const formatNumber = (num) => {
    return Number.isInteger(num) ? num : num.toFixed(2);
  };

  const formatValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(', ');
    } else if (typeof value === 'boolean') {
      return value.toString();
    } else if (typeof value === 'number') {
      return formatNumber(value);
    } else {
      return value;
    }
  };

  const handleEdit = (rowIndex) => {
    console.log(`Edit button clicked for row ${rowIndex}`, rows[rowIndex]);
    setData(rows[rowIndex]);
    setIsFormVisible(true); // Show the form
  };

  const handleClose = () => {
    setIsFormVisible(false); // Hide the form
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => {
      const newData = {
        ...prevData,
        [name]: value,
      };
      console.log('Data updated:', newData);
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', data);
    // Handle form submission logic here (e.g., sending updated data to a server)
    fetch(`https://project-3-03-team-2xy5.onrender.com/api/modify/${table}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        setIsFormVisible(false); // Close the form after submission
        setData({}); // Clear the form data
      })
      .catch((error) => {
        console.error('Error during form submission:', error);
      });
  };

  return (
    <div>
      {/* Table Display */}
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
            {table && <th>Modify</th>} {/* Conditionally render the "Modify" column */}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{formatValue(row[column])}</td>
              ))}
              {table && ( // Conditionally render the "Modify" button column
                <td>
                  <button
                    className="manager-nav-bar-button"
                    onClick={() => handleEdit(rowIndex)}
                  >
                    Edit
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Form for Editing */}
      {isFormVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Item</h2>
            <form onSubmit={handleSubmit}>
              {columns
                .filter((column) => !column.endsWith('id')) // Filter out columns that end with 'id'
                .map((column, index) => (
                  <div key={index} className="form-group">
                    <label htmlFor={column}>{column}</label>
                    <input
                      className="edit-input"
                      type="text"
                      id={column}
                      name={column}
                      value={data[column] || ''}
                      onChange={handleChange}
                    />
                  </div>
                ))}

              <div className="form-actions">
                <button type="submit">Save</button>
                <button type="button" onClick={handleClose}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

ItemTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  table: PropTypes.string, // Optional prop for conditional rendering
};

export default ItemTable;
