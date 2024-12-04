// src/KioskPage.jsx
import React from 'react';
import CashierMenuItem from './cashierMenuItem';
import './KioskPage.css';

function CashierPage() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://project-3-03-team-2xy5.onrender.com/api/Cashier')
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => setData(data))
          .catch(err => setError(err.message));
      }, []);
  const menuItems = [
    { name: 'Bowl', image: '/images/bowl.jpg' },
    { name: 'Plate', image: '/images/plate.jpg' },
    { name: 'Bigger Plate', image: '/images/bigger-plate.jpg' },
    { name: 'Family Meal', image: '/images/family-meal.jpg' },
    { name: 'Appetizers and More', image: '/images/appetizers.jpg' },
    { name: 'Drinks', image: '/images/drinks.jpg' },
    { name: 'A La Carte', image: '/images/a-la-carte.jpg' },
    { name: 'Panda Cub Meal', image: '/images/panda-cub-meal.jpg' },
  ];

  return (
    <div className="kiosk-container">
      {menuItems.map((item, index) => (
        <CashierMenuItem key={index} name={item.name} image={item.image} />
      ))}
    </div>
  );
}

export default CashierPage;
