import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Added routing navigation hook
import ProductCard from '../components/common/ProductCard';
import QuickViewModal from '../components/product/QuickViewModal';
import Footer from '../components/common/Footer';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate(); // Initialized the navigator

    useEffect(() => {
        axios.get('/data/products.json').then(res => setProducts(res.data)).catch(err => console.error(err));
        axios.get('/data/categories.json').then(res => setCategories(res.data)).catch(err => console.error(err));
    }, []);

    return (
        <div className="fade-in-element">
            {/* Premium Hero Carousel Banner */}
            <div className="bg-light-subtle py-5 mb-5 border-bottom position-relative overflow-hidden">
                <div className="container py-4">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6">
                            <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold mb-3 shadow-sm">SUMMER CONCESSION OFFERS</span>
                            <h1 className="display-4 fw-black text-body mb-3 lh-tight">Everything Your Pet Loves, <br /><span className="text-warning">All in One Place.</span></h1>
                            <p className="lead text-muted mb-4 fs-5">Explore medical grade formulations, engineered active play modules, and tailored luxury beds designed precisely for your pets.</p>
                            <div className="d-flex gap-3">
                                <a href="/shop" className="btn btn-warning btn-lg px-5 rounded-pill fw-bold shadow-sm">Explore Shop</a>
                                <a href="#services" className="btn btn-outline-secondary btn-lg px-4 rounded-pill">Our Services</a>
                            </div>
                        </div>
                        <div className="col-lg-6 position-relative text-center">
                            <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop" className="img-fluid rounded-5 shadow-lg w-75 object-fit-cover" alt="Hero Pet" style={{ height: '380px' }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Selection Deck */}
            <div className="container mb-5">
                <h3 className="fw-bold mb-4 text-center text-md-start">Shop Top Core Categories</h3>
                <div className="row g-3 justify-content-center">
                    {categories.map(cat => (
                        <div
                            key={cat.id}
                            className="col-6 col-sm-4 col-md-2"
                            onClick={() => navigate(`/shop/${cat.name}`)} // Forces redirect to shop page with filter parameters
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="card text-center border-0 shadow-sm rounded-4 p-3 card-hover transition-all bg-body-tertiary">
                                <div className="fs-1 mb-2">{cat.icon}</div>
                                <h6 className="fw-bold mb-0 small">{cat.name}</h6>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dynamic Showcased Product Grids */}
            <div className="container mb-5">
                <div className="d-flex justify-content-between align-items-baseline mb-4">
                    <h3 className="fw-bold m-0">Featured Dynamic Stock</h3>
                    <a href="/shop" className="text-warning fw-bold text-decoration-none small">View Full Inventory →</a>
                </div>
                <div className="row g-4">
                    {products.slice(0, 4).map(prod => (
                        <div key={prod.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <ProductCard product={prod} onQuickView={(p) => setSelectedProduct(p)} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Specialized Support & Perks Grid Section */}
            <div id="services" className="bg-body-secondary py-5 border-top border-bottom">
                <div className="container">
                    <h3 className="fw-bold text-center mb-5">Why Choice Operations Prefer PawMart</h3>
                    <div className="row g-4 text-center">
                        <div className="col-md-4">
                            <div className="p-4 bg-body rounded-4 shadow-sm h-100">
                                <div className="fs-1 text-warning mb-3">🛡️</div>
                                <h5 className="fw-bold">100% Verified Sourcing</h5>
                                <p className="text-muted small mb-0">Every clinical treatment and dietary line arrives fully batch-certified for premium health validation profiles.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-4 bg-body rounded-4 shadow-sm h-100">
                                <div className="fs-1 text-warning mb-3">⚡</div>
                                <h5 className="fw-bold">Expedited Thermal Transport</h5>
                                <p className="text-muted small mb-0">Orders packing raw ingredients or temperature-sensitive items enjoy quick fulfillment protocols directly to your location.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-4 bg-body rounded-4 shadow-sm h-100">
                                <div className="fs-1 text-warning mb-3">👩‍⚕️</div>
                                <h5 className="fw-bold">24/7 Veterinary Integration</h5>
                                <p className="text-muted small mb-0">Connect directly into modern clinical scheduling engines straight from your centralized member portal account dashboard.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
            <Footer />
        </div>
    );
}