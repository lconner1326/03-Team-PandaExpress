import React, {useState, useEffect} from 'react';


function DrinksPage({ isInitialized, setIsInitialized, navigate }) {
    const [currentOrderId, setCurrentOrderId] = useState(null);
    const [itemid, setItemid] = useState(0);
    const [price, setPrice] = useState(null);

    const buttonStyle = {
        width: '400px',
        height: '200px',
        fontSize: '18px',
        fontFamily: 'Arial, sans-serif',
        margin: '10px',
    };

    const backButtonStyle = {
        position: 'absolute',
        top: '50px',
        left: '10px',
        width: '200px',
        height: '100px',
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
        margin: '10px',
    };

    const continueButtonStyle = {
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        width: '200px',
        height: '100px',
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
        margin: '10px',
    };

    // const getNextOrderId = async () => {
    //     try {
    //       const response = await fetch('http://localhost:3000/next-order-id');
    //       const data = await response.json();
    //       setCurrentOrderId(data.nextOrderId);
    //     } catch (error) {
    //       console.error('Error fetching next order ID:', error);
    //     }
    //   };

    //   const getCurrentOrderId = async () => {
    //     try {
    //       const response = await fetch('http://localhost:3000/current-order-id');
    //       const data = await response.json();
    //       setCurrentOrderId(data.currentOrderId);
    //     } catch (error) {
    //       console.error('Error fetching next order ID:', error);
    //     }
    //   };

    // useEffect(() => {
    //     const initializeOrderId = async () => {
    //         if (isInitialized) {
    //             const orderId = await getCurrentOrderId();
    //             setCurrentOrderId(orderId);
    //         } else {
    //             const nextOrderId = await getNextOrderId();
    //             setCurrentOrderId(nextOrderId);
    //             setIsInitialized(true);
    //         }
    //     };
    //     initializeOrderId();
    // }, [isInitialized, setIsInitialized]);

    // const updateIngredientQuantity = async (ingredientId, quantity) => {
    //     await fetch('/api/updateIngredient', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ ingredientId, quantity }),
    //     });
    // };

    // const fetchPrice = async (itemId) => {
    //     try {
    //       const response = await fetch(`http://localhost:3000/getPrice/${itemId}`);
    
    //       if (response.ok) {
    //         const data = await response.json();
    //         setPrice(data.price);
    //         setError(null);
    //       } else {
    //         setError('Item not found');
    //         setPrice(null);
    //       }
    //     } catch (err) {
    //       setError('Error fetching price');
    //       setPrice(null);
    //     }
    //   };

    const handleButtonClick = async (orderType) => {
        let priceditem, cost;
        switch (orderType) {
            case 'Back':
                navigate('/cashier');
                break;
            case 'Continue':
                navigate('/cashier');
                break;
            case 'Small Drink':
                break;
            case 'Medium Drink':
                break;
            case 'Large Drink':
                break;
            case 'Bottled Water':
                break;
            case 'Gatorade':
                break;
            default:
                break;
        }
        // setItemid(itemid + 1);
    };


    // Define functions for each button
    const handleBackClick = () => {
        handleButtonClick('Back');
    };

    const handleContinueClick = () => {
        handleButtonClick('Continue');
    };

    const handleSmallDrinkClick = () => {
        handleButtonClick('Small Drink');
    };

    const handleMediumDrinkClick = () => {
        handleButtonClick('Medium Drink');
    };

    const handleLargeDrinkClick = () => {
        handleButtonClick('Large Drink');
    };

    const handleBottledWaterClick = () => {
        handleButtonClick('Bottled Water');
    };

    const handleGatoradeClick = () => {
        handleButtonClick('Gatorade');
    };

    return (
        <div style={containerStyle}>
        <button style={backButtonStyle} onClick={handleBackClick}>
            Back
        </button>
        <h1 style={{ textAlign: 'center', fontSize: '36px', fontFamily: 'Arial, sans-serif' }}>
            Drinks
        </h1>
        <div style={buttonContainerStyle}>
            <button style={buttonStyle} onClick={handleSmallDrinkClick}>Small Drink</button>
            <button style={buttonStyle} onClick={handleMediumDrinkClick}>Medium Drink</button>
            <button style={buttonStyle} onClick={handleLargeDrinkClick}>Large Drink</button>
            <button style={buttonStyle} onClick={handleBottledWaterClick}>Bottled Water</button>
            <button style={buttonStyle} onClick={handleGatoradeClick}>Gatorade</button>
        </div>
        <button style={continueButtonStyle} onClick={handleContinueClick}>
            Continue
        </button>
        </div>
    );
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f4f4f4',
};

const buttonContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
};

export default DrinksPage;