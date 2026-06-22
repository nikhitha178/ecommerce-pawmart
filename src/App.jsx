import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnnouncementBar from './components/common/AnnouncementBar';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import Cart from './pages/Cart';
import OrderTracking from './pages/OrderTracking';
import Auth from './pages/Auth';

export default function App() {
  return (
    <Router>
      <AnnouncementBar />
      <Navbar />
      <main style={{ minHeight: '85vh' }} className="bg-light-subtle">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ProductListing />} />
          {/* Add this new route option to accept a dynamic category string parameter */}
          <Route path="/shop/:categoryName" element={<ProductListing />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/track" element={<OrderTracking />} />
          <Route path="/login" element={<Auth />} />
        </Routes>
      </main>
    </Router>
  );
}