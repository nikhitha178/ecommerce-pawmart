import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearAuthErrors } from '../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error } = useSelector(state => state.auth);

    // Wipe outstanding temporary global error state messages upon rendering layout
    useEffect(() => {
        dispatch(clearAuthErrors());
    }, [dispatch]);

    const handleRegisterSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            alert('Please populate all parameters.');
            return;
        }

        const newUserProfile = {
            id: Date.now().toString(),
            name,
            email,
            password, // Stored safely for simulated sandboxed framework structures
            joinedDate: new Date().toLocaleDateString()
        };

        dispatch(registerUser(newUserProfile));

        // If registration passes without hitting a duplicate record exception error flag, redirect
        setTimeout(() => {
            const currentUsers = JSON.parse(localStorage.getItem('app_registered_users')) || [];
            const checkSuccess = currentUsers.some(u => u.email === email);
            if (checkSuccess) {
                alert('Account generated successfully inside database layout index metrics!');
                navigate('/login');
            }
        }, 100);
    };

    return (
        <div className="container py-5 fade-in-element">
            <div className="card border-0 shadow-sm rounded-4 p-4 mx-auto" style={{ maxWidth: '450px' }}>
                <h3 className="fw-black mb-1">Create Account</h3>
                <p className="text-muted small mb-4">Register your client details to start purchasing products.</p>

                {error && <div className="alert alert-danger small py-2 rounded-3">{error}</div>}

                <form onSubmit={handleRegisterSubmit}>
                    <div className="mb-3">
                        <label className="form-label small fw-bold text-muted text-uppercase">Full Name</label>
                        <input type="text" className="form-control rounded-pill" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label small fw-bold text-muted text-uppercase">Email Address</label>
                        <input type="email" className="form-control rounded-pill" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@example.com" />
                    </div>
                    <div className="mb-4">
                        <label className="form-label small fw-bold text-muted text-uppercase">Security Password</label>
                        <input type="password" className="form-control rounded-pill" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
                    </div>

                    <button type="submit" className="btn btn-warning w-100 rounded-pill py-2.5 fw-bold shadow-sm mb-3">
                        Register Credentials
                    </button>
                </form>

                <div className="text-center small text-muted">
                    Already registered? <Link to="/login" className="text-warning fw-bold text-decoration-none">Sign In Here</Link>
                </div>
            </div>
        </div>
    );
}