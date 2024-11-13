// import React, { useEffect, useState } from 'react';
// import './kitchen.css';

// function KitchenItems() {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:3000/api/kitchen')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => setData(data))
//       .catch(err => setError(err.message));
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const deleteItem = (id) => {
//     fetch(`http://localhost:3000/api/kitchen/${id}`, {
//       method: 'DELETE',
//     })
//       .then(response => {
//         console.log('Response Status:', response.status);
  
//         // Check if the response is successful
//         if (!response.ok) {
//           throw new Error(`Failed to delete item: ${response.statusText}`);
//         }
  
//         // Handle different status codes
//         if (response.status === 204) {
//           console.log('Item deleted, no content returned');
//         }
  
//         return response.json(); // Parse the response body as JSON, if necessary
//       })
//       .then(data => {
//         // Handle the success response (if any body is returned)
//         if (data && data.error) {
//           throw new Error(data.error); // If the server responds with an error message
//         }
  
//         // Update the local state to remove the deleted item from the UI
//         setData(prevData => prevData.filter(item => item.id !== id)); // Use functional update for state
//       })
//       .catch(err => {
//         console.error('Delete Error:', err.message);
//         setError(err.message); // Display the error message on the UI
//       });
//   };
  
//   return (
//     <div>
//       <h1>To-Do Items</h1>
//       <p>{data.map(item => item.id).join(', ')}</p> {/* Display items as plain text */}
//       <div id="container">
//         {data.map(item => (
//           <div key={item.id} className="box">
//             <span>ID: {item.id}</span>
//             <button onClick={() => deleteItem(item.id)}>Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default KitchenItems;



//New stuff that works:
// import React, { useEffect, useState } from 'react';
// import './kitchen.css';

// function KitchenItems() {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [timers, setTimers] = useState({});

//   // Fetch items initially and on interval
//   useEffect(() => {
//     const fetchItems = () => {
//       fetch('http://localhost:3000/api/kitchen')
//         .then(response => {
//           if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//           }
//           return response.json();
//         })
//         .then(fetchedData => {
//           // Map each new item to a unique start time
//           const newItems = fetchedData.filter(item => !data.some(d => d.id === item.id));
//           const newTimers = {};
//           newItems.forEach(item => {
//             newTimers[item.id] = Date.now();
//           });
//           setTimers(prevTimers => ({ ...prevTimers, ...newTimers }));
//           setData(fetchedData);
//         })
//         .catch(err => setError(err.message));
//     };

//     fetchItems();
//     const intervalId = setInterval(fetchItems, 5000); // Poll every 5 seconds
//     return () => clearInterval(intervalId);
//   }, [data]);


//   const deleteItem = (id) => {
//     fetch(`http://localhost:3000/api/kitchen/${id}`, { method: 'DELETE' })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`Failed to delete item: ${response.statusText}`);
//         }
//         return response.json();
//       })
//       .then(() => {
//         setData(prevData => prevData.filter(item => item.id !== id));
//         setTimers(prevTimers => {
//           const newTimers = { ...prevTimers };
//           delete newTimers[id]; // Remove the timer for the deleted item
//           return newTimers;
//         });
//       })
//       .catch(err => setError(err.message));
//   };


//   return (
//     <div>
//       <h1>To-Do Items</h1>
//       {error && <div>Error: {error}</div>}
//       <div id="container">
//         {data.map(item => {
//           const startTime = timers[item.id];
//           const timeElapsed = startTime ? Date.now() - startTime : 0;
//           const seconds = Math.floor((timeElapsed / 1000) % 60);
//           const minutes = Math.floor((timeElapsed / (1000 * 60)) % 60);

//           return (
//             <div key={item.id} className="box">
//               <p className="timer">Time: {minutes}m {seconds}s</p>
//               <span>ID: {item.id}</span>
//               <button onClick={() => deleteItem(item.id)}>Delete</button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default KitchenItems;






//Background color minus automatic fetching

// import React, { useEffect, useState } from 'react';
// import './kitchen.css';

// function KitchenItems() {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [timers, setTimers] = useState({});

//   useEffect(() => {
//     fetch('http://localhost:3000/api/kitchen')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         setData(data);
//         const initialTimers = {};
//         data.forEach(item => {
//           initialTimers[item.id] = { startTime: Date.now(), minutes: 0, seconds: 0, color: 'green' };
//         });
//         setTimers(initialTimers);
//       })
//       .catch(err => setError(err.message));
//   }, []);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setTimers(prevTimers => {
//         const updatedTimers = { ...prevTimers };
//         for (const id in updatedTimers) {
//           const elapsed = Date.now() - updatedTimers[id].startTime;
//           const minutes = Math.floor((elapsed / 1000 / 60) % 60);
//           const seconds = Math.floor((elapsed / 1000) % 60);

//           let color = 'green';
//           if (minutes >= 20) {
//             color = 'red';
//           } else if (minutes >= 1) {
//             color = 'yellow';
//           }

//           updatedTimers[id] = { ...updatedTimers[id], minutes, seconds, color };
//         }
//         return updatedTimers;
//       });
//     }, 1000);

//     return () => clearInterval(intervalId); // Clear interval on component unmount
//   }, []);


//   const deleteItem = (id) => {
//     fetch(`http://localhost:3000/api/kitchen/${id}`, {
//       method: 'DELETE',
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`Failed to delete item: ${response.statusText}`);
//         }
//         return response.json();
//       })
//       .then(() => {
//         setData(prevData => prevData.filter(item => item.id !== id));
//         setTimers(prevTimers => {
//           const updatedTimers = { ...prevTimers };
//           delete updatedTimers[id];
//           return updatedTimers;
//         });
//       })
//       .catch(err => setError(err.message));
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }


//   return (
//     <div>
//       <h1>To-Do Items</h1>
//       <div id="container">
//         {data.map(item => (
//           <div key={item.id} className="box">
//             <div
//               className="timer-box"
//               style={{ backgroundColor: timers[item.id]?.color || 'green' }}
//             >
//               Time: {timers[item.id]?.minutes || 0}m {timers[item.id]?.seconds || 0}s
//             </div>
//             <span>ID: {item.id}</span>
//             <button onClick={() => deleteItem(item.id)}>Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default KitchenItems;





import React, { useEffect, useState } from 'react';
import './kitchen.css';

function KitchenItems() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [timers, setTimers] = useState({});

  // Fetch items initially and on interval
  useEffect(() => {
    const fetchItems = () => {
      fetch('http://localhost:3000/api/kitchen')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(fetchedData => {
          const newItems = fetchedData.filter(item => !data.some(d => d.id === item.id));
          const newTimers = {};
          newItems.forEach(item => {
            newTimers[item.id] = Date.now();
          });
          setTimers(prevTimers => ({ ...prevTimers, ...newTimers }));
          setData(fetchedData);
        })
        .catch(err => setError(err.message));
    };

    fetchItems();
    const intervalId = setInterval(fetchItems, 5000); // Poll every 5 seconds
    return () => clearInterval(intervalId);
  }, [data]);

  
  //Deletes item from the database when you click "Done"
  const deleteItem = (id) => {
    fetch(`http://localhost:3000/api/kitchen/${id}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to delete item: ${response.statusText}`);
        }
        return response.json();
      })
      .then(() => {
        setData(prevData => prevData.filter(item => item.id !== id));
        setTimers(prevTimers => {
          const newTimers = { ...prevTimers };
          delete newTimers[id]; // Removes the timer from the deleted item
          return newTimers;
        });
      })
      .catch(err => setError(err.message));
  };

  // Function to determine background color based on elapsed time
  const getTimerBackgroundColor = (startTime) => {
    const timeElapsed = Date.now() - startTime;
    const minutes = Math.floor((timeElapsed / (1000 * 60)) % 60);

    if (minutes >= 20) {
      return 'red';
    } else if (minutes >= 10) {
      return 'yellow';
    } else {
      return 'green';
    }
  };

  // What gets outputted essentially
  return (
    <div>
      <h1>To-Do Items</h1>
      {error && <div>Error: {error}</div>}
      <div id="container">
        {data.map(item => {
          const startTime = timers[item.id];
          const timeElapsed = startTime ? Date.now() - startTime : 0;
          const seconds = Math.floor((timeElapsed / 1000) % 60);
          const minutes = Math.floor((timeElapsed / (1000 * 60)) % 60);
          
          const backgroundColor = startTime ? getTimerBackgroundColor(startTime) : 'green';

          return (
            <div key={item.id} className="box">
              <p className="timer" style={{ backgroundColor }}>
                Time: {minutes}m {seconds}s
              </p>
              <span>ID: {item.id}</span>
              <button onClick={() => deleteItem(item.id)}>Done</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default KitchenItems;

