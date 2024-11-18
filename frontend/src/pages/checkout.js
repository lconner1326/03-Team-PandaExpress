import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutPage from "../components/checkoutPage"
export const Checkout = () => {
    const [isInitialized, setIsInitialized] = useState(false);
    const navigate = useNavigate();

    return (
        <>
        <div className="checkoutPage">
            <CheckoutPage isInitialized={isInitialized} setIsInitialized={setIsInitialized} navigate={navigate} />
        </div>
        </>
    )
}