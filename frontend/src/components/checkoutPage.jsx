import React, { useState, useEffect } from 'react';

function CheckoutPage({ isInitialized, setIsInitialized, navigate }) {
  const [orderDetails, setOrderDetails] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch('/order-details');
        const data = await response.json();
        if (data.orderDetails) {
          setOrderDetails(data.orderDetails);
          setTotalCost(data.totalCost);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, []);

  const handleCheckout = async () => {
    navigate('/cashier');
  };

  const handleBack = () => {
    navigate('/cashier');
  };

  return (
    <div>
      <h1>Checkout</h1>
      <div>
        <h2>Order Details</h2>
        {orderDetails.length === 0 ? (
          <p>No order found.</p>
        ) : (
          <div>
            {orderDetails.map((item, index) => (
              <div key={index}>
                <p>Priced Item: {item.pricedItem}</p>
                <p>Side: {item.side}</p>
                <p>Entree1: {item.entree1}</p>
                <p>Entree2: {item.entree2}</p>
                <p>Entree3: {item.entree3}</p>
                <p>Cost: {item.cost}</p>
                <p>Premium: {item.premium}</p>
                <hr />
              </div>
            ))}
            <p>Total Cost: {totalCost}</p>
          </div>
        )}
      </div>
      <button onClick={handleCheckout}>Checkout</button>
      <button onClick={handleBack}>Back</button>
    </div>
  );
};

export default CheckoutPage;