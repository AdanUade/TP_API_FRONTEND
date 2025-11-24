import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCartFromServer, syncGuestCartToServer, setCartItems } from "../../store/cartSlice";

const CartSynchronizer = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const { items: cartItems } = useSelector(state => state.cart);
    const isMounting = useRef(true);
    const prevUserRef = useRef(null);

    useEffect(() => {
        // Usuario actual
        const currentUser = user;
        const previousUser = prevUserRef.current;

        if (currentUser) {
            // Si es SELLER o ADMIN, limpiar carrito
            if (currentUser.rol === 'SELLER' || currentUser.rol === 'ADMIN') {
                dispatch(setCartItems([]));
                prevUserRef.current = currentUser;
                return;
            }

            // Detectar si es un LOGIN NUEVO (no una restauración de Redux Persist)
            const isNewLogin = previousUser === null && !isMounting.current;

            if (isMounting.current) {
                // Primera carga: solo cargar del servidor
                dispatch(loadCartFromServer());
                isMounting.current = false;
            } else if (isNewLogin && cartItems.length > 0) {
                // Login nuevo con carrito guest: sincronizar
                dispatch(syncGuestCartToServer(cartItems));
            } else if (isNewLogin) {
                // Login nuevo sin carrito guest: cargar del servidor
                dispatch(loadCartFromServer());
            }
        } else {
            // Usuario guest: mantener carrito en localStorage
            isMounting.current = false;
        }

        prevUserRef.current = currentUser;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, dispatch]);

    return null;
};

export default CartSynchronizer;
