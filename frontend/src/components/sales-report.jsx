import React, { useState } from 'react';

function SalesReport() {
    const [salesData, setSalesData] = useState([]);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        startWeek: '',
        endWeek: '',
        startHour: '',
        endHour: '',
        startDay: '',
        endDay: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const startCompositeTime = (formData.startWeek * 10000) + (formData.startDay * 100) + formData.startHour;
        const endCompositeTime = (formData.endWeek * 10000) + (formData.endDay * 100) + formData.endHour;
        console.log({startCompositeTime, endCompositeTime});
        
        fetch('http://localhost:3000/api/SalesData', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ startCompositeTime, endCompositeTime }),
        })
            .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
            })
            .then(fetchedData => setSalesData(fetchedData))
            .catch(err => setError(err.message));
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="sales-report">
            <h1>Sales Report</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="startWeek">Start Week:</label>
                    <input type="text" id="startWeek" name="startWeek" value={formData.startWeek} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="endWeek">End Week:</label>
                    <input type="text" id="endWeek" name="endWeek" value={formData.endWeek} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="startHour">Start Hour:</label>
                    <input type="text" id="startHour" name="startHour" value={formData.startHour} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="endHour">End Hour:</label>
                    <input type="text" id="endHour" name="endHour" value={formData.endHour} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="startDay">Start Day:</label>
                    <input type="text" id="startDay" name="startDay" value={formData.startDay} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="endDay">End Day:</label>
                    <input type="text" id="endDay" name="endDay" value={formData.endDay} onChange={handleChange} />
                </div>
                <button type="submit">Run Sales Report</button>
            </form>
            
            {/* Display sales data after form submission */}
            {salesData.length > 0 && (
                <div>
                    <h2>Sales Data:</h2>
                    {salesData.map((item, index) => (
                        <div key={index}>{item.item_name} {item.total_sales}</div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SalesReport;
