// import React from 'react';
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Manager } from "./pages/manager";
import { Kiosk } from "./pages/kiosk";
import { Menu } from "./pages/menu";
import { Kitchen } from "./pages/kitchen";
import MenuSelection from './pages/MenuSelection';
import Checkout from './pages/checkout';
import { CartProvider } from './cartContext'; // Import CartProvider
import './App.css';
import cartIcon from './imgs/checkoutCart.png';
import BackButton from './components/backButton';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null); // To track the logged-in user

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

  console.log('Current user state:', user);
  return (
    <CartProvider> {/* Wrap the app in CartProvider */}
      <Router>
        <div className="App">
          <BackButton className='back-button' />
          <Routes>
            <Route path="/" element={
                <div className="home-nav-bar">
                <Link className='home-nav-button' to="/kiosk">CASHIER</Link>
                <Link className='home-nav-button' to="/manager">Manager</Link>
                <Link className='home-nav-button' to="/kitchen">Kitchen</Link>
                <Link className='home-nav-button' to="/kiosk">Kiosk</Link>
                <Link className='home-nav-button' to="/menu">Menu</Link>
              </div>
              }/>

              <Route path="/kiosk"  element={<Kiosk />} />
              <Route path="/manager/*" className='manager' element={<Manager />} />
              <Route path="/kitchen" element={<Kitchen />} />
              <Route path="/kiosk" element={<Kiosk />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/item/:itemType" element={<MenuSelection />} />
              <Route path="/checkout" element={<Checkout />} />
            
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
                  Login with Google
                </button>
              )}
            </div>
    </Router>
    </CartProvider>
  );
}

export default App;