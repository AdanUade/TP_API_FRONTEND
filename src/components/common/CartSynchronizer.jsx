import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCartFromServer, syncGuestCartToServer, setCartItems } from "../../store/cartSlice";

const CartSynchronizer = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const { items: cartItems } = useSelector(state => state.cart);

    useEffect(() => {
        if (user) {
            if (user.rol === 'SELLER' || user.rol === 'ADMIN') {
                dispatch(setCartItems([]));
                return;
            }

            if (cartItems.length > 0) {
                 dispatch(syncGuestCartToServer(cartItems));
            } else {
                dispatch(loadCartFromServer());
            }
        } else {
             dispatch(setCartItems([]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, dispatch]);

    return null;
};

export default CartSynchronizer;
