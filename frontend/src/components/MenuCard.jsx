// MenuCard.js
import React from 'react';
import './MenuCard.css';
/**
 * MenuCard Component
 *
 * A functional React component that represents a menu card with an image and a name.
 * The card can be clicked to toggle its selected state or trigger an action.
 *
 * @component
 * @param {Object} props - Props passed to the component.
 * @param {string} props.image - URL of the image to display on the card.
 * @param {string} props.name - Name of the menu item displayed on the card.
 * @param {boolean} props.isSelected - Indicates if the card is currently selected.
 * @param {function} props.onClick - Callback function triggered when the card is clicked.
 * @returns {JSX.Element} A styled menu card component.
 *
 * @example
 * return (
 *   <MenuCard
 *     image="https://example.com/image.jpg"
 *     name="Orange Chicken"
 *     isSelected={true}
 *     onClick={() => console.log('Card clicked')}
 *   />
 * )
 */
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
