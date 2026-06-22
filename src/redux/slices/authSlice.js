import { createSlice } from '@reduxjs/toolkit';

// Check if a registered database index list already exists in localStorage
const storedUsers = JSON.parse(localStorage.getItem('app_registered_users')) || [];
const activeSession = JSON.parse(localStorage.getItem('app_active_session')) || null;

const initialState = {
    registeredUsers: storedUsers, 
    user: activeSession,           // ✅ FIXED: Changed currentUser to user to match Navbar.jsx selector mapping rules
    isAuthenticated: !!activeSession,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        registerUser: (state, action) => {
            const { email } = action.payload;
            
            // Core safety check: ensure email uniqueness registry rules
            const exists = state.registeredUsers.some(user => user.email === email);
            if (exists) {
                state.error = "An account with this email structure already exists.";
                return;
            }

            // Append new user to state arrays
            state.registeredUsers.push(action.payload);
            state.error = null;

            // Commit permanently to browser LocalStorage array lists
            localStorage.setItem('app_registered_users', JSON.stringify(state.registeredUsers));
        },
        loginUser: (state, action) => {
            const { email, password } = action.payload;
            const validUser = state.registeredUsers.find(
                user => user.email === email && user.password === password
            );

            if (validUser) {
                state.user = validUser; // ✅ Updated property alignment assignments
                state.isAuthenticated = true;
                state.error = null;
                // Set active user verification token strings
                localStorage.setItem('app_active_session', JSON.stringify(validUser));
            } else {
                state.error = "Invalid email credentials match profile patterns.";
            }
        },
        logoutSuccess: (state) => {
            state.user = null; // ✅ Updated property alignment assignments
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem('app_active_session');
        },
        clearAuthErrors: (state) => {
            state.error = null;
        }
    }
});

export const { registerUser, loginUser, logoutSuccess, clearAuthErrors } = authSlice.actions;
export default authSlice.reducer;