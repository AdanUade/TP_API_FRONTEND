import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import orderReducer from './orderSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['user', 'cart'], // Only persist user and cart
    // products and orders should be fetched fresh
};

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    products: productReducer,
    orders: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
