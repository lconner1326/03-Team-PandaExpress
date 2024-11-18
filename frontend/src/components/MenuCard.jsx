// MenuCard.js
import React from 'react';
import './MenuCard.css';

const MenuCard = ({ image, name, isSelected, onClick }) => {
  return (
    <div
      className={`menu-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <img src={image} alt={name} />
      <h3>{name}</h3>
    </div>
  );
};

export default MenuCard;
