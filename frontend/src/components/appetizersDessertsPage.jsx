import React, {useState, useEffect} from 'react';


function AppetizersDessertsPage({ isInitialized, setIsInitialized, navigate }) {
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
            case 'Cream Cheese Rangoon':
                break;
            case 'Apple Pie Roll':
                break;
            case 'Egg Roll':
                break;
            case 'Spring Roll':
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

    const handleCreamCheeseRangoonClick = () => {
        handleButtonClick('Cream Cheese Rangoon');
    };

    const handleApplePieRollClick = () => {
        handleButtonClick('Apple Pie Roll');
    };

    const handleEggRollClick = () => {
        handleButtonClick('Egg Roll');
    };

    const handleSpringRollClick = () => {
        handleButtonClick('Spring Roll');
    };

    return (
        <div style={containerStyle}>
        <button style={backButtonStyle} onClick={handleBackClick}>
            Back
        </button>
        <h1 style={{ textAlign: 'center', fontSize: '36px', fontFamily: 'Arial, sans-serif' }}>
            Appetizers & Desserts
        </h1>
        <div style={buttonContainerStyle}>
            <button style={buttonStyle} onClick={handleCreamCheeseRangoonClick}>Cream Cheese Rangoon</button>
            <button style={buttonStyle} onClick={handleApplePieRollClick}>Apple Pie Roll</button>
            <button style={buttonStyle} onClick={handleEggRollClick}>Egg Roll</button>
            <button style={buttonStyle} onClick={handleSpringRollClick}>Spring Roll</button>
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

export default AppetizersDessertsPage;