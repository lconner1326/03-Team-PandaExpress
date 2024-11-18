import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppetizersDessertsPage from "../components/appetizersDessertsPage"
export const AppetizersDesserts = () => {
    const [isInitialized, setIsInitialized] = useState(true);
    const navigate = useNavigate();

    return (
        <>
        <div className="appetizersDessertsPage">
            <AppetizersDessertsPage isInitialized={isInitialized} setIsInitialized={setIsInitialized} navigate={navigate} />
        </div>
        </>
    )
}