import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../cartContext'; // Import useCart from CartContext
import KioskMenuItem from '../components/kioskMenuItem'; // Reusing the KioskMenuItem component
import './MenuSelection.css';

// Import images
import chowMeinImg from '../imgs/chowMein.png';
import friedRiceImg from '../imgs/friedRice.png';
import superGreensImg from '../imgs/superGreens.png';
import whiteRiceImg from '../imgs/whiteRice.png';

import orangeChickenImg from '../imgs/orangeChicken.png';
import bourbonChickenImg from '../imgs/bourbonChicken.png';
import honeyShrimpImg from '../imgs/honeyWalnutShrimp.png';
import teriyakiChickenImg from '../imgs/teriyakiChicken.png';
import kungPaoChickenImg from '../imgs/kungPaoChicken.png';

import beijingBeefImg from '../imgs/beijingBeef.png';
import blackPepperChickenImg from '../imgs/blackPepperChicken.png';
import blackPepperSirloinSteakImg from '../imgs/blackPepperSteak.png';
import broccoliBeefImg from '../imgs/broccoliBeef.png';
import honeySesameChickenImg from '../imgs/honeySesameChickenBreast.png';
import mushroomChickenImg from '../imgs/mushroomChicken.png';
import stringBeanChickenBreastImg from '../imgs/stringBeanChicken.png';
import sweetFireChickenBreastImg from '../imgs/sweetFireChicken.png';

import eggRollsImg from '../imgs/chickenEggRoll.avif';
import springRollsImg from '../imgs/springRoll.avif';
import crabRangoonsImg from '../imgs/crabRangoon.avif';

import fountainDrinkImg from '../imgs/fountainDrink.png';
import gatoradeImg from '../imgs/gatorade.avif';
import bottledWaterImg from '../imgs/bottledWater.avif';

// Define all items
const items = {
  MainEntrees: {
    'Orange Chicken': orangeChickenImg,
    'Bourbon Chicken': bourbonChickenImg,
    'Honey Walnut Shrimp': honeyShrimpImg,
    'Teriyaki Chicken': teriyakiChickenImg,
    'Kung Pao Chicken': kungPaoChickenImg,
    'Beijing Beef': beijingBeefImg,
    'Black Pepper Chicken': blackPepperChickenImg,
    'Black Pepper Sirloin Steak': blackPepperSirloinSteakImg,
    'Broccoli Beef': broccoliBeefImg,
    'Honey Sesame Chicken Breast': honeySesameChickenImg,
    'Mushroom Chicken': mushroomChickenImg,
    'String Bean Chicken Breast': stringBeanChickenBreastImg,
    'Sweet Fire Chicken Breast': sweetFireChickenBreastImg,
  },
  Sides: {
    'White Rice': whiteRiceImg,
    'Fried Rice': friedRiceImg,
    'Super Greens': superGreensImg,
    'Chow Mein': chowMeinImg,
  },
  'Appetizers and More': {
    'Egg Rolls': eggRollsImg,
    'Spring Rolls': springRollsImg,
    'Crab Rangoons': crabRangoonsImg,
  },
  Drinks: {
    'Small Fountain Drink': fountainDrinkImg,
    'Medium Fountain Drink': fountainDrinkImg,
    'Large Fountain Drink': fountainDrinkImg,
    'Gatorade': gatoradeImg,
    'Bottled Water': bottledWaterImg,

  },
  'A La Carte': {
    'White Rice': whiteRiceImg,
    'Fried Rice': friedRiceImg,
    'Chow Mein': chowMeinImg,
    'Super Greens': superGreensImg,
    'Orange Chicken': orangeChickenImg,
    'Bourbon Chicken': bourbonChickenImg,
    'Honey Walnut Shrimp': honeyShrimpImg,
    'Teriyaki Chicken': teriyakiChickenImg,
    'Kung Pao Chicken': kungPaoChickenImg,
    'Beijing Beef': beijingBeefImg,
    'Black Pepper Chicken': blackPepperChickenImg,
    'Black Pepper Sirloin Steak': blackPepperSirloinSteakImg,
    'Broccoli Beef': broccoliBeefImg,
    'Honey Sesame Chicken Breast': honeySesameChickenImg,
    'Mushroom Chicken': mushroomChickenImg,
    'String Bean Chicken Breast': stringBeanChickenBreastImg,
    'Sweet Fire Chicken Breast': sweetFireChickenBreastImg,
  },
};

const premiumEntrees = ['Black Pepper Sirloin Steak', 'Honey Walnut Shrimp'];

const MenuSelection = () => {
  const { itemType } = useParams(); // Dynamically get item type from URL
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const limits = {
    Bowl: { sides: 1, entrees: 1 },
    Plate: { sides: 1, entrees: 2 },
    'Bigger Plate': { sides: 1, entrees: 3 },
  };

  const [selectedSides, setSelectedSides] = useState([]);
  const [selectedEntrees, setSelectedEntrees] = useState([]);
  const [selectedOtherItems, setSelectedOtherItems] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const maxSides = limits[itemType]?.sides || 0;
  const maxEntrees = limits[itemType]?.entrees || 0;

  const handleSizeSelect = (size) => {
    const isPremium = premiumEntrees.includes(currentItem);
    const selectedItemType = isPremium
      ? `Premium ${size} Entree`
      : `${size} Entree`;
  
    const newItem = {
      itemType: selectedItemType,
      name: currentItem,
    };
  
    // Add the A La Carte item with its size to selectedOtherItems
    setSelectedOtherItems([...selectedOtherItems, newItem]);
    setShowSizeModal(false); // Close modal
    setCurrentItem(null); // Reset current item
  };

  const handleOtherItemSelect = (other) => {
    if (selectedOtherItems.includes(other)){
      setSelectedOtherItems(selectedOtherItems.filter((o) => o !== other));
    } else if (itemType == 'A La Carte'){
      setCurrentItem(other);
      setShowSizeModal(true);
    }else{
      setSelectedOtherItems([...selectedOtherItems, other]);
    }
  };

  // Handle side selection
  const handleSideSelect = (side) => {
    if (selectedSides.includes(side)) {
      setSelectedSides(selectedSides.filter((s) => s !== side));
    } else if (selectedSides.length < maxSides) {
      setSelectedSides([...selectedSides, side]);
    }
  };

  // Handle entree selection
  const handleEntreeSelect = (entree) => {
    if (selectedEntrees.includes(entree)) {
      setSelectedEntrees(selectedEntrees.filter((e) => e !== entree));
    } else if (selectedEntrees.length < maxEntrees) {
      setSelectedEntrees([...selectedEntrees, entree]);
    }
  };

  const handleConfirmSelection = () => {
    if (itemType === 'Bowl' || itemType === 'Plate' || itemType === 'Bigger Plate') {
      const order = {
        itemType, // Include the type (Bowl, Plate, Bigger Plate)
        sides: selectedSides,
        entrees: selectedEntrees,
      };
      addToCart(order);
    } else if (itemType == 'A La Carte'){
      selectedOtherItems.forEach((item) => addToCart(item)); // Add all selected items to the cart
      setSelectedOtherItems([]); // Clear the temporary selection
      setShowDialog(true); // 
    } else {
      const order = selectedOtherItems.map((item) => ({
        itemType, // Add the menu type (e.g., Drinks, A La Carte, etc.)
        name: item, // Include the specific item selected
      }));
      order.forEach((o) => addToCart(o)); // Add each item separately to the cart
    }
    setShowDialog(true);
  };
  

  const handleOrderMore = () => {
    setShowDialog(false);
    navigate('/kiosk');
  };

  const handleCheckout = () => {
    setShowDialog(false);
    navigate('/checkout');
  };

  const categoryItems = items[itemType] || null;

  // Render logic for "Bowl," "Plate," and "Bigger Plate"
  if (!categoryItems && (itemType === 'Bowl' || itemType === 'Plate' || itemType === 'Bigger Plate')) {
    return (
      <div className="menu-selection">
        <h2>{itemType}</h2>

        <h3>Select Up to {maxSides} Sides</h3>
        <div className="kiosk-page">
          {Object.entries(items.Sides).map(([name, imgPath]) => (
            <div
              key={name}
              onClick={() => handleSideSelect(name)}
              className={selectedSides.includes(name) ? 'selected' : ''}
            >
              <KioskMenuItem image={imgPath} name={name} />
            </div>
          ))}
        </div>

        {selectedSides.length === maxSides && (
          <>
            <h3>Select Up to {maxEntrees} Entrees</h3>
            <div className="kiosk-page">
              {Object.entries(items.MainEntrees).map(([name, imgPath]) => (
                <div
                  key={name}
                  onClick={() => handleEntreeSelect(name)}
                  className={selectedEntrees.includes(name) ? 'selected' : ''}
                >
                  <KioskMenuItem image={imgPath} name={name} />
                </div>
              ))}
            </div>
          </>
        )}

        <button
          className="confirm-button"
          disabled={selectedSides.length !== maxSides || selectedEntrees.length !== maxEntrees}
          onClick={handleConfirmSelection}
        >
          Confirm Selection
        </button>

        {showDialog && (
          <div className="modal-overlay">
            <div className="modal">
              <p>Your order has been added. What would you like to do?</p>
              <div className="modal-buttons">
                <button onClick={handleOrderMore}>Order More</button>
                <button onClick={handleCheckout}>Checkout</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Render logic for other item types ("Drinks," "Appetizers and More," etc.)
  return (
    <div className="menu-selection">
    <h2>{itemType}</h2>
    <div className="kiosk-page">
      {Object.entries(categoryItems).map(([name, imgPath]) => (
        <div
          key={name}
          onClick={() => {
            if (itemType === 'A La Carte') {
              setCurrentItem(name); // Set the current item for size selection
              setShowSizeModal(true); // Show size selection modal
            } else {
              handleOtherItemSelect(name); // Handle regular item selection
            }
          }}
          className={selectedOtherItems.includes(name) ? 'selected' : ''}
        >
          <KioskMenuItem image={imgPath} name={name} />
        </div>
      ))}
    </div>
    <button
      className="confirm-button"
      disabled={selectedOtherItems.length === 0}
      onClick={handleConfirmSelection}
    >
      Confirm Selection
    </button>

    {showSizeModal && currentItem && (
  <div className="modal-overlay">
    <div className="modal">
      <h3>Select a Size for {currentItem}</h3>
      <div className="modal-buttons">
        <button className="size-button" onClick={() => handleSizeSelect('Small')}>
          Small
        </button>
        <button className="size-button" onClick={() => handleSizeSelect('Medium')}>
          Medium
        </button>
        <button className="size-button" onClick={() => handleSizeSelect('Large')}>
          Large
        </button>
      </div>
      <button
        className="cancel-button"
        onClick={() => {
          setShowSizeModal(false);
          setCurrentItem(null); // Reset current item
        }}
      >
        Cancel
      </button>
    </div>
  </div>
)}

      {showDialog && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Your order has been added. What would you like to do?</p>
            <div className="modal-buttons">
              <button onClick={handleOrderMore}>Order More</button>
              <button onClick={handleCheckout}>Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuSelection;