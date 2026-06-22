import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-dark text-white pt-5 pb-4 mt-5">
            <div className="container text-center text-md-start">
                <div className="row">
                    <div className="col-md-4 col-lg-4 col-xl-3 mx-auto mb-4">
                        <h5 className="text-uppercase fw-bold text-warning mb-4">🐾 PawMart</h5>
                        <p className="small text-white-50">Premium e-commerce platform dedicated exclusively to serving high-end pet operational dynamics and gourmet nutrition provisions.</p>
                    </div>
                    <div className="col-md-4 col-lg-2 col-xl-2 mx-auto mb-4">
                        <h6 className="text-uppercase fw-bold mb-4">Customer Care</h6>
                        <ul className="list-unstyled small text-white-50 lh-lg">
                            <li>Track Order Shipments</li>
                            <li>Returns & Exchange Policies</li>
                            <li>Corporate Store Locator</li>
                        </ul>
                    </div>
                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                        <h6 className="text-uppercase fw-bold mb-4">Contact Gateway</h6>
                        <p className="small text-white-50 mb-2">📍 Suite 404, Pet Haven District</p>
                        <p className="small text-white-50 mb-2">📧 corporate@pawmart.example.com</p>
                    </div>
                </div>
                <hr className="bg-white my-4 opacity-25" />
                <div className="text-center small text-white-50">
                    © 2026 PawMart Pet Store System. Built Portfolio Ready with Premium Clean Architectural Layouts.
                </div>
            </div>
        </footer>
    );
}