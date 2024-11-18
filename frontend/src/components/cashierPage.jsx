import React, {useState, useEffect} from 'react';


function CashierPage({ isInitialized, setIsInitialized, navigate }) {
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

    // async function insertMealOrder(id, priceditem, cost, itemid) {
    //     try {
    //         const response = await fetch('http://localhost:3000/api/insertOrder', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 id: id,
    //                 priceditem: priceditem,
    //                 cost: cost,
    //                 itemid: itemid
    //             })
    //         });
    
    //         if (response.ok) {
    //             const data = await response.json();
    //             console.log('Order inserted successfully:', data);
    //         } else {
    //             console.error('Error inserting order:', response.statusText);
    //         }
    //     } catch (error) {
    //         console.error('Error making the request:', error);
    //     }
    // }

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

    const handleButtonClick = async (type) => {
        let priceditem, cost;
        switch (type) {
            case 'Bowl':
                priceditem = 0;
                // cost = await fetchPrice(priceditem);
                // await insertMealOrder(currentOrderId, priceditem, cost, itemid);
                // await updateIngredientQuantity(54, 0.1);
                // await updateIngredientQuantity(55, 0.1);
                // await updateIngredientQuantity(47, 0.1);
                // await updateIngredientQuantity(52, 0.1);
                // await updateIngredientQuantity(53, 0.1);
                navigate('/entreessides');
                break;
            case 'Plate':
                priceditem = 1;
                // cost = await fetchPrice(priceditem);
                // await insertMealOrder(currentOrderId, priceditem, cost, itemid);
                // await updateIngredientQuantity(56, 0.1);
                // await updateIngredientQuantity(47, 0.1);
                // await updateIngredientQuantity(52, 0.1);
                // await updateIngredientQuantity(53, 0.1);
                navigate('/entreessides');
                break;
            case 'Bigger Plate':
                priceditem = 2;
                // cost = await fetchPrice(priceditem);
                // await insertMealOrder(currentOrderId, priceditem, cost, itemid);
                // await updateIngredientQuantity(56, 0.1);
                // await updateIngredientQuantity(57, 0.1);
                // await updateIngredientQuantity(47, 0.1);
                // await updateIngredientQuantity(52, 0.1);
                // await updateIngredientQuantity(53, 0.1);
                navigate('/entreessides');
                break;
            case 'A La Carte':
                priceditem = itemid;
                // await insertNewOrder(currentOrderId, priceditem);
                // await updateIngredientQuantity(47, 0.1);
                // await updateIngredientQuantity(52, 0.1);
                // await updateIngredientQuantity(53, 0.1);
                navigate('/alacarte');
                break;
            case 'Drinks':
                // await insertNewOrder(currentOrderId, itemid);
                navigate('/drinks');
                break;
            case 'Appetizers & Desserts':
                // await insertNewOrder(currentOrderId, itemid);
                // await updateIngredientQuantity(47, 0.1);
                navigate('/appetizersdesserts');
                break;
            case 'Manager Page':
                navigate('/manager');
                break;
            case 'Checkout':
                navigate('/checkouts');
                break;
            default:
                break;
        }
        // setItemid(itemid + 1);
    };


    // Define functions for each button
    const handleBowlClick = () => {
        handleButtonClick('Bowl');
    };

    const handlePlateClick = () => {
        handleButtonClick('Plate');
    };

    const handleBiggerPlateClick = () => {
        handleButtonClick('Bigger Plate');
    };

    const handleAppetizersDessertsClick = () => {
        handleButtonClick('Appetizers & Desserts');
    };

    const handleALaCarteClick = () => {
        handleButtonClick('A La Carte');
    };

    const handleDrinksClick = () => {
        handleButtonClick('Drinks');
    };

    const handleManagerPageClick = () => {
        handleButtonClick('Manager Page');
    };

    const handleCheckoutClick = () => {
        handleButtonClick('Checkout');
    };

    return (
        <div style={containerStyle}>
        <h1 style={{ textAlign: 'center', fontSize: '36px', fontFamily: 'Arial, sans-serif' }}>
            Cashier Page
        </h1>
        <div style={buttonContainerStyle}>
            <button style={buttonStyle} onClick={handleBowlClick}>Bowl</button>
            <button style={buttonStyle} onClick={handlePlateClick}>Plate</button>
            <button style={buttonStyle} onClick={handleBiggerPlateClick}>Bigger Plate</button>
            <button style={buttonStyle} onClick={handleAppetizersDessertsClick}>Appetizers & Desserts</button>
            <button style={buttonStyle} onClick={handleALaCarteClick}>A La Carte</button>
            <button style={buttonStyle} onClick={handleDrinksClick}>Drinks</button>
            <button style={buttonStyle} onClick={handleManagerPageClick}>Manager Page</button>
            <button style={buttonStyle} onClick={handleCheckoutClick}>Checkout</button>
        </div>
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

export default CashierPage;