import React from 'react';
import { useCart } from '../cartContext';
import { useNavigate } from 'react-router-dom';
import './checkout.css';

const Checkout = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleConfirmOrder = () => {
    fetch('http://localhost:3000/api/OrderHistoryData', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orders: cart }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to confirm order');
        }
        return response.json();
      })
      .then(() => {
        alert('Order confirmed!');
        clearCart(); // Clear the cart after confirming the order
        navigate('/kiosk'); // Redirect to kiosk
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to confirm order');
      });
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((order, index) => (
            <li key={index} className="checkout-item">
              <p>
                <strong>Type:</strong> {order.type}
              </p>
              <p>
                <strong>Sides:</strong> {order.sides.join(', ')}
              </p>
              <p>
                <strong>Entrees:</strong> {order.entrees.join(', ')}
              </p>
              <button onClick={() => removeFromCart(index)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <div>
          <button onClick={handleConfirmOrder}>Confirm Order</button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
