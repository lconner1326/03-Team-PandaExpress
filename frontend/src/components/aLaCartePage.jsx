import React, {useState, useEffect} from 'react';


function ALaCartePage({ isInitialized, setIsInitialized, navigate }) {
    const [currentOrderId, setCurrentOrderId] = useState(null);
    const [itemid, setItemid] = useState(0);
    const [price, setPrice] = useState(null);

    const buttonStyle = {
        width: '200px',
        height: '100px',
        fontSize: '14px',
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
        bottom: '-100px',
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
            case 'Small':
                break;
            case 'Medium':
                break;
            case 'Large':
                break;
            case 'Chow Mein':
                break;
            case 'Fried Rice':
                break;
            case 'White Steamed Rice':
                break;
            case 'Super Greens':
                break;
            case 'Blazing Bourbon Chicken':
                break;
            case 'Orange Chicken':
                break;
            case 'Black Pepper Angus Steak':
                break;
            case 'Honey Walnut Shrimp':
                break;
            case 'Grilled Teriyaki Chicken':
                break;
            case 'Broccoli Beef':
                break;
            case 'Kung Pao Chicken':
                break;
            case 'Honey Sesame Chicken Breast':
                break;
            case 'Beijing Beef':
                break;
            case 'Mushroom Chicken':
                break;
            case 'Sweetfire Chicken Breast':
                break;
            case 'String Bean Chicken Breast':
                break;
            case 'Black Pepper Chicken':
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

    const handleSmallClick = () => {
        handleButtonClick('Small');
    };

    const handleMediumClick = () => {
        handleButtonClick('Medium');
    };

    const handleLargeClick = () => {
        handleButtonClick('Large');
    };

    const handleChowMeinClick = () => {
        handleButtonClick('Chow Mein');
    };

    const handleFriedRiceClick = () => {
        handleButtonClick('Fried Rice');
    };

    const handleWhiteSteamedRiceClick = () => {
        handleButtonClick('White Steamed Rice');
    };

    const handleSuperGreensClick = () => {
        handleButtonClick('Super Greens');
    }

    const handleBlazingBourbonChickenClick = () => {
        handleButtonClick('Blazing Bourbon Chicken');
    }

    const handleOrangeChickenClick = () => {
        handleButtonClick('Orange Chicken');
    }

    const handleBlackPepperAngusSteakClick = () => {
        handleButtonClick('Black Pepper Angus Steak');
    }

    const handleHoneyWalnutShrimpClick = () => {
        handleButtonClick('Honey Walnut Shrimp');
    }

    const handleGrilledTeriyakiChickenClick = () => {
        handleButtonClick('Grilled Teriyaki Chicken');
    }

    const handleBroccoliBeefClick = () => {
        handleButtonClick('Broccoli Beef');
    }

    const handleKungPaoChickenClick = () => {
        handleButtonClick('Kung Pao Chicken');
    }

    const handleHoneySesameChickenBreastClick = () => {
        handleButtonClick('Honey Sesame Chicken Breast');
    }

    const handleBeijingBeefClick = () => {
        handleButtonClick('Beijing Beef');
    }

    const handleMushroomChickenClick = () => {
        handleButtonClick('Mushroom Chicken');
    }

    const handleSweetfireChickenBreastClick = () => {
        handleButtonClick('Sweetfire Chicken Breast');
    }

    const handleStringBeanChickenBreastClick = () => {
        handleButtonClick('String Bean Chicken Breast');
    }

    const handleBlackPepperChickenClick = () => {
        handleButtonClick('Black Pepper Chicken');
    }

    return (
        <div style={containerStyle}>
            <button style={backButtonStyle} onClick={handleBackClick}>
            Back
        </button>
        <h1 style={{ textAlign: 'center', fontSize: '36px', fontFamily: 'Arial, sans-serif' }}>
            Size
        </h1>
        <div style={buttonContainerStyle}>
            <button style={buttonStyle} onClick={handleSmallClick}>Small</button>
            <button style={buttonStyle} onClick={handleMediumClick}>Medium</button>
            <button style={buttonStyle} onClick={handleLargeClick}>Large</button>
        </div>
        <h1 style={{ textAlign: 'center', fontSize: '36px', fontFamily: 'Arial, sans-serif' }}>
            Entrees & Sides
        </h1>
        <div style={buttonContainerStyle}>
            <button style={buttonStyle} onClick={handleChowMeinClick}>Chow Mein</button>
            <button style={buttonStyle} onClick={handleFriedRiceClick}>Fried Rice</button>
            <button style={buttonStyle} onClick={handleWhiteSteamedRiceClick}>White Steamed Rice</button>
            <button style={buttonStyle} onClick={handleSuperGreensClick}>Super Greens</button>
            <button style={buttonStyle} onClick={handleBlazingBourbonChickenClick}>Blazing Bourbon Chicken</button>
            <button style={buttonStyle} onClick={handleOrangeChickenClick}>Orange Chicken</button>
            <button style={buttonStyle} onClick={handleBlackPepperAngusSteakClick}>Black Pepper Angus Steak</button>
            <button style={buttonStyle} onClick={handleHoneyWalnutShrimpClick}>Honey Walnut Shrimp</button>
            <button style={buttonStyle} onClick={handleGrilledTeriyakiChickenClick}>Grilled Teriyaki Chicken</button>
            <button style={buttonStyle} onClick={handleBroccoliBeefClick}>Broccoli Beef</button>
            <button style={buttonStyle} onClick={handleKungPaoChickenClick}>Kung Pao Chicken</button>
            <button style={buttonStyle} onClick={handleHoneySesameChickenBreastClick}>Honey Sesame Chicken Breast</button>
            <button style={buttonStyle} onClick={handleBeijingBeefClick}>Beijing Beef</button>
            <button style={buttonStyle} onClick={handleMushroomChickenClick}>Mushroom Chicken</button>
            <button style={buttonStyle} onClick={handleSweetfireChickenBreastClick}>Sweetfire Chicken Breast</button>
            <button style={buttonStyle} onClick={handleStringBeanChickenBreastClick}>String Bean Chicken Breast</button>
            <button style={buttonStyle} onClick={handleBlackPepperChickenClick}>Black Pepper Chicken</button>
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

export default ALaCartePage;