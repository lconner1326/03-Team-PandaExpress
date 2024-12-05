/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../components/menuDisplaystyle.css";
*/



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


/**
 * @module Menu
 * @description A dynamic menu display for customers to view meal options, sides, entrees, appetizers, a la carte items, and drinks.
 * The menu is categorized into sections and allows navigation between different sections.
 * 
 * @returns {JSX.Element} The menu display with interactive navigation and categorized sections.
 */
export const Menu = () => {
    
    const [displayedSection, setDisplayedSection] = useState('meals');
    const meals = [
        { name: 'Bowl', description: '1 serving of our Entrees and 1 side', price: '$8.3', image: bowlImg},
        { name: 'Plate', description: '2 servings of our Entrees and 1 side', price: '$9.8', image: plateImg},
        { name: 'Bigger Plate', description: '3 servings of our Entrees and 1 side', price: '$11.3', image: biggerPlateImg},
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
        { name: 'Teriyaki Chicken', image: teriyakiChickenImg },
        { name: 'Beijing Beef', image: beijingBeefImg},
        { name: 'Black Pepper Chicken', image: blackPepperChickenImg},
        { name: 'Black Pepper Sirloin Steak', image: blackPepperSirloinSteakImg},
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
        { category: 'Premium Entrees', options: [{ size: 'Small', price: '$6.7' }, { size: 'Medium', price: '$11.5' }, { size: 'Large', price: '$15.7' }] },
        { category: 'Entrees', options: [{ size: 'Small', price: '$5.2' }, { size: 'Medium', price: '$8.5' }, { size: 'Large', price: '$11.2' }] },
    ];

    const drinks = [
        { category: 'Fountain', options: 
           [{ size: 'Small', price: '$2.1' }, 
            { size: 'Medium', price: '$2.3' }, 
            { size: 'Large', price: '$2.5' }] },
        { category: 'Bottled', options:
           [{ name: 'Water', price: '$4.3' }, 
            { name: 'Gatorade', price: '$2.7' }] },
    ];

    return (
        <>
        <div>
            <h1>
            Menu Display
            </h1>
        
    <div>

    




    {/* Navigation Links */}
    
    <div className="navigation-links">
        <button onClick={() => handleSectionChange('meals & sides')}>Meals & Sides</button>
        <button onClick={() => handleSectionChange('entrees')}>Entrees</button>
        <button onClick={() => handleSectionChange('appetizers & drinks')}>Appetizers, A La Carte, & Drinks</button>
   
    



    <div className="menu-container">  
    {/* Meal Options Section */}

    

    {displayedSection === 'meals & sides' && (
    <div className="section">
        <h3>Pick A Meal Size</h3>
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
        </div>
        </div>
</>
    )
}





/*THis is the new section of tesing code */



/*
export const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [displayedSection, setDisplayedSection] = useState('meals');

    // Fetch menu items from the backend
    useEffect(() => {
        
        axios.get('http://localhost:3000/api/menuitems') // Replace with the correct backend endpoint
            .then((response) => {
                setMenuItems(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching menu items:', error);
                setLoading(false);
            });
    }, []);

    // Handle section changes for navigation links
    const handleSectionChange = (section) => {
        setDisplayedSection(section);
    };

    return (
        <div>
            <h1>Menu Display</h1>

    *///       {/* Navigation Links */ }

/*           
            <div className="navigation-links">
                <button onClick={() => handleSectionChange('meals')}>Meals & Sides</button>
                <button onClick={() => handleSectionChange('entrees')}>Entrees</button>
                <button onClick={() => handleSectionChange('drinks')}>Appetizers, A La Carte, & Drinks</button>
            </div>

*/
//          {/* Menu Sections */}

            
/*            {loading ? (
                <p>Loading menu...</p>
            ) : (
                <div className="menu-container">
       
*/       
//                {/* Meals Section */ }

                    
/*                    {displayedSection === 'meals' && (
                        <>
                            <div className="section">
                                <h3>Pick A Meal Size</h3>
                                <div className="grid-container">
                                    {menuItems
                                        .filter(item => item.category === 'meal')
                                        .map((meal, index) => (
                                            <div className="meal-option" key={index}>
                                                <img src={meal.image} alt={meal.name} />
                                                <h4>{meal.name}</h4>
                                                <p>{meal.description}</p>
                                                <span>{meal.price}</span>
                                            </div>
                                        ))}
                                </div>
                            </div>

                            <div className="section">
                                <h3>Sides</h3>
                                <div className="grid-container grid-2">
                                    {menuItems
                                        .filter(item => item.category === 'side')
                                        .map((side, index) => (
                                            <div className="grid-item" key={index}>
                                                <img src={side.image} alt={side.name} />
                                                <p>{side.name}</p>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </>
                    )}

*/

//                   {/* Sides Section */}

                    
/*                    {displayedSection === 'sides' && (
                        <div className="section">
                            <h3>Sides</h3>
                            <div className="grid-container grid-2">
                                {menuItems.filter(item => item.category === 'side').map((side, index) => (
                                    <div className="grid-item" key={index}>
                                        <img src={side.image} alt={side.name} />
                                        <p>{side.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}


*/                    
//                    {/* Entrees Section */}


/*
                    {displayedSection === 'entrees' && (
                        <div className="section">
                            <h3>Entrees</h3>
                            <div className="grid-container grid-3">
                                {menuItems
                                    .filter(item => item.category === 'entree')
                                    .map((entree, index) => (
                                        <div className="grid-item" key={index}>
                                            <img src={entree.image} alt={entree.name} />
                                            <p>{entree.name}</p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
*/

//                   {/* Appetizers, A La Carte, & Drinks Section */}
/*                   {displayedSection === 'drinks' && (
                        <>
                            <div className="section">
                                <h3>Appetizers/Desserts</h3>
                                <div className="grid-container grid-2">
                                    {menuItems
                                        .filter(item => item.category === 'appetizer')
                                        .map((appetizer, index) => (
                                            <div className="grid-item" key={index}>
                                                <img src={appetizer.image} alt={appetizer.name} />
                                                <p>{appetizer.name}</p>
                                            </div>
                                        ))}
                                </div>
                            </div>

                            <div className="section">
                                <h3>A La Carte</h3>
                                <div className="grid-container">
                                    {menuItems
                                        .filter(item => item.category === 'alaCarte')
                                        .map((alaCarte, index) => (
                                            <div className="meal-option" key={index}>
                                                <h4>{alaCarte.name}</h4>
                                                <p>{alaCarte.description}</p>
                                                <span>{alaCarte.price}</span>
                                            </div>
                                        ))}
                                </div>
                            </div>

                            <div className="section">
                                <h3>Drinks</h3>
                                <div className="grid-container grid-2">
                                    {menuItems
                                        .filter(item => item.category === 'drink')
                                        .map((drink, index) => (
                                            <div className="grid-item" key={index}>
                                                <img src={drink.image} alt={drink.name} />
                                                <p>{drink.name}</p>
                                                <span>{drink.price}</span>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};
*/