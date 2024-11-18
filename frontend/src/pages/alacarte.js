import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ALaCartePage from "../components/aLaCartePage"
export const ALaCarte = () => {
    const [isInitialized, setIsInitialized] = useState(true);
    const navigate = useNavigate();

    return (
        <>
        <div className="aLaCartePage">
            <ALaCartePage isInitialized={isInitialized} setIsInitialized={setIsInitialized} navigate={navigate} />
        </div>
        </>
    )
}