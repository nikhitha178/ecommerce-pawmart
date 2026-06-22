import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Track() {
    // 1. Pull the user's cart state to see if they just initialized an empty layout context
    const cartItems = useSelector(state => state.cart.cartItems);

    // Explicit toggle switch control for the optional simulated static tracking workflow block
    const [showDemo, setShowDemo] = useState(true);

    return (
        <div className="container py-5 fade-in-element">
            <h2 className="fw-black mb-2">Order Logistics Tracking</h2>
            <p className="text-muted mb-4">Monitor real-time updates and localized distribution handling statuses for your premium pet goods packages.</p>

            <div className="row g-4">
                {/* Main Logic Guard Alert Flag Banner */}
                <div className="col-12">
                    <div className="alert alert-secondary bg-light border rounded-4 p-4 mb-2 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                        <div>
                            <h5 className="fw-bold mb-1 text-dark">📋 Live Order Repository Query</h5>
                            <p className="text-muted small mb-0">
                                There aren't any active live shipments assigned under your account profile credentials at this very moment.
                            </p>
                        </div>
                        <Link to="/shop" className="btn btn-warning btn-sm rounded-pill px-4 py-2 fw-bold text-nowrap align-self-start align-self-md-center">
                            Browse Catalogue
                        </Link>
                    </div>
                </div>

                {/* Sandbox Mock Interactive Panel Layout */}
                {showDemo && (
                    <div className="col-lg-8 mx-auto mt-4">
                        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                            <div className="bg-warning p-4 text-dark d-flex justify-content-between align-items-center">
                                <div>
                                    <span className="badge bg-dark text-white rounded-pill mb-2 px-3 py-1 text-uppercase fw-bold" style={{ fontSize: '10px' }}>Simulated Sandbox Environment</span>
                                    <h4 className="fw-black mb-1">Package ID: #PET-88204-IN</h4>
                                    <p className="mb-0 small opacity-75">Estimated Fulfillment: Handing off to local hub courier shortly</p>
                                </div>
                                <button
                                    onClick={() => setShowDemo(false)}
                                    className="btn btn-sm btn-outline-dark rounded-circle fw-bold"
                                    style={{ width: '32px', height: '32px', lineHeight: '15px' }}
                                    title="Dismiss Simulated Demo"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="card-body p-4 bg-body">
                                {/* Horizontal or Vertical Timeline Node Graph Chain */}
                                <div className="position-relative ps-4 border-start border-2 border-warning ms-2 my-3">

                                    {/* Node 1 */}
                                    <div className="mb-4 position-relative">
                                        <div className="position-absolute bg-warning rounded-circle shadow-sm" style={{ width: '16px', height: '16px', left: '-35px', top: '4px' }}></div>
                                        <h6 className="fw-bold text-warning mb-1">Dispatched for Local Delivery Route</h6>
                                        <p className="text-muted small mb-0">The order has been systematically scanned out of our localized distribution warehouse center hubs.</p>
                                        <span className="text-muted small tracking-wide font-monospace" style={{ fontSize: '11px' }}>June 22, 2026 - 09:30 AM</span>
                                    </div>

                                    {/* Node 2 */}
                                    <div className="mb-4 position-relative">
                                        <div className="position-absolute bg-warning rounded-circle shadow-sm" style={{ width: '16px', height: '16px', left: '-35px', top: '4px' }}></div>
                                        <h6 className="fw-bold text-dark mb-1">Invoice Authorization Handshake Sequence</h6>
                                        <p className="text-muted small mb-0">Electronic gateway records confirmed valid payment clearing protocols successfully.</p>
                                        <span className="text-muted small tracking-wide font-monospace" style={{ fontSize: '11px' }}>June 22, 2026 - 09:28 AM</span>
                                    </div>

                                    {/* Node 3 */}
                                    <div className="position-relative">
                                        <div className="position-absolute bg-secondary rounded-circle shadow-sm" style={{ width: '16px', height: '16px', left: '-35px', top: '4px' }}></div>
                                        <h6 className="fw-bold text-muted mb-1">Order Placement Registry Checked</h6>
                                        <p className="text-muted small mb-0">System core generated operational indexing sequence structures inside database server arrays.</p>
                                        <span className="text-muted small tracking-wide font-monospace" style={{ fontSize: '11px' }}>June 22, 2026 - 09:25 AM</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}