import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeContext } from '../../context/ThemeContext';
import { logoutSuccess } from '../../redux/slices/authSlice'; // ✅ FIXED: Changed logoutUser to logoutSuccess

export default function Navbar() {
    const { darkMode, toggleTheme } = useContext(ThemeContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartItems = useSelector(state => state.cart.cartItems);
    const wishlistItems = useSelector(state => state.wishlist.items);
    const { isAuthenticated, user } = useSelector(state => state.auth);

    const totalCartCount = cartItems.reduce((acc, current) => acc + current.quantity, 0);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top border-bottom py-3 transition-all">
            <div className="container">
                <Link className="navbar-brand fw-extrabold fs-3 text-warning tracking-tight" to="/">
                    🐾 Paw<span className="text-body">Mart</span>
                </Link>

                <button className="navbar-collapse navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#pawmartNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="pawmartNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-semibold">
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/shop">Shop Catalogue</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/track">Track Order</Link></li>
                    </ul>

                    <div className="d-flex align-items-center gap-3">
                        <button onClick={toggleTheme} className="btn btn-outline-secondary rounded-circle p-2 border-0" title="Toggle UI Theme">
                            {darkMode ? '☀️' : '🌙'}
                        </button>

                        <Link to="/shop" className="btn btn-light rounded-pill border px-3 position-relative">
                            ❤️ <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{wishlistItems.length}</span>
                        </Link>

                        <Link to="/cart" className="btn btn-light rounded-pill border px-3 position-relative me-1">
                            🛒 Basket
                            {totalCartCount > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark text-light">
                                    {totalCartCount}
                                </span>
                            )}
                        </Link>

                        {isAuthenticated ? (
                            <div className="d-flex align-items-center gap-2 bg-warning-subtle py-1 ps-3 pe-1 rounded-pill border border-warning-subtle">
                                <span className="small fw-bold text-dark">{user?.avatar} {user?.name}</span>
                                {/* ✅ Now this safely calls the matched import function above */}
                                <button onClick={() => { dispatch(logoutSuccess()); navigate('/'); }} className="btn btn-warning btn-sm rounded-pill px-3 fw-bold shadow-sm">
                                    Exit
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="btn btn-warning rounded-pill px-4 fw-bold shadow-sm">
                                Login / Register
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}