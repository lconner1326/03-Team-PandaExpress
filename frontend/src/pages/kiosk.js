import React from 'react';
import { Link } from 'react-router-dom';
import KioskMenuItem from '../components/kioskMenuItem'; // Reusing the KioskMenuItem component
import bowlImage from '../imgs/bowl.avif';
import plateImage from '../imgs/plate.avif';
import biggerPlateImage from '../imgs/biggerplate.avif';
import appetizerImage from '../imgs/appetizers.avif';
import drinksImage from '../imgs/drinks.avif';
import aLaCarteImage from '../imgs/alacarte.avif';
import WeatherWidget from '../components/weatherWidget';
import cartIcon from '../imgs/checkoutCart.png';
/**
 * @module Kiosk
 * @description Displays the main menu for the ordering kiosk, including categories like Bowls, Plates, and Drinks. 
 * Provides access to checkout and integrates a weather widget.
 * 
 * @returns {JSX.Element} The kiosk page layout with menu options.
 */
export const Kiosk = () => {
  const menuItems = [
    { name: 'Bowl', image: bowlImage, link: '/item/Bowl' },
    { name: 'Plate', image: plateImage, link: '/item/Plate' },
    { name: 'Bigger Plate', image: biggerPlateImage, link: '/item/Bigger Plate' },
    { name: 'Appetizers and More', image: appetizerImage, link: '/item/Appetizers and More' },
    { name: 'Drinks', image: drinksImage, link: '/item/Drinks' },
    { name: 'A La Carte', image: aLaCarteImage, link: '/item/A La Carte' },
  ];

  return (
    <div className="kiosk-page-wrapper">
      <WeatherWidget />
      <Link to="/checkout" className="checkout-icon">
                  <img src={cartIcon} alt="Checkout" />
                </Link>
    <div className="kiosk-page">
      {menuItems.map((item, index) => (
        <Link to={item.link} key={index}>
          <KioskMenuItem image={item.image} name={item.name} />
        </Link>
      ))}
    </div>
    
    </div>
  );
};

export default Kiosk;
