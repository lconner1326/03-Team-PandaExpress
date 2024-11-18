import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EntreesSidesPage from "../components/entreesSidesPage"
export const EntreesSides = () => {
    const [isInitialized, setIsInitialized] = useState(true);
    const navigate = useNavigate();

    return (
        <>
        <div className="entreesSidesPage">
            <EntreesSidesPage isInitialized={isInitialized} setIsInitialized={setIsInitialized} navigate={navigate} />
        </div>
        </>
    )
}