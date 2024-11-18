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
    'Fountain Drink': fountainDrinkImg,
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
  const [selectedItems, setSelectedItems] = useState([]); // For "Drinks," "Appetizers and More," and "A La Carte"
  const [showDialog, setShowDialog] = useState(false);

  const maxSides = limits[itemType]?.sides || 0;
  const maxEntrees = limits[itemType]?.entrees || 0;

  // Handle item selection for single-category types
  const handleItemSelect = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
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
    } else {
      const order = selectedItems.map((item) => ({
        itemType, // Include the itemType for single-category items
        name: item,
      }));
      addToCart(order);
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
            onClick={() => handleItemSelect(name)}
            className={selectedItems.includes(name) ? 'selected' : ''}
          >
            <KioskMenuItem image={imgPath} name={name} />
          </div>
        ))}
      </div>
      <button
        className="confirm-button"
        disabled={selectedItems.length === 0}
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
};

export default MenuSelection;