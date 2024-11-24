import React from 'react';
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuItems from './components/menuitems';
import { Cashier } from './pages/cashier';
import { Manager } from "./pages/manager";
import { Kiosk } from "./pages/kiosk";
import { Menu } from "./pages/menu";
import { Kitchen } from "./pages/kitchen";
import { EntreesSides } from "./pages/entreessides";
import { ALaCarte } from "./pages/alacarte";
import { Drinks } from "./pages/drinks";
import { AppetizersDesserts } from "./pages/appetizersdesserts";
import { Checkouts } from "./pages/checkouts";
import MenuSelection from './pages/MenuSelection';
import Checkout from './pages/checkout';
import { CartProvider } from './cartContext'; // Import CartProvider
import './App.css';
import cartIcon from './imgs/checkoutCart.png';

function App() {
  return (
    <CartProvider> {/* Wrap the app in CartProvider */}
      <Router>
        <div className="App">
          <div className="nav">
            <Link to="/">HOME</Link>
            <Link to="/cashier">CASHIER</Link>
            <Link to="/manager">Manager</Link>
            <Link to="/kitchen">Kitchen</Link>
            <Link to="/kiosk">Kiosk</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/checkout" className="checkout-icon">
              <img src={cartIcon} alt="Checkout" />
            </Link>
          </div>
          <Routes>
            <Route path="/" element={<MenuItems />} />
            <Route path="/cashier" element={<Cashier />} />
            <Route path="/manager/*" element={<Manager />} />
            <Route path="/kitchen" element={<Kitchen />} />
            <Route path="/kiosk" element={<Kiosk />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/item/:itemType" element={<MenuSelection />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/entreessides" element={<EntreesSides/>} />
            <Route path="/alacarte" element={<ALaCarte/>} />
            <Route path="/drinks" element={<Drinks/>} />
            <Route path="/appetizersdesserts" element={<AppetizersDesserts/>} />
            <Route path="/checkouts" element={<Checkouts/>} />
          </Routes>
        </div>
    </Router>
    </CartProvider>
  );
}

export default App;


