// Kiosk.js
import React from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '../components/kioskMenuItem';
import '../components/kioskMenuItem';
import bowlImage from '../imgs/bowl.avif';
import plateImage from '../imgs/plate.avif';
import biggerPlateImage from '../imgs/biggerplate.avif';
import appetizerImage from '../imgs/appetizers.avif';
import drinksImage from '../imgs/drinks.avif';
import aLaCarteImage from '../imgs/alacarte.avif';

export const Kiosk = () => {
    const menuItems = [
        { name: 'Bowl', image: bowlImage },
        { name: 'Plate', image: plateImage },
        { name: 'Bigger Plate', image: biggerPlateImage },
        { name: 'Appetizers and More', image: appetizerImage },
        { name: 'Drinks', image: drinksImage },
        { name: 'A La Carte', image: aLaCarteImage }
    ];

    return (
        <div className="kiosk-page">
            {menuItems.map((item, index) => (
                <Link to={`/item/${item.name}`} key={index}>
                    <MenuItem image={item.image} name={item.name} />
                </Link>
            ))}
        </div>
    );
};
