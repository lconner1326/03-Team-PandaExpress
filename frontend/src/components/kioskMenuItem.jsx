
import React from 'react';
import './kioskMenuItem.css';

function kioskMenuItem({ image, name }) {
  return (
    <div className="kiosk-menu-item">
      <img src={image} alt={name} />
      <h3>{name}</h3>
    </div>
  );
}

export default kioskMenuItem;
