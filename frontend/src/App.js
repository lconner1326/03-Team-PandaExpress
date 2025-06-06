// import React from 'react';
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Cashier } from "./pages/cashier";
import { Manager } from "./pages/manager";
import { Kiosk } from "./pages/kiosk";
import { Menu } from "./pages/menu";
import { Kitchen } from "./pages/kitchen";
import MenuSelection from './pages/MenuSelection';
import Checkout from './pages/checkout';
import CashierCheckout from './pages/cashierCheckout';
import { CartProvider } from './cartContext'; // Import CartProvider
import './App.css';
import cartIcon from './imgs/checkoutCart.png';
import BackButton from './components/backButton';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TranslationWidget from "./components/translationWidget";
import CashierMenuSelection from "./pages/cashierMenuSelection";
/**
 * @module App
 * @description The main application component that defines routes and global state for the application.
 * Includes user authentication, language translation, and navigation between various pages such as Cashier, Manager, Kitchen, Kiosk, and Menu.
 * 
 * @returns {JSX.Element} The main application structure with routing and authentication.
 */
function App() {
  const [user, setUser] = useState(null); // To track the logged-in user
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  const handleLogin = () => {
    // window.location.href = 'http://localhost:3000/auth/google';  // This will redirect directly to backend
    window.location.href = 'https://project-3-03-team-2xy5.onrender.com/auth/google';
  };
  // Logout function
  const handleLogout = async () => {
    // setLoading(true);
    try {
      console.log("Logging out");
      setUser(null); // Clear user state
      // await axios.get('http://localhost:3000/auth/logout'); // Replace with your backend logout endpoint
      await axios.get('https://project-3-03-team-2xy5.onrender.com/auth/logout');
      console.log("Reached after axios");
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // setLoading(false);
    }
  };
  const fetchUser = async () => {
    try {
      console.log('Fetching user status...');
      // const response = await axios.get('http://localhost:3000/auth/status', { withCredentials: true });
      const response = await axios.get('https://project-3-03-team-2xy5.onrender.com/auth/status', { withCredentials: true });
      console.log('User data:', response.data.user);
      setUser(response.data.user); // Update state
    } catch (error) {
      console.error('Error fetching user status:', error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  const resetZoom = () => setZoomLevel(1);

  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 2, 24));
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 2, 12));
  const resetFontSize = () => setFontSize(16);

  const toggleHighContrast = () => {
    setIsHighContrast(prev => !prev);
  };

  console.log('Current user state:', user);
  return (
    <CartProvider> {/* Wrap the app in CartProvider */}
      <Router>
        <div 
          className={`App ${isHighContrast ? 'high-contrast' : ''}`} 
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center', fontSize: `${fontSize}px` }}
        >
          <BackButton className='back-button' />
          <TranslationWidget className='translation-widget' />
          <Routes>
            <Route path="/" element={
                <div className="home-nav-bar">
                <Link className='home-nav-button' to="/cashier">Cashier</Link>
                <Link className='home-nav-button' to="/manager">Manager</Link>
                <Link className='home-nav-button' to="/kitchen">Kitchen</Link>
                <Link className='home-nav-button' to="/kiosk">Kiosk</Link>
                <Link className='home-nav-button' to="/menu">Menu</Link>
              </div>
              }/>
              <Route path="/cashier"  element={<Cashier />} />
              <Route path="/kiosk"  element={<Kiosk />} />
              <Route path="/manager/*" className='manager' element={<Manager />} />
              <Route path="/kitchen" element={<Kitchen />} />
              <Route path="/kiosk" element={<Kiosk />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/item/:itemType" element={<MenuSelection />} />
              <Route path="/cashier/item/:itemType" element={<CashierMenuSelection />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/cashierCheckout" element={<CashierCheckout />} />
            
            </Routes>
        </div>
             <div className="auth-buttons">
               {user ? (
                <>
                  <span>Welcome, {user.name?.givenName || 'User'} {user.name?.familyName || ''}!</span>
                  <button onClick={handleLogout} >
                    Logout
                  </button>
                </>
              ) : (
                <button onClick={handleLogin} >
                  Login With Google
                </button>
              )}
            </div>

            <div className="zoom-controls">
              <button onClick={handleZoomIn}>Zoom In</button>
              <button onClick={handleZoomOut}>Zoom Out</button>
              <button onClick={resetZoom}>Reset Zoom</button>
            </div>

            <div className="font-controls">
              <button onClick={increaseFontSize}>Increase Font Size</button>
              <button onClick={decreaseFontSize}>Decrease Font Size</button>
              <button onClick={resetFontSize}>Reset Font Size</button>
            </div>

            <div className="contrast-controls">
              <button onClick={toggleHighContrast}>
                {isHighContrast ? 'Disable High Contrast' : 'Enable High Contrast'}
              </button>
            </div>
      </Router>
    </CartProvider>
  );
}
export default App;