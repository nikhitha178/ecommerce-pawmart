import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

export default function QuickViewModal({ product, onClose }) {
    if (!product) return null;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const handleAddToBasket = () => {
        if (!isAuthenticated) {
            alert('Authentication Required: Please login to save cart selections.');
            onClose();
            navigate('/login');
            return;
        }
        dispatch(addToCart(product));
        onClose();
    };

    return (
        <div className="modal fade show d-block backdrop-blur" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content border-0 rounded-4 overflow-hidden shadow-lg">
                    <div className="modal-header border-0 bg-light p-3">
                        <h5 className="modal-title fw-bold text-uppercase tracking-wide text-muted small">Quick Product Review</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body p-4">
                        <div className="row g-4">
                            <div className="col-md-5">
                                <img src={product.image} className="img-fluid rounded-4 object-fit-cover w-100 shadow-sm" style={{ maxHeight: '320px' }} alt={product.name} />
                            </div>
                            <div className="col-md-7 d-flex flex-column justify-content-between">
                                <div>
                                    <span className="badge bg-warning text-dark mb-2 px-3 py-1 rounded-pill fw-bold">{product.petType}</span>
                                    <h3 className="fw-bold mb-2 fs-4">{product.name}</h3>
                                    <p className="text-muted small mb-3">{product.description}</p>
                                </div>
                                <div>
                                    <div className="d-flex align-items-baseline gap-3 mb-3">
                                        {/* Changed currency symbols here to ₹ */}
                                        <h2 className="text-warning fw-extrabold mb-0">₹{product.discountPrice}</h2>
                                        <del className="text-muted">₹{product.originalPrice}</del>
                                    </div>
                                    <button onClick={handleAddToBasket} className="btn btn-warning w-100 rounded-pill py-3 fw-bold shadow-sm">
                                        Add to Shopping Cart Basket
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}