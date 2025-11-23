import CartIcon from '../../assets/icons/cart-icon.svg?react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { calculateTotalItems } from '../../utils/cartHelpers.js';

const CartHeader = () => {
const { items } = useSelector(state => state.cart);
const totalItemCount = useMemo(() => calculateTotalItems(items), [items]);

return (
    <Link to="/cart" className="relative cursor-pointer group">
        <CartIcon className="w-8 h-8 fill-white group-hover:fill-yellow-400 transition-colors" />
        {totalItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-black">
            {totalItemCount}
            </span>
        )}
    </Link>
);
};

export default CartHeader;