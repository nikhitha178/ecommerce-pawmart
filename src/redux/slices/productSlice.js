import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        fetchProductsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchProductsSuccess: (state, action) => {
            state.items = action.payload;
            state.loading = false;
        },
        fetchProductsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Local CRUD Simulations
        createProduct: (state, action) => {
            state.items.push(action.payload);
        },
        updateProduct: (state, action) => {
            const index = state.items.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = { ...state.items[index], ...action.payload };
            }
        },
        deleteProduct: (state, action) => {
            state.items = state.items.filter(p => p.id !== action.payload);
        }
    }
});

export const {
    fetchProductsStart,
    fetchProductsSuccess,
    fetchProductsFailure,
    createProduct,
    updateProduct,
    deleteProduct
} = productSlice.actions;
export default productSlice.reducer;