import { useCart } from '../../context/CartContext';
import {QuantitySelector, PriceDisplay, Button} from '../generico'
import CardImage from '../products/productCard/CardImage';
import { formatPrice,calculateItemPrice, calculateItemSubtotal } from '../../utils';

const CartItem = ({ item, image }) => {
    const { updateQuantity, removeFromCart } = useCart();
    const onSale = item.discount < 1;
    const finalPrice = calculateItemPrice(item);
    const subtotal = calculateItemSubtotal(item);

    return (
    <div className="flex flex-col sm:flex-row justify-between items-center border-b-2 border-black py-4 gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="border-2 border-black rounded-md overflow-hidden">
                <CardImage
                    id={item.id}
                    image={image}
                    name={item.name}
                    size="small"
                />
            </div>
            
            <div>
                <h3 className="text-2xl font-bold flex items-center gap-3">
                    {item.name}
                    {onSale && (
                        <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full border-2 border-black">
                            ¡OFERTA!
                        </span>
                    )}
                </h3>

                <div className="mt-1">
                    <PriceDisplay 
                        finalPrice={finalPrice}
                        originalPrice={item.price}
                        discount={item.discount}
                        size="small"
                        showBadge={false}
                    />
                    <span className="text-sm font-sans text-gray-600"> c/u</span>
                </div>
            </div>
        </div>

        <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-6">
            <QuantitySelector
                quantity={item.quantity}
                onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
            />
            <div className="flex items-center gap-4">
                <p className="text-2xl font-bold w-24 text-right">{formatPrice(subtotal)}</p>
                <Button 
                    onClick={() => removeFromCart(item.id)} 
                    variant="danger"
                    className="!w-10 !h-10 !p-2 rounded-full !text-xl flex items-center justify-center cursor-pointer"
                >
                    X
                </Button>
            </div>
        </div>
    </div>
    );
};

export default CartItem;
