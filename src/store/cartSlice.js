import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import * as CartApi from '../api/CartApi';
import { adaptServerItemToLocal, calculateCartTotal, calculateTotalItems, calculateTotalSavings } from '../utils/cartHelpers';
import { logoutUser } from './userSlice';

export const loadCartFromServer = createAsyncThunk(
    'cart/loadCartFromServer',
    async (_, { getState }) => {
        const user = getState().user.user;
        if (!user) return [];

        const serverCart = await CartApi.viewCart();
        if (serverCart.items && serverCart.items.length > 0) {
            return serverCart.items.map(adaptServerItemToLocal);
        }
        return [];
    }
);

export const syncGuestCartToServer = createAsyncThunk(
    'cart/syncGuestCartToServer',
    async (guestItems, { getState, dispatch }) => {
        const user = getState().user.user;
        if (!guestItems || guestItems.length === 0 || !user) return;

        // Recorremos los items locales y los subimos uno por uno
        for (const item of guestItems) {
            await CartApi.addToCart(item.id, item.quantity);
        }
        // Al final, recargamos el carrito completo del servidor (fusión final)
        dispatch(loadCartFromServer());
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        isSyncing: false,
        error: null,
    },
    reducers: {
        setCartItems: (state, action) => {
            state.items = action.payload;
        },
        localAddToCart: (state, action) => {
            const { product, image, quantity } = action.payload;
            const existingItem = state.items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({ ...product, image, quantity });
            }
        },
        localRemoveFromCart: (state, action) => {
            const productId = action.payload;
            state.items = state.items.filter(item => item.id !== productId);
        },
        localUpdateQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            if (quantity < 1) {
                state.items = state.items.filter(item => item.id !== productId);
            } else {
                const item = state.items.find(item => item.id === productId);
                if (item) item.quantity = quantity;
            }
        },
        localClearCart: (state) => {
            state.items = [];
        },
        setIsSyncing: (state, action) => {
            state.isSyncing = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadCartFromServer.pending, (state) => {
                state.isSyncing = true;
                state.error = null;
            })
            .addCase(loadCartFromServer.fulfilled, (state, action) => {
                state.items = action.payload;
                state.isSyncing = false;
            })
            .addCase(loadCartFromServer.rejected, (state, action) => {
                state.isSyncing = false;
                state.error = action.payload;
            })
            .addCase(syncGuestCartToServer.pending, (state) => {
                state.isSyncing = true;
                state.error = null;
            })
            .addCase(syncGuestCartToServer.fulfilled, (state) => {
                state.isSyncing = false;
            })
            .addCase(syncGuestCartToServer.rejected, (state, action) => {
                state.isSyncing = false;
                state.error = action.payload;
            })
            // Limpiar carrito al hacer logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.items = [];
                state.isSyncing = false;
                state.error = null;
            });
    }
});

export const { setCartItems, localAddToCart, localRemoveFromCart, localUpdateQuantity, localClearCart, setIsSyncing } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;

export const selectCartTotal = createSelector(
    [selectCartItems],
    (items) => calculateCartTotal(items)
);

export const selectTotalItems = createSelector(
    [selectCartItems],
    (items) => calculateTotalItems(items)
);

export const selectCartSavings = createSelector(
    [selectCartItems],
    (items) => calculateTotalSavings(items)
);

// Thunks
export const addToCart = ({ product, image, quantity = 1 }) => (dispatch, getState) => {
    const state = getState();
    const user = state.user.user;

    if (user && (user.rol === 'SELLER' || user.rol === 'ADMIN')) return;

    // Verificar stock disponible
    const existingItem = state.cart.items.find(item => item.id === product.id);
    const currentQuantity = existingItem ? existingItem.quantity : 0;
    const newTotalQuantity = currentQuantity + quantity;

    if (newTotalQuantity > product.stock) {
        const remaining = product.stock - currentQuantity;
        if (remaining <= 0) {
            return { error: 'Stock máximo alcanzado' };
        }
        return { error: `Solo puedes agregar ${remaining} unidad(es) más` };
    }

    dispatch(localAddToCart({ product, image, quantity }));

    if (user) {
        CartApi.addToCart(product.id, quantity)
            .catch(err => {
                console.error('Error al sincronizar:', err);
                dispatch(loadCartFromServer());
            });
    }
};

export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch(localRemoveFromCart(productId));
    const user = getState().user.user;

    if (user && user.rol !== 'SELLER' && user.rol !== 'ADMIN') {
        CartApi.removeFromCart(productId)
            .then(() => dispatch(loadCartFromServer()))
            .catch(err => {
                console.error('Error al eliminar del servidor:', err);
                dispatch(loadCartFromServer());
            });
    }
};

export const updateQuantity = (productId, newQuantity) => (dispatch, getState) => {
    if (newQuantity < 1) {
        dispatch(removeFromCart(productId));
        return;
    }

    // We get the item from state to calculate difference
    const state = getState();
    const item = state.cart.items.find(i => i.id === productId);

    if (!item) return;

    const quantityDifference = newQuantity - item.quantity;

    dispatch(localUpdateQuantity({ productId, quantity: newQuantity }));

    const user = state.user.user;
    if (user && quantityDifference !== 0) {
        CartApi.updateCart(productId, quantityDifference)
            .then(serverCart => {
                if (serverCart.items) {
                    const adaptedItems = serverCart.items.map(adaptServerItemToLocal);
                    dispatch(setCartItems(adaptedItems));
                }
            })
            .catch(err => {
                console.error('Error al actualizar servidor:', err);
                dispatch(loadCartFromServer());
            });
    }
};

export const clearCart = () => (dispatch, getState) => {
    dispatch(localClearCart());
    const user = getState().user.user;
    if (user && user.rol !== 'SELLER' && user.rol !== 'ADMIN') {
        CartApi.clearCart()
            .catch(err => console.error('⚠️ Error al vaciar carrito:', err));
    }
};

export default cartSlice.reducer;
