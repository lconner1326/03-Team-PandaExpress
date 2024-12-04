import React, { useEffect, useState } from 'react'; // Added useEffect and useState
import { useCart } from '../cartContext';
import { useNavigate } from 'react-router-dom';
import './checkout.css';

const Checkout = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [prices, setPrices] = useState({});

  useEffect(() => {
    // Fetch prices from the backend
    fetch('https://project-3-03-team-2xy5.onrender.com/api/priceditems')
      .then((response) => response.json())
      .then((data) => {
        console.log('Priced Items Response:', data); // Debug log
        const priceMap = {};
        data.forEach((item) => {
          console.log("item name: ", item.item_name);
          priceMap[item.item_name.trim()] = item.price; // Trim to avoid whitespace issues
        });
        setPrices(priceMap);
      })
      .catch((error) => console.error('Error fetching prices:', error));
  }, []);

  const handleConfirmOrder = () => {
    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    console.log('Sending orders to /api/placeOrder:', cart);
    fetch('https://project-3-03-team-2xy5.onrender.com/api/placeOrder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orders: cart }),
    })
      .then((response) => {
        console.log('Response received:', response);
        if (!response.ok) {
          throw new Error('Failed to confirm order');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Order confirmed:', data);
        alert('Order confirmed!');
        clearCart();
        navigate('/kiosk');
      })
      .catch((error) => {
        console.error('Error during fetch:', error);
        alert('Failed to confirm order');
      });
  };

  return (
    <div className="checkout-page">
      {console.log('Cart:', cart, 'Prices:', prices)} {/* Debug log */}
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((order, index) => {
            const price =
              prices[order.itemType?.trim()] || prices[order.name?.trim()] || 'N/A';
            console.log('Order:', order, 'Price:', price); // Debug log

            return (
              <li key={index} className="checkout-item">
                <p>
                  <strong>Type:</strong> {order.itemType || 'Unknown'}
                </p>
                {order.name && (
                  <p>
                    <strong>Item:</strong> {order.name}
                  </p>
                )}
                {order.sides && order.sides.length > 0 && (
                  <p>
                    <strong>Sides:</strong> {order.sides.join(', ')}
                  </p>
                )}
                {order.entrees && order.entrees.length > 0 && (
                  <p>
                    <strong>Entrees:</strong> {order.entrees.join(', ')}
                  </p>
                )}
                <p>
                  <strong>Price:</strong> $
                  {prices[order.itemType?.trim()] || prices[order.name?.trim()] || 'N/A'}
                </p>
                <button onClick={() => removeFromCart(index)}>Remove</button>
              </li>
            );
          })}
        </ul>
      )}
      {cart.length > 0 && (
        <div className="checkout-actions">
          <button onClick={handleConfirmOrder}>Confirm Order</button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
