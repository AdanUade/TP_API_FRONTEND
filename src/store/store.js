import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import orderReducer from './orderSlice';
import usersReducer from './usersSlice';

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    products: productReducer,
    orders: orderReducer,
    adminUsers: usersReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});
