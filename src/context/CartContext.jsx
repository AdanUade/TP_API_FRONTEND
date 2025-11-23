import { createContext, useState, useContext, useMemo, useEffect, useCallback } from 'react'
import { useUser } from './UserContext';
import * as CartApi from '../api/CartApi';
import { 
    calculateCartTotal, 
    calculateTotalItems, 
    adaptServerItemToLocal 
} from '../utils/cartHelpers';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
    };

export const CartProvider = ({ children }) => {
const { user } = useUser();
const [cartItems, setCartItems] = useState([]);
const [isSyncing, setIsSyncing] = useState(false);

const syncGuestCartToServer = useCallback(async (guestItems) => {
    if (!guestItems || guestItems.length === 0 || !user) return;

    setIsSyncing(true);

    try {
        await CartApi.clearCart();

        for (const item of guestItems) {
            await CartApi.addToCart(item.id, item.quantity);
        }
        await loadCartFromServer();
    } catch (err) {
        console.error('❌ Error al sincronizar carrito:', err);
    } finally {
        setIsSyncing(false);
    }
}, [user]);

const loadCartFromServer = useCallback(() => {
    if (!user) {
        return Promise.resolve();
    }

    setIsSyncing(true);
    return CartApi.viewCart()
        .then(serverCart => {
            
            if (serverCart.items && serverCart.items.length > 0) {
                const adaptedItems = serverCart.items.map(adaptServerItemToLocal);
                setCartItems(adaptedItems);
            } else {
                setCartItems([]);
            }
        })
        .catch(err => {
            console.error('Error al cargar carrito del servidor:', err);
        })
        .finally(() => {
            setIsSyncing(false);
        });
}, [user]); // Dependencia: solo se recrea si user cambia

const syncWithBackend = (action, productId, quantity) => {
    if (!user || user.rol === 'SELLER' || user.rol === 'ADMIN') {
        return Promise.resolve();
    }

    switch (action) {
        case 'add':
            return CartApi.addToCart(productId, quantity)
                .then((response) => {
                })
                .catch(err => {
                    console.error('Error al sincronizar:', err);
                    loadCartFromServer();
                });
        
        case 'update':
            return CartApi.updateCart(productId, quantity)
                .then(serverCart => {
                    if (serverCart.items) {
                        const adaptedItems = serverCart.items.map(adaptServerItemToLocal);
                        setCartItems(adaptedItems);
                    }
                })
                .catch(err => {
                    console.error('Error al actualizar servidor:', err);
                    loadCartFromServer();
                });
        
        case 'remove':
            return CartApi.removeFromCart(productId)
                .then(() => {
                    return loadCartFromServer();
                })
                .catch(err => {
                    console.error('Error al eliminar del servidor:', err);
                    loadCartFromServer();
                });
        
        default:
            return Promise.resolve();
    }
};

    useEffect(() => {
        if (user) {
            if (user.rol === 'SELLER' || user.rol === 'ADMIN') {
                setCartItems([]); // Asegurar que esté vacío
                return;
            }

            setCartItems(prevItems => {
                if (prevItems.length > 0) {
                    syncGuestCartToServer(prevItems);
                } else {
                    loadCartFromServer();
                }
                return prevItems; // No modificar el estado aquí
            });
        } else {
            setCartItems([]);
        }
    }, [user]); // Solo depende de user para evitar loops infinitos

const addToCart = (productToAdd, image, quantityToAdd = 1) => {
    if (user && (user.rol === 'SELLER' || user.rol === 'ADMIN')) {
        return;
    }
    
    setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === productToAdd.id);

        if (existingItem) {
            return prevItems.map(item =>
                item.id === productToAdd.id
                ? { ...item, quantity: item.quantity + quantityToAdd }
                : item
            );
        } else {
            return [...prevItems, { ...productToAdd, image, quantity: quantityToAdd }];
        }
    });

    if (user) {
        syncWithBackend('add', productToAdd.id, quantityToAdd);
    }
};

const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    
    syncWithBackend('remove', productId);
};

const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }

    const currentItem = cartItems.find(item => item.id === productId);
    if (!currentItem) return;
    
    const currentQuantity = currentItem.quantity;
    const quantityDifference = newQuantity - currentQuantity;

    setCartItems(prevItems =>
        prevItems.map(item =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
        )
    );

    if (user && quantityDifference !== 0) {
        syncWithBackend('update', productId, quantityDifference);
    }
};

const totalItemCount = useMemo(() => {
    return calculateTotalItems(cartItems);
}, [cartItems]);

const cartTotal = useMemo(() => {
    return calculateCartTotal(cartItems);
}, [cartItems]);

const clearCart = () => {
    setCartItems([]);
    
    if (user && user.rol !== 'SELLER' && user.rol !== 'ADMIN') {
        CartApi.clearCart()
            .then()
            .catch(err => console.error('⚠️ Error al vaciar carrito:', err));
    }
};

const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItemCount,
    cartTotal,
    isSyncing,
};
return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};