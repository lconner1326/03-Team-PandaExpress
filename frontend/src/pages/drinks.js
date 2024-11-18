import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DrinksPage from "../components/drinksPage"
export const Drinks = () => {
    const [isInitialized, setIsInitialized] = useState(true);
    const navigate = useNavigate();

    return (
        <>
        <div className="drinksPage">
            <DrinksPage isInitialized={isInitialized} setIsInitialized={setIsInitialized} navigate={navigate} />
        </div>
        </>
    )
}