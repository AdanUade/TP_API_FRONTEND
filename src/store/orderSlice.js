import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as OrderApi from '../api/OrderApi';

export const fetchMyOrders = createAsyncThunk(
    'orders/fetchMyOrders',
    async () => {
        const response = await OrderApi.getMyOrders();
        return response;
    }
);

export const fetchOrderById = createAsyncThunk(
    'orders/fetchOrderById',
    async (id) => {
        const response = await OrderApi.getMyOrderById(id);
        return response;
    }
);

export const createNewOrder = createAsyncThunk(
    'orders/createOrder',
    async (orderData) => {
        const response = await OrderApi.createOrder(orderData);
        return response;
    }
);

const initialState = {
    items: [],
    currentOrder: null,
    isLoading: false,
    error: null,
    success: false
};

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        clearCurrentOrder: (state) => {
            state.currentOrder = null;
        },
        clearOrderError: (state) => {
            state.error = null;
        },
        resetOrderSuccess: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch My Orders
            .addCase(fetchMyOrders.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchMyOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchMyOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Fetch Order By ID
            .addCase(fetchOrderById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentOrder = action.payload;
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Create Order
            .addCase(createNewOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createNewOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentOrder = action.payload;
                state.success = true;
                // Add new order to list if it exists
                if (state.items) {
                    state.items.unshift(action.payload);
                }
            })
            .addCase(createNewOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.success = false;
            });
    }
});

export const { clearCurrentOrder, clearOrderError, resetOrderSuccess } = orderSlice.actions;
export default orderSlice.reducer;
