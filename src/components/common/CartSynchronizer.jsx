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

            // Detectar si es un login nuevo
            const isNewLogin = previousUser === null && !isMounting.current;

            if (isMounting.current) {
                // Primera carga: intentar cargar del servidor si hay usuario (aunque será null sin persistencia)
                if (currentUser) {
                    dispatch(loadCartFromServer());
                }
                isMounting.current = false;
            } else if (isNewLogin) {
                if (cartItems.length > 0) {
                     // Login nuevo con items en memoria: sincronizar
                    dispatch(syncGuestCartToServer(cartItems));
                } else {
                     // Login nuevo sin items: cargar del servidor
                    dispatch(loadCartFromServer());
                }
            }
        } else {
            isMounting.current = false;
        }

        prevUserRef.current = currentUser;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, dispatch]);

    return null;
};

export default CartSynchronizer;
