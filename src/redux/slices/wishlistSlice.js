import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        items: JSON.parse(localStorage.getItem('wishlistItems')) || []
    },
    reducers: {
        toggleWishlist: (state, action) => {
            const index = state.items.findIndex(i => i.id === action.payload.id);
            if (index >= 0) {
                state.items.splice(index, 1);
            } else {
                state.items.push(action.payload);
            }
            localStorage.setItem('wishlistItems', JSON.stringify(state.items));
        }
    }
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;