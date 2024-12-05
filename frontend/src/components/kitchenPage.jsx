// import React, { useEffect, useState } from 'react';
// import './kitchen.css';

// function KitchenItems() {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [timers, setTimers] = useState({});
//   const [priceditemNames, setPricedItemNames] = useState([]);

//   // Fetch items initially and on interval
//   useEffect(() => {
//     const fetchItems = () => {
//       fetch('https://project-3-03-team-2xy5.onrender.com/api/kitchen')
//         .then(response => {
//           if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//           }
//           return response.json();
//         })
//         .then(fetchedData => {
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

//     const fetchPricedItems = () => {
//       fetch('https://project-3-03-team-2xy5.onrender.com/api/priceditems') // New endpoint
//         .then(response => response.ok ? response.json() : Promise.reject(response.statusText))
//         .then(names => {
//           const namesMap = {};
//           names.forEach(nameItem => {
//             namesMap[nameItem.itemid] = nameItem.item_name;
//             console.log(namesMap[nameItem.itemid]);
//           });
//           setPricedItemNames(namesMap); // Store mapping directly
//         })
//         .catch(err => setError(err));
//     };

//     fetchItems();
//     fetchPricedItems();
//     const intervalId = setInterval(fetchItems, 5000); // Poll every 5 seconds
//     return () => clearInterval(intervalId);
//   }, [data]);

  
//   // Deletes item from the database when you click "Done"
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
//           delete newTimers[id]; // Removes the timer from the deleted item
//           return newTimers;
//         });
//       })
//       .catch(err => setError(err.message));
//   };

//   // Function to determine background color based on elapsed time
//   const getTimerBackgroundColor = (startTime) => {
//     const timeElapsed = Date.now() - startTime;
//     const minutes = Math.floor((timeElapsed / (1000 * 60)) % 60);

//     if (minutes >= 20) {
//       return 'red';
//     } else if (minutes >= 10) {
//       return 'yellow';
//     } else {
//       return 'green';
//     }
//   };

//   // What gets outputted essentially
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
          
//           const backgroundColor = startTime ? getTimerBackgroundColor(startTime) : 'green';

//           const p_i_name = priceditemNames[item.priceditem] || 'Unknown';
//           return (
//             <div key={item.id} className="box">
//               <p className="timer" style={{ backgroundColor }}>
//                 Time: {minutes}m {seconds}s
//               </p>
//               <span>ID: {item.id}</span>
//               <span>Item: {p_i_name}</span>
//               <span>Item: {priceditemNames[1]}</span>
//               <button onClick={() => deleteItem(item.id)}>Done</button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default KitchenItems;




import React, { useEffect, useState } from 'react';
import './kitchen.css';
/**
 * KitchenItems Component
 *
 * Displays a list of orders for the kitchen staff with real-time updates. Orders are fetched
 * from the backend and displayed with timers to track preparation times. Provides functionality
 * to delete orders when completed.
 *
 * @component
 * @example
 * return (
 *   <KitchenItems />
 * )
 */
function KitchenItems() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [timers, setTimers] = useState({});
  const [pricedItemNames, setPricedItemNames] = useState([]);
  const [menuItemNames, setMenuItemNames] = useState([]);

  // Fetch kitchen items and priced item names initially and on interval
  useEffect(() => {
    const fetchItems = () => {
      fetch('https://project-3-03-team-2xy5.onrender.com/api/kitchen')
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

    // Fetch priced item names (mapping from item IDs to names)
    const fetchPricedItems = () => {
      fetch('https://project-3-03-team-2xy5.onrender.com/api/priceditems')
        .then(response => response.ok ? response.json() : Promise.reject(response.statusText))
        .then(namesArray => {
          setPricedItemNames(namesArray); // Directly store the array of items
        })
        .catch(err => setError(err));
    };
    // Fetch menu item names (mapping from item IDs to names)
    const fetchMenuItems = () => {
      fetch('https://project-3-03-team-2xy5.onrender.com/api/menuitems')
        .then(response => response.ok ? response.json() : Promise.reject(response.statusText))
        .then(menuArray => {
          setMenuItemNames(menuArray); // Directly store the array of items
        })
        .catch(err => setError(err));
    };

    fetchItems();
    fetchPricedItems();
    fetchMenuItems();
    const intervalId = setInterval(fetchItems, 5000); // Poll every 5 seconds
    return () => clearInterval(intervalId);
  }, [data]);

    /**
   * Deletes an order from the kitchen.
   *
   * Sends a DELETE request to the API and removes the order from the local state.
   *
   * @param {number} id - ID of the order to delete.
   */
  const deleteItem = (id) => {
    fetch(`https://project-3-03-team-2xy5.onrender.com/api/kitchen/${id}`, { method: 'DELETE' })
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
          delete newTimers[id];
          return newTimers;
        });
      })
      .catch(err => setError(err.message));
  };

    /**
   * Calculates the background color based on elapsed time for an order.
   *
   * @param {number} startTime - Start time of the order timer.
   * @returns {string} - The background color (`red`, `yellow`, or `green`) based on the elapsed time.
   */
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

          // Finds what was ordered (bowl, plate, etc.) in priceditems table based on each item
          const itemName = pricedItemNames.find(nameItem => nameItem.itemid === item.priceditem)?.item_name || 'N/A';

          // Finds food items ordered in menuitems table based on each item
          const side1Name = menuItemNames.find(nameItem => nameItem.menuid === item.side)?.item_name || 'N/A';
          const side2Name = menuItemNames.find(nameItem => nameItem.menuid === item.side2)?.item_name || '';
          const entree1Name = menuItemNames.find(nameItem => nameItem.menuid === item.entree1)?.item_name || 'N/A';
          const entree2Name = menuItemNames.find(nameItem => nameItem.menuid === item.entree2)?.item_name || '';
          const entree3Name = menuItemNames.find(nameItem => nameItem.menuid === item.entree3)?.item_name || '';

          return (
            <div key={item.id} className="box">
              <p className="timer" style={{ backgroundColor }}>
                Time: {minutes}m {seconds}s
              </p>
              <span>Order ID: {item.id}<br></br>----------------------------------------</span>
              <span>{itemName}<br></br>----------------------------------------</span>
              <span>{side1Name}<br></br>{side2Name}<br></br>----------------------------------------</span>
              <span>{entree1Name}<br></br>{entree2Name}<br></br>{entree3Name}<br></br>----------------------------------------</span>
              <button onClick={() => deleteItem(item.id)}>Done</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default KitchenItems;
