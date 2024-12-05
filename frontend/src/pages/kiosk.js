import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import KioskMenuItem from '../components/kioskMenuItem'; // Reusing the KioskMenuItem component
import bowlImage from '../imgs/bowl.avif';
import plateImage from '../imgs/plate.avif';
import biggerPlateImage from '../imgs/biggerplate.avif';
import appetizerImage from '../imgs/appetizers.avif';
import drinksImage from '../imgs/drinks.avif';
import aLaCarteImage from '../imgs/alacarte.avif';
import WeatherWidget from '../components/weatherWidget';
import TranslationWidget from "../components/translationWidget";
import cartIcon from '../imgs/checkoutCart.png';
import './kiosk.css';
/**
 * @module Kiosk
 * @description Displays the main menu for the ordering kiosk, including categories like Bowls, Plates, and Drinks. 
 * Provides access to checkout and integrates a weather widget.
 * 
 * @returns {JSX.Element} The kiosk page layout with menu options.
 */
export const Kiosk = () => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [fontSize, setFontSize] = useState(16);

  const menuItems = [
    { name: 'Bowl', image: bowlImage, link: '/item/Bowl' },
    { name: 'Plate', image: plateImage, link: '/item/Plate' },
    { name: 'Bigger Plate', image: biggerPlateImage, link: '/item/Bigger Plate' },
    { name: 'Appetizers and More', image: appetizerImage, link: '/item/Appetizers and More' },
    { name: 'Drinks', image: drinksImage, link: '/item/Drinks' },
    { name: 'A La Carte', image: aLaCarteImage, link: '/item/A La Carte' },
  ];

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  const resetZoom = () => setZoomLevel(1);

  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 2, 24));
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 2, 12));
  const resetFontSize = () => setFontSize(16);

  return (
    <div className="kiosk-page-wrapper" style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center', fontSize: `${fontSize}px` }}>
      <WeatherWidget />
      <TranslationWidget className='translation-widget' />
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
            <div className="font-controls">
              <button onClick={handleZoomIn}>Zoom In</button>
              <button onClick={handleZoomOut}>Zoom Out</button>
              <button onClick={resetZoom}>Reset Zoom</button>
              <button onClick={increaseFontSize}>Increase Font Size</button>
              <button onClick={decreaseFontSize}>Decrease Font Size</button>
              <button onClick={resetFontSize}>Reset Font Size</button>
            </div>
    </div>
  );
};

export default Kiosk;
