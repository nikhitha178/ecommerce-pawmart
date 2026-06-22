import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// ✅ FIXED: Imported the exact matching functions exported by authSlice.js
import { loginUser, registerUser, clearAuthErrors } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearAuthErrors()); // ✅ FIXED: Pluralized function name match

    if (!email || !password || (!isLoginMode && !name)) {
      alert('Please fill out all required credentials.');
      return;
    }

    if (isLoginMode) {
      // 1. Process Real Login Validation Check Execution Rules
      dispatch(loginUser({ email, password }));

      // Check if login worked out by tracking local storage sessions securely
      setTimeout(() => {
        const sessionActive = localStorage.getItem('app_active_session');
        if (sessionActive) {
          navigate(-1); // Redirect back to previous page
        }
      }, 50);
    } else {
      // 2. Process Live Registration Profile Storage
      const newUserProfile = {
        id: Date.now().toString(),
        name,
        email,
        password,
        avatar: '🐾',
        joinedDate: new Date().toLocaleDateString()
      };

      dispatch(registerUser(newUserProfile));

      // Auto-toggle to login panel mode so users can instantly check credentials
      setTimeout(() => {
        const storedUsers = JSON.parse(localStorage.getItem('app_registered_users')) || [];
        const wasSaved = storedUsers.some(u => u.email === email);
        if (wasSaved) {
          alert('Account created perfectly inside browser registration metrics!');
          setIsLoginMode(true);
        }
      }, 50);
    }
  };

  return (
    <div className="container py-5 fade-in-element">
      <div className="card border-0 shadow-sm rounded-4 p-5 max-w-md mx-auto bg-body-tertiary" style={{ maxWidth: '450px' }}>
        <div className="text-center mb-4">
          <h2 className="fw-black">{isLoginMode ? 'Welcome Back' : 'Join PawMart'}</h2>
          <p className="text-muted small">
            {isLoginMode ? "Access your pet's premium personalized panel" : 'Create your pet parent profile today'}
          </p>
        </div>

        {error && (
          <div className="alert alert-danger rounded-3 small p-2 text-center" role="alert">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLoginMode && (
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted text-uppercase">Your Full Name</label>
              <input type="text" className="form-control rounded-pill" placeholder="Jane Doe" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label small fw-bold text-muted text-uppercase">Email Address</label>
            <input type="email" className="form-control rounded-pill" placeholder="parent@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="mb-4">
            <label className="form-label small fw-bold text-muted text-uppercase">Secure Password</label>
            <input type="password" className="form-control rounded-pill" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button type="submit" className="btn btn-warning w-100 rounded-pill py-3 fw-bold shadow-sm mb-3">
            {isLoginMode ? 'Sign Into Account' : 'Register Secure Profile'}
          </button>
        </form>

        <div className="text-center mt-3">
          {/* ✅ FIXED: Pluralized matching toggle clear error state method parameters */}
          <button onClick={() => { setIsLoginMode(!isLoginMode); dispatch(clearAuthErrors()); }} className="btn btn-link link-secondary small text-decoration-none">
            {isLoginMode ? "Don't have an account? Register here" : 'Already registered? Login here'}
          </button>
        </div>
      </div>
    </div>
  );
}