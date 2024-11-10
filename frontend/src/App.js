// import React, { useState, useEffect } from 'react';
import {Link, BrowserRouter as Router, Routes, Route} from "react-router-dom"
import MenuItems from './components/menuitems';
import { Cashier } from './pages/cashier';
import { Manager } from "./pages/manager";
import { Kiosk } from "./pages/kiosk";
import { Menu } from "./pages/menu";
import { Kitchen } from "./pages/kitchen";
import './App.css';

function App() {
//cashier, manager, kitchen, kiosk, menu
  return (
      <div className="App">
      <Router>
        <div className="nav">
          <Link to="/">HOME</Link>
          <Link to="/cashier">CASHIER</Link>
          <Link to="/manager">Manager</Link>
          <Link to="/Kitchen">Kitchen</Link>
          <Link to="/Kiosk">Kiosk</Link>
          <Link to="/Menu">Menu</Link>
        </div>
        <Routes >
          <Route path="/" element={<MenuItems/>} />
          <Route path="/cashier" element={<Cashier/>} />
          <Route path="/manager/*" element={<Manager/>} />
          <Route path="/kitchen" element={<Kitchen/>} />
          <Route path="/kiosk" element={<Kiosk/>} />
          <Route path="/menu" element={<Menu/>} />
        </Routes>
    </Router>

  </div>
  );
}

export default App;