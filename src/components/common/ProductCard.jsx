import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { toggleWishlist } from '../../redux/slices/wishlistSlice';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product, onQuickView }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const wishlist = useSelector(state => state.wishlist.items);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const isWishlisted = wishlist.some(item => item.id === product.id);

    // 1. Existing Cart Security Guard
    const handleAddToBasket = () => {
        if (!isAuthenticated) {
            alert('Authentication Required: Please sign in or register to add premium products to your cart.');
            navigate('/login');
            return;
        }
        dispatch(addToCart(product));
    };

    // 2. NEW: Wishlist Security Guard 
    const handleWishlistClick = () => {
        if (!isAuthenticated) {
            alert('🔒 Authentication Required: Please sign in or register to curate your personal wishlist profile.');
            navigate('/login');
            return;
        }
        dispatch(toggleWishlist(product));
    };

    return (
        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative card-hover transition-all">
            {product.badge && (
                <span className="position-absolute top-3 start-3 badge bg-danger rounded-pill px-3 py-2 fw-semibold z-1 shadow-sm">
                    {product.badge}
                </span>
            )}

            {/* Updated onClick handler to target the new secure function */}
            <button
                onClick={handleWishlistClick}
                className={`position-absolute top-3 end-3 btn rounded-circle shadow-sm z-1 p-2 border-0 ${isWishlisted ? 'btn-danger' : 'btn-light'}`}
                style={{ width: '40px', height: '40px' }}
                title="Save to Wishlist"
            >
                ❤️
            </button>

            <div className="ratio ratio-4x3 bg-light overflow-hidden">
                <img src={product.image} className="object-fit-cover transition-zoom" alt={product.name} />
            </div>

            <div className="card-body d-flex flex-column p-4">
                <span className="text-muted small text-uppercase tracking-wider fw-bold mb-1">{product.brand}</span>
                <h5 className="card-title fw-bold text-truncate-2 mb-2 fs-6">{product.name}</h5>

                <div className="d-flex align-items-center gap-2 mb-3">
                    <span className="text-warning fw-bold">★ {product.rating}</span>
                    <span className="text-muted small">({product.reviewCount} reviews)</span>
                </div>

                <div className="mt-auto">
                    <div className="d-flex align-items-baseline gap-2 mb-3">
                        <h4 className="text-warning fw-extrabold mb-0">₹{product.discountPrice.toFixed(2)}</h4>
                        <del className="text-muted small">₹{product.originalPrice.toFixed(2)}</del>
                    </div>

                    <div className="d-flex gap-2">
                        <button onClick={() => onQuickView(product)} className="btn btn-outline-secondary btn-sm flex-grow-1 rounded-pill py-2">
                            Inspect
                        </button>
                        <button onClick={handleAddToBasket} className="btn btn-warning btn-sm flex-grow-1 rounded-pill py-2 fw-bold shadow-sm">
                            + Basket
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}