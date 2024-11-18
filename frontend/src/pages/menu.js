import menuDisplay from "../components/menuDisplay"
import "../components/menuDisplaystyle.css"
import React, { useState } from 'react';

import chowMeinImg from '../components/images/chowMein.png';
import friedRiceImg from '../components/images/friedRice.png';
import superGreensImg from '../components/images/superGreens.png';
import whiteSteamedRiceImg from '../components/images/whiteSteamedRice.png';

import orangeChickenImg from '../components/images/orangeChicken.png';
import bourbonChickenImg from '../components/images/bourbonChicken.png';
import angusSteakImg from '../components/images/angusSteak.png';
import honeyShrimpImg from '../components/images/honeyWallnutShrimp.png';
import teriyakiChickenImg from '../components/images/teriyakiChicken.png';
import beijingBeefImg from '../components/images/beijingBeef.png';
import blackPepperChickenImg from '../components/images/blackPepperChicken.png';
import blackPepperSirloinSteakImg from '../components/images/blackPepperSirloinSteak.png';
import broccoliBeefImg from '../components/images/broccoliBeef.png';
import honeySesameChickenImg from '../components/images/honeySesameChicken.png';
import honeyWallnutShrimpImg from '../components/images/honeyWallnutShrimp.png';
import mushroomChickenImg from '../components/images/mushroomChicken.png';
import stringBeanChickenBreastImg from '../components/images/stringBeanChickenBreast.png';
import sweetFireChickenBreastImg from '../components/images/sweetFireChickenBreast.png';

import veggieSpringRollImg from '../components/images/veggieSpringRoll.png';
import rangoonImg from '../components/images/Rangoon.png';
import applePieRollImg from '../components/images/applePieRoll.png';
import chickenEggRollImg from '../components/images/chickenEggRoll.png';

import bowlImg from '../components/images/bowl.png';
import plateImg from '../components/images/plate.png';
import biggerPlateImg from '../components/images/biggerPlate.png';



export const Menu = () => {
    const [displayedSection, setDisplayedSection] = useState('meals');
    const meals = [
        { name: 'Bowl', description: 'Serving of 1 of our Entrees and 1 side', price: '$', image: bowlImg},
        { name: 'Plate', description: 'Serving of 2 of our Entrees and 1 side', price: '$$', image: plateImg},
        { name: 'Bigger Plate', description: 'Serving of 3 of our Entrees and 1 side', price: '$$$', image: biggerPlateImg},
    ];

    const sides = [
        { name: 'Chow Mein', image: chowMeinImg },
        { name: 'Fried Rice', image: friedRiceImg },
        { name: 'White Rice', image: whiteSteamedRiceImg },
        { name: 'Super Greens', image: superGreensImg },
    ];

    const handleSectionChange = (section) => {
        setDisplayedSection(section);
    };

    const entrees = [
        { name: 'Bourbon Chicken', image: bourbonChickenImg },
        { name: 'Orange Chicken', image: orangeChickenImg },
        { name: 'Angus Steak', image: angusSteakImg },
        { name: 'Honey Shrimp', image: honeyShrimpImg },
        { name: 'Teriyaki Chicken', image: teriyakiChickenImg },
        { name: 'Beijing Beef', image: beijingBeefImg},
        { name: 'Black Pepper Chicken', image: blackPepperChickenImg},
        { name: 'Black Pepper Sirloin Steak', image: blackPepperSirloinSteakImg},
        { name: 'Beijing Beef', image: beijingBeefImg},
        { name: 'Broccoli Beef', image: broccoliBeefImg},
        { name: 'Honey Sesame Chicken', image: honeySesameChickenImg},
        { name: 'Honey Wallnut Shrimp', image: honeyWallnutShrimpImg},
        { name: 'Mushroom Chicken', image: mushroomChickenImg},
        { name: 'String Bean Chicken Breast', image: stringBeanChickenBreastImg},
        { name: 'Sweet Fire Chicken Breast', image: sweetFireChickenBreastImg}
        // Add more entrees as needed    
    ];

    const appetizers = [
        { name: 'Chicken Egg Roll', image: chickenEggRollImg},
        { name: 'Veggie Spring Roll', image: veggieSpringRollImg },
        { name: 'Cheese Rangoon', image: rangoonImg },
        { name: 'Apple Pie Roll', image: applePieRollImg }
    ];

    const alaCarte = [
        { category: 'Sides', options: [{ size: 'Small', price: '$' }, { size: 'Medium', price: '$$' }, { size: 'Large', price: '$$$' }] },
        { category: 'Entrees', options: [{ size: 'Small', price: '$' }, { size: 'Medium', price: '$$' }, { size: 'Large', price: '$$$' }] },
    ];

    const drinks = [
        { category: 'Fountain', options: 
           [{ size: 'Small', price: '$' }, 
            { size: 'Medium', price: '$$' }, 
            { size: 'Large', price: '$$$' }] },
        { category: 'Bottled', options:
           [{ name: 'Water', price: '$' }, 
            { name: 'Gatorade', price: '$$' }, 
            { name: 'Large', price: '$$$' }] },
    ];

    return (
        <>
        <div>
            <h1>
            Menu Display
            </h1>
        </div>
    <div>
    {/* Navigation Links */}
    <div className="navigation-links">
        <button onClick={() => handleSectionChange('meals & sides')}>Meals & Sides</button>
        <button onClick={() => handleSectionChange('entrees')}>Entrees</button>
        <button onClick={() => handleSectionChange('appetizers & drinks')}>Appetizers, A La Carte, & Drinks</button>
    </div>

    <div className="menu-container">  
    {/* Meal Options Section */}
    {displayedSection === 'meals & sides' && (
    <div className="section">
        <h3>Pick A Meal</h3>
        {meals.map((meal, index) => (
            <div className="meal-option" key={index}>
                <div className="meal-header">
                    <div className="meal-name">{meal.name}</div>
                </div>
                <img src={meal.image} alt={meal.name} className="meal-image" />
                <div className="meal-footer">
                    <div className="meal-description">{meal.description}</div>
                    <span className="meal-price">{meal.price}</span>
                </div>
            </div>
        ))}
    </div>
)}
            {/* Sides Section */}
            {displayedSection === 'meals & sides' && (
            <div className="section sides-section">
                <h3>Sides</h3>
                <div className="grid-container grid-2">
                
                    {sides.map((side, index) => (
                        <div className="grid-item" key={index}>
                            <img src={side.image} alt={side.name} />
                            <p>{side.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            )}

            {/* Entrees Section */}
            {displayedSection === 'entrees' && (
            <div className="section">
                <h3>Entrees</h3>
                <div className="grid-container grid-3">
                    {entrees.map((entree, index) => (
                        <div className="grid-item" key={index}>
                            <img src={entree.image} alt={entree.name} />
                            <p>{entree.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            )}
        </div>
    </div>


 {/*starting the section of the third page*/ }

 <div className="menu-container">

            {/* Appetizers/Desserts Section */}
            {displayedSection === 'appetizers & drinks' && (
            <div className="section appetizers">
                <h3>Appetizers/Desserts</h3>
                <div className="grid-container grid-2">
                    {appetizers.map((item, index) => (
                        <div className="grid-item" key={index}>
                            <img src={item.image} alt={item.name} />
                            <p>{item.name}</p>
                        </div>
                    ))}
                    
                </div>
            </div>
            )}

            {/* Right Section Container */}
            {displayedSection === 'appetizers & drinks' && (
            <div className="right-sections">
                {/* A La Carte Section */}
                <div className="section ala-carte">
                    <h3>A La Carte</h3>
                    <div className="option-row">
                        {alaCarte.map((item, index) => (
                            <div key={index} className="option">
                                <h4>{item.category}</h4>
                                {item.options.map((option, optIndex) => (
                                    <p key={optIndex}>{option.size || option.name} - {option.price}</p>
                                ))}
                            </div>
                        ))}
                        
                    </div>
                </div>
                
                

                {/* Drinks Section */}
                <div className="section drinks">
                    <h3>Drinks</h3>
                    <div className="option-row">
                        {drinks.map((item, index) => (
                            <div key={index} className="option">
                                <h4>{item.category}</h4>
                                {item.options.map((option, optIndex) => (
                                    <p key={optIndex}>{option.size || option.name} - {option.price}</p>
                                ))}
                            </div>
                        ))}
                    
                    </div>
                </div>
            </div>
            )}
        </div>
        
        
</>
    )
}