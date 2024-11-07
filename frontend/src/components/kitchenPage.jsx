import React, { useEffect, useState } from 'react';
import './kitchen.css';

function KitchenItems() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/kitchen')
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

  // const deleteItem = (id) => {
  //   fetch(`http://localhost:3000/api/kitchen/${id}`, {
  //     method: 'DELETE',
  //   })
  //     .then(response => {
  //       console.log('Response Status:', response.status);
  //       return response.json(); // Parse the response body as JSON
  //     })
  //     .then(data => {
  //       // Handle the success response
  //       if (data.error) {
  //         throw new Error(data.error); // If the server responds with an error message
  //       }
  //       // Update the local state to remove the deleted item from the UI
  //       setData(data.filter(item => item.id !== id));
  //     })
  //     .catch(err => {
  //       console.error('Delete Error:', err.message);
  //       setError(err.message);  // Display the error message on the UI
  //     });
  // };
  const deleteItem = (id) => {
    fetch(`http://localhost:3000/api/kitchen/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        console.log('Response Status:', response.status);
  
        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`Failed to delete item: ${response.statusText}`);
        }
  
        // Handle different status codes
        if (response.status === 204) {
          console.log('Item deleted, no content returned');
        }
  
        return response.json(); // Parse the response body as JSON, if necessary
      })
      .then(data => {
        // Handle the success response (if any body is returned)
        if (data && data.error) {
          throw new Error(data.error); // If the server responds with an error message
        }
  
        // Update the local state to remove the deleted item from the UI
        setData(prevData => prevData.filter(item => item.id !== id)); // Use functional update for state
      })
      .catch(err => {
        console.error('Delete Error:', err.message);
        setError(err.message); // Display the error message on the UI
      });
  };
  
  

  return (
    <div>
      <h1>To-Do Items</h1>
      <p>{data.map(item => item.id).join(', ')}</p> {/* Display items as plain text */}
      <div id="container">
        {data.map(item => (
          <div key={item.id} className="box">
            <span>ID: {item.id}</span>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KitchenItems;
