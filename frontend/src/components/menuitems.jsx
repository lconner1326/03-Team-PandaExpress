import React, { useEffect, useState } from 'react';

function MenuItems() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/data')
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
      <h1>Menu Items</h1>
      <p>{data.map(item => item.item_name).join(', ')}</p> {/* Display items as plain text */}
    </div>
  );
}

export default MenuItems;
