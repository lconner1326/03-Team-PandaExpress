import React from 'react';
import { Link } from 'react-router-dom';
import CashierMenuItem from '../components/cashierMenuItem'; // Reusing the CashierMenuItem component
import bowlImage from '../imgs/bowl.avif';
import plateImage from '../imgs/plate.avif';
import biggerPlateImage from '../imgs/biggerplate.avif';
import appetizerImage from '../imgs/appetizers.avif';
import drinksImage from '../imgs/drinks.avif';
import aLaCarteImage from '../imgs/alacarte.avif';
import TimeWidget from '../components/timeWidget';
import cartIcon from '../imgs/checkoutCart.png';
/**
 * Cashier Component
 *
 * Displays menu categories as clickable items and includes a weather widget and checkout link.
 *
 * @component
 * @example
 * return (
 *   <Cashier />
 * )
 */
export const Cashier = () => {
  const menuItems = [
    { name: 'Bowl', image: bowlImage, link: '/cashier/item/Bowl' },
    { name: 'Plate', image: plateImage, link: '/cashier/item/Plate' },
    { name: 'Bigger Plate', image: biggerPlateImage, link: '/cashier/item/Bigger Plate' },
    { name: 'Appetizers and More', image: appetizerImage, link: '/cashier/item/Appetizers and More' },
    { name: 'Drinks', image: drinksImage, link: '/cashier/item/Drinks' },
    { name: 'A La Carte', image: aLaCarteImage, link: '/cashier/item/A La Carte' },
  ];


  return (
    <div className="kiosk-page-wrapper">
      <TimeWidget />
      <Link to="/cashierCheckout" className="checkout-icon">
                  <img src={cartIcon} alt="Checkout" />
                </Link>
    <div className="kiosk-page">
      {menuItems.map((item, index) => (
        <Link to={item.link} key={index}>
          <CashierMenuItem image={item.image} name={item.name} />
        </Link>
      ))}
    </div>
   
    </div>
  );
};


export default Cashier;
