
import React from 'react';
import './kioskMenuItem.css';
/**
 * kioskMenuItem Component
 *
 * A stateless functional component that displays a menu item with an image and a name.
 * Used in the kiosk interface to represent an individual menu item.
 *
 * @component
 * @param {Object} props - Props passed to the component.
 * @param {string} props.image - URL of the image to display for the menu item.
 * @param {string} props.name - Name of the menu item to display.
 * @returns {JSX.Element} A styled menu item component.
 *
 * @example
 * return (
 *   <kioskMenuItem image="https://example.com/image.jpg" name="Orange Chicken" />
 * )
 */
function kioskMenuItem({ image, name }) {
  return (
    <div className="kiosk-menu-item">
      <img src={image} alt={name} />
      <h3>{name}</h3>
    </div>
  );
}

export default kioskMenuItem;
