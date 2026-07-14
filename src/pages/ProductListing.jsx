import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // 1. Import useParams hook
import ProductCard from '../components/common/ProductCard';
import QuickViewModal from '../components/product/QuickViewModal';
import Footer from '../components/common/Footer';

export default function ProductListing() {
    const { categoryName } = useParams(); // 2. Extract our parameter token
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [search, setSearch] = useState('');
    const [petType, setPetType] = useState('All');
    // 3. Set standard initial fallbacks to look out for incoming route parameters
    const [category, setCategory] = useState(categoryName || 'All');
    const [sortOrder, setSortOrder] = useState('default');

    useEffect(() => {
        axios.get('/data/products.json').then(res => {
            setProducts(res.data);
            setFiltered(res.data);
        }).catch(err => console.error(err));
    }, []);

    // 4. Listen for dynamic updates if the user clicks a different link while inside the catalogue
    useEffect(() => {
        if (categoryName) {
            setCategory(categoryName);
        }
    }, [categoryName]);

    useEffect(() => {
        let result = [...products];

        if (search) {
            result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()));
        }
        if (petType !== 'All') {
            result = result.filter(p => p.petType === petType);
        }
        if (category !== 'All') {
            result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
        }

        // ✅ FIX: Create a separate shallow copy before sorting to completely block the infinite render loop
        let finalDisplayList = [...result];

        if (sortOrder === 'low-high') {
            finalDisplayList.sort((a, b) => Number(a.discountPrice) - Number(b.discountPrice));
        } else if (sortOrder === 'high-low') {
            finalDisplayList.sort((a, b) => Number(b.discountPrice) - Number(a.discountPrice));
        }

        setFiltered(finalDisplayList);
    }, [search, petType, category, sortOrder, products]);

    return (
        <div className="container py-5 fade-in-element">
            <div className="row g-4">
                {/* Sidebar */}
                <div className="col-lg-3">
                    <div className="card border-0 shadow-sm rounded-4 p-4 sticky-md-top" style={{ top: '100px', zIndex: '10' }}>
                        <h5 className="fw-bold mb-4">Inventory Modifiers</h5>

                        <div className="mb-4">
                            <label className="form-label small fw-bold text-muted text-uppercase">Textual Match Query</label>
                            <input type="text" className="form-control rounded-pill" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>

                        <div className="mb-4">
                            <label className="form-label small fw-bold text-muted text-uppercase">Target Pet Classification</label>
                            <select className="form-select rounded-pill" value={petType} onChange={(e) => setPetType(e.target.value)}>
                                <option value="All">All Animals</option>
                                <option value="Dog">Dogs Only</option>
                                <option value="Cat">Cats Only</option>
                                <option value="Bird">Birds Only</option>
                                <option value="Fish">Fish Only</option>
                                <option value="Rabbit">Rabbits Only</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="form-label small fw-bold text-muted text-uppercase">Core Functional Line</label>
                            <select className="form-select rounded-pill" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="All">All Categories</option>
                                <option value="Food">Food</option>
                                <option value="Toys">Toys</option>
                                <option value="Beds">Beds</option>
                                <option value="Grooming">Grooming</option>
                                <option value="Healthcare">Healthcare</option>
                            </select>
                        </div>

                        <div>
                            <button
                                onClick={() => { setSearch(''); setPetType('All'); setCategory('All'); setSortOrder('default'); }}
                                className="btn btn-outline-danger btn-sm w-100 rounded-pill py-2"
                            >
                                Clear Applied Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Layout Grid Grid */}
                <div className="col-lg-9">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 bg-light p-3 rounded-4">
                        <span className="small text-muted fw-semibold">
                            Browsing: <span className="text-warning fw-bold">{category} Catalogue</span> ({filtered.length} matching items)
                        </span>
                        <div className="d-flex align-items-center gap-2">
                            <span className="small text-muted text-nowrap fw-bold">Sort Hierarchy:</span>
                            <select className="form-select form-select-sm rounded-pill" style={{ width: '180px' }} value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                                <option value="default">Relevance Standard</option>
                                <option value="low-high">Cost: Low to High</option>
                                <option value="high-low">Cost: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {filtered.length === 0 ? (
                        <div className="text-center py-5 bg-light rounded-4 border border-dashed my-4">
                            <div className="fs-1 mb-2">🔍</div>
                            <h4 className="fw-bold text-muted">No Products Found</h4>
                            <p className="text-muted small">We don't have items assigned under "{category}" inside our database layout right now.</p>
                        </div>
                    ) : (
                        <div className="row g-4">
                            {filtered.map(product => (
                                <div key={product.id} className="col-12 col-sm-6 col-md-4">
                                    <ProductCard product={product} onQuickView={(p) => setSelectedProduct(p)} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
            <Footer />
        </div>
    );
}