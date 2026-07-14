import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../redux/slices/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
    const cartItems = useSelector(state => state.cart.cartItems);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // State controls for payment simulation modal
    const [showCheckout, setShowCheckout] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');

    const subtotal = cartItems.reduce((acc, item) => acc + (item.discountPrice * item.quantity), 0);
    // Adjusted free shipping logic for Rupees: Free over ₹500, otherwise ₹50 delivery
    const shippingCost = subtotal > 500 || subtotal === 0 ? 0 : 50.00;
    const totalAmount = subtotal + shippingCost;

    const handleCheckoutSubmit = (e) => {
        e.preventDefault();
        if (!cardNumber || !expiry) {
            alert('Please fill out your simulated card credentials.');
            return;
        }

        setProcessing(true);
        // Simulate API authorization handshake sequence
        setTimeout(() => {
            setProcessing(false);
            setPaymentSuccess(true);
            // Securely clear global cart contents upon success
            dispatch(clearCart());
        }, 2500);
    };

    if (paymentSuccess) {
        return (
            <div className="container py-5 text-center fade-in-element">
                <div className="card border-0 shadow-sm rounded-4 p-5 max-w-md mx-auto" style={{ maxWidth: '500px' }}>
                    <div className="display-1 text-success mb-3">🎉</div>
                    <h2 className="fw-extrabold mb-2">Order Confirmed!</h2>
                    <p className="text-muted">Your simulated payment was processed successfully. Our dispatch teams are already picking your pet goods.</p>
                    <button onClick={() => navigate('/track')} className="btn btn-warning rounded-pill px-4 py-2 fw-bold shadow-sm mt-3">
                        Track Order Logistics
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5 fade-in-element">
            <h2 className="fw-black mb-4">Your Shopping Basket</h2>

            {cartItems.length === 0 ? (
                <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
                    <div className="fs-1 mb-2">🛒</div>
                    <h4 className="fw-bold text-muted">Your basket is empty</h4>
                    <p className="text-muted small">Looks like you haven't added premium items to your cart selection yet.</p>
                    <Link to="/shop" className="btn btn-warning rounded-pill px-4 py-2 fw-bold mt-2 shadow-sm">Shop Now</Link>
                </div>
            ) : (
                <div className="row g-4">
                    {/* Basket Left items lists */}
                    <div className="col-lg-8">
                        <div className="d-flex flex-column gap-3">
                            {cartItems.map(item => (
                                <div key={item.id} className="card border-0 shadow-sm rounded-4 p-3 bg-body-tertiary">
                                    <div className="row g-3 align-items-center">
                                        <div className="col-3 col-sm-2">
                                            <img src={item.image} className="img-fluid rounded-3 object-fit-cover" style={{ height: '70px', width: '70px' }} alt={item.name} />
                                        </div>
                                        <div className="col-9 col-sm-5">
                                            <span className="badge bg-secondary-subtle text-muted small px-2 py-1 mb-1">{item.petType}</span>
                                            <h6 className="fw-bold mb-0 text-truncate">{item.name}</h6>
                                            <span className="text-warning fw-bold small">₹{item.discountPrice.toFixed(2)}</span>
                                        </div>
                                        <div className="col-6 col-sm-3 d-flex align-items-center gap-2">
                                            <button
                                                className="btn btn-sm btn-outline-secondary rounded-circle px-2"
                                                onClick={() => item.quantity > 1 ? dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 })) : dispatch(removeFromCart(item.id))}
                                            >
                                                -
                                            </button>
                                            <span className="fw-bold px-1 small">{item.quantity}</span>
                                            <button
                                                className="btn btn-sm btn-outline-secondary rounded-circle px-2"
                                                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div className="col-6 col-sm-2 text-end">
                                            <button onClick={() => dispatch(removeFromCart(item.id))} className="btn btn-link link-danger p-0 border-0 text-decoration-none small">
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Checkout Right Invoice pricing blocks */}
                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top bg-body" style={{ top: '100px' }}>
                            <h5 className="fw-bold mb-3">Order Abstract Summary</h5>
                            <div className="d-flex justify-content-between mb-2 small text-muted">
                                <span>Subtotal Items</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3 small text-muted">
                                <span>Expedited Shipping</span>
                                <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost.toFixed(2)}`}</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-4 fw-bold fs-5">
                                <span>Total Due</span>
                                <span className="text-warning">₹{totalAmount.toFixed(2)}</span>
                            </div>

                            {!showCheckout ? (
                                <button
                                    onClick={() => setShowCheckout(true)}
                                    className="btn btn-warning w-100 rounded-pill py-3 fw-bold shadow-sm"
                                >
                                    Proceed to Checkout Payment
                                </button>
                            ) : (
                                /* Payment form simulation interface */
                                <form onSubmit={handleCheckoutSubmit} className="border p-3 rounded-4 bg-light fade-in-element">
                                    <h6 className="fw-bold mb-3">💳 Sandbox Payment Terminal</h6>

                                    <div className="mb-2">
                                        <label className="form-label small text-muted text-uppercase fw-bold m-0" style={{ fontSize: '10px' }}>Card Number</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm rounded-pill"
                                            placeholder="4000 1234 5678 9010"
                                            value={cardNumber}
                                            onChange={(e) => setCardNumber(e.target.value)}
                                            disabled={processing}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label small text-muted text-uppercase fw-bold m-0" style={{ fontSize: '10px' }}>Expiry MM/YY</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm rounded-pill"
                                            placeholder="12/28"
                                            value={expiry}
                                            onChange={(e) => setExpiry(e.target.value)}
                                            disabled={processing}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-success w-100 btn-sm rounded-pill py-2 fw-bold"
                                        disabled={processing}
                                    >
                                        {processing ? 'Authorizing Assets...' : `Authorize Mock Payment of ₹${totalAmount.toFixed(2)}`}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setShowCheckout(false)}
                                        className="btn btn-link link-secondary w-100 btn-sm text-decoration-none mt-1 small"
                                        disabled={processing}
                                    >
                                        Cancel Payment
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}