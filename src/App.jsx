import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnnouncementBar from './components/common/AnnouncementBar';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails'; // ✅ Imported clean details screen
import Cart from './pages/Cart';
import OrderTracking from './pages/OrderTracking';
import Auth from './pages/Auth';

export default function App() {

  // 🌱 Global Database Seeder: Safely initializes local storage matrix upon boot
  useEffect(() => {
    const existingInventory = localStorage.getItem('app_product_inventory');

    if (!existingInventory) {
      const defaultProducts = [
        {
          id: "p1",
          name: "Premium Salmon & Rice Adult Dog Kibble",
          brand: "PawNutrition",
          category: "Food",
          petType: "Dog",
          discountPrice: 1250.00,
          originalPrice: 1500.00,
          rating: 4.8,
          reviewCount: 142,
          badge: "Best Seller",
          image: "https://images.unsplash.com/photo-1589924691995-400dc9ebd100?w=500&auto=format&fit=crop&q=60"
        },
        {
          id: "p2",
          name: "Interactive Feather Wand & Mouse Toy Set",
          brand: "CatPlay",
          category: "Toys",
          petType: "Cat",
          discountPrice: 299.00,
          originalPrice: 450.00,
          rating: 4.5,
          reviewCount: 88,
          badge: "Trending",
          image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=500&auto=format&fit=crop&q=60"
        },
        {
          id: "p3",
          name: "Orthopedic Memory Foam Pet Bed",
          brand: "PawComfort",
          category: "Beds",
          petType: "Dog",
          discountPrice: 3499.00,
          originalPrice: 4999.00,
          rating: 4.9,
          reviewCount: 210,
          badge: "Luxury",
          image: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=500&auto=format&fit=crop&q=60"
        }
      ];

      localStorage.setItem('app_product_inventory', JSON.stringify(defaultProducts));
      console.log("🌱 Global Product Database Mock Array Seeded Successfully!");
    }
  }, []);

  return (
    <Router>
      <AnnouncementBar />
      <Navbar />
      <main style={{ minHeight: '85vh' }} className="bg-light-subtle">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ProductListing />} />
          <Route path="/shop/:categoryName" element={<ProductListing />} />

          {/* ✅ Added Dynamic Target Route for item inspections */}
          <Route path="/product/:id" element={<ProductDetails />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/track" element={<OrderTracking />} />
          <Route path="/login" element={<Auth />} />
        </Routes>
      </main>
    </Router>
  );
}