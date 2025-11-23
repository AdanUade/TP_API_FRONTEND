import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCartFromServer, syncGuestCartToServer, setCartItems } from "../../store/cartSlice";

const CartSynchronizer = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const { items: cartItems } = useSelector(state => state.cart);
    const isMounting = useRef(true);

    useEffect(() => {
        if (user) {
            if (user.rol === 'SELLER' || user.rol === 'ADMIN') {
                dispatch(setCartItems([]));
                return;
            }

            // Si es el montaje inicial y tenemos usuario (persisted), asumimos que la sesión se restauró.
            // En este caso, NO sincronizamos el carrito local como "guest", sino que cargamos del servidor
            // para evitar duplicaciones o re-envíos innecesarios.
            if (isMounting.current) {
                dispatch(loadCartFromServer());
                isMounting.current = false;
                return;
            }

            // Si el usuario CAMBIA (login explícito), ahí sí sincronizamos el carrito guest.
            if (cartItems.length > 0) {
                 dispatch(syncGuestCartToServer(cartItems));
            } else {
                dispatch(loadCartFromServer());
            }
        } else {
             // Guest user: Do not clear cart on mount to allow persistence.
             // Only clear if explicit logout logic handles it, or if we want fresh start sessions.
             // With redux-persist, we want to keep guest cart.
             isMounting.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, dispatch]);

    return null;
};

export default CartSynchronizer;
