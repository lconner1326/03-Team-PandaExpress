import React from 'react';
import './kioskMenuItem.css';

function CashierMenuItem({ image, name }) {
  return (
    <div className="kiosk-menu-item">
      <img src={image} alt={name} />
      <h3>{name}</h3>
    </div>
  );
}

export default CashierMenuItem;
