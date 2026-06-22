import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';
import QuickViewModal from '../components/product/QuickViewModal';
import FilterSidebar from '../components/product/FilterSidebar'; // ✅ Modularized Import
import Footer from '../components/common/Footer';

export default function ProductListing() {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [search, setSearch] = useState('');
    const [petType, setPetType] = useState('All');
    const [category, setCategory] = useState(categoryName || 'All');
    const [sortOrder, setSortOrder] = useState('default');

    // Fetch initial master product inventory records
    useEffect(() => {
        axios.get('/data/products.json').then(res => {
            setProducts(res.data);
            setFiltered(res.data);
        }).catch(err => console.error(err));
    }, []);

    // Synchronize category state changes if incoming URL category parameters mutate
    useEffect(() => {
        if (categoryName) {
            setCategory(categoryName);
        }
    }, [categoryName]);

    // Computation Pipeline: Handles searches, multi-tier filters, and price arrays sorting
    useEffect(() => {
        let result = [...products];

        if (search) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.brand.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (petType !== 'All') {
            result = result.filter(p => p.petType === petType);
        }
        if (category !== 'All') {
            result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
        }

        if (sortOrder === 'low-high') {
            result.sort((a, b) => a.discountPrice - b.discountPrice);
        } else if (sortOrder === 'high-low') {
            result.sort((a, b) => b.discountPrice - a.discountPrice);
        }

        setFiltered(result);
    }, [search, petType, category, sortOrder, products]);

    return (
        <div className="container py-5 fade-in-element">
            <div className="row g-4">
                {/* Left Side Column: Filter Interface */}
                <div className="col-lg-3">
                    <FilterSidebar
                        search={search} setSearch={setSearch}
                        petType={petType} setPetType={setPetType}
                        category={category} setCategory={setCategory}
                        setSortOrder={setSortOrder}
                    />
                </div>

                {/* Right Side Column: Product Results Grid Matrix */}
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