import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { toggleWishlist } from '../redux/slices/wishlistSlice';
import Footer from '../components/common/Footer';

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    // Pull operational states from Redux
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const wishlist = useSelector(state => state.wishlist.items);
    const isWishlisted = wishlist.some(item => item.id === id);

    // Fetch product record matching the URL Parameter ID
    useEffect(() => {
        const localData = localStorage.getItem('app_product_inventory');
        if (localData) {
            const inventory = JSON.parse(localData);
            const foundProduct = inventory.find(item => item.id === id);
            setProduct(foundProduct);
        }
    }, [id]);

    if (!product) {
        return (
            <div className="container py-5 text-center">
                <h3 className="fw-bold text-muted">🐾 Product Not Found</h3>
                <p className="text-muted">The product you are looking for does not exist or has been modified.</p>
                <Link to="/shop" className="btn btn-warning rounded-pill px-4 fw-bold">Back to Shop</Link>
            </div>
        );
    }

    // Security Guarded Actions
    const handleAddToBasket = () => {
        if (!isAuthenticated) {
            alert('Authentication Required: Please sign in or register to add premium items to your cart.');
            navigate('/login');
            return;
        }
        // Dispatch multiple times or update cartSlice to accept a quantity payload
        for (let i = 0; i < quantity; i++) {
            dispatch(addToCart(product));
        }
        alert(`🛒 Added ${quantity} item(s) to your basket successfully!`);
    };

    const handleWishlistClick = () => {
        if (!isAuthenticated) {
            alert('🔒 Authentication Required: Please sign in or register to save items to your wishlist.');
            navigate('/login');
            return;
        }
        dispatch(toggleWishlist(product));
    };

    return (
        <div className="container py-5 fade-in-element">
            {/* Breadcrumb Navigation */}
            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/shop" className="text-decoration-none text-muted">Shop</Link></li>
                    <li className="breadcrumb-item text-muted">{product.category}</li>
                    <li className="breadcrumb-item active fw-bold text-warning" aria-current="page">{product.name}</li>
                </ol>
            </nav>

            <div className="row g-5 align-items-center">
                {/* Left Side: Product Image Display */}
                <div className="col-md-6">
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-light p-3">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="img-fluid rounded-4 object-fit-cover w-100"
                            style={{ maxHeight: '450px' }}
                        />
                    </div>
                </div>

                {/* Right Side: Product Details & Purchase Controls */}
                <div className="col-md-6">
                    <span className="text-muted text-uppercase small tracking-wider fw-bold">{product.brand}</span>
                    <h1 className="fw-extrabold text-dark display-6 mt-1 mb-2">{product.name}</h1>

                    {/* Ratings */}
                    <div className="d-flex align-items-center gap-2 mb-4">
                        <span className="text-warning fs-5 fw-bold">★ {product.rating}</span>
                        <span className="text-muted small">({product.reviewCount} customer reviews)</span>
                        {product.badge && <span className="badge bg-danger rounded-pill px-3 py-1 ms-2">{product.badge}</span>}
                    </div>

                    {/* Pricing */}
                    <div className="d-flex align-items-baseline gap-3 bg-light p-3 rounded-4 mb-4">
                        <h2 className="text-warning fw-extrabold mb-0">₹{product.discountPrice.toFixed(2)}</h2>
                        <del className="text-muted fs-5">₹{product.originalPrice.toFixed(2)}</del>
                        <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3">
                            Save ₹{(product.originalPrice - product.discountPrice).toFixed(0)}
                        </span>
                    </div>

                    <p className="text-muted mb-4 leading-relaxed">
                        Treat your beloved pet to the premium quality they deserve. Formulated with top-tier materials and backed by veterinarian standards, this {product.petType}-focused item balances absolute safety with optimal joy.
                    </p>

                    <hr className="my-4 text-muted opacity-25" />

                    {/* Interactive Quantity Selection & Cart Controls */}
                    <div className="d-flex flex-wrap align-items-center gap-3">
                        <div className="d-flex align-items-center border border-2 rounded-pill bg-white px-2 py-1" style={{ width: '130px', justifyContent: 'space-between' }}>
                            <button
                                className="btn btn-link text-decoration-none p-0 fw-bold fs-4 text-secondary"
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                            >-</button>
                            <span className="fw-bold fs-5 text-dark mx-2">{quantity}</span>
                            <button
                                className="btn btn-link text-decoration-none p-0 fw-bold fs-4 text-secondary"
                                onClick={() => setQuantity(q => q + 1)}
                            >+</button>
                        </div>

                        <button
                            onClick={handleAddToBasket}
                            className="btn btn-warning flex-grow-1 rounded-pill py-3 fw-bold shadow-sm text-dark transition-all"
                        >
                            🛒 Add to Basket
                        </button>

                        <button
                            onClick={handleWishlistClick}
                            className={`btn rounded-circle p-3 shadow-sm border-0 d-flex align-items-center justify-content-center ${isWishlisted ? 'btn-danger' : 'btn-light'}`}
                            style={{ width: '54px', height: '54px' }}
                        >
                            ❤️
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}