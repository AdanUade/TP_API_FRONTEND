import { formatPrice } from '../../utils/formatters';
import { getDiscountPercentage } from '../../utils/productHelpers';

const PriceDisplay = ({ 
    finalPrice, 
    originalPrice, 
    discount, 
    size = 'large',
    showBadge = true 
}) => {
    const onSale = discount < 1;
    const discountPercentage = getDiscountPercentage(originalPrice, discount);
    
    const sizes = {
        small: {
            price: 'text-2xl',
            oldPrice: 'text-xl',
            badge: 'text-sm px-2 py-1'
        },
        medium: {
            price: 'text-3xl',
            oldPrice: 'text-2xl',
            badge: 'text-base px-3 py-1'
        },
        large: {
            price: 'text-5xl',
            oldPrice: 'text-3xl',
            badge: 'text-lg px-3 py-1'
        }
    };

    const sizeClasses = sizes[size] || sizes.large;

    return (
        <div className="flex items-baseline gap-4 flex-wrap">
            <p className={`${sizeClasses.price} font-bold ${onSale ? 'text-red-600' : 'text-gray-900'}`}>
                {formatPrice(finalPrice)}
            </p>
            {onSale && (
                <>
                    <p className={`${sizeClasses.oldPrice} text-gray-500 line-through`}>
                        {formatPrice(originalPrice)}
                    </p>
                    {showBadge && (
                        <span className={`bg-red-600 text-white font-bold ${sizeClasses.badge} rounded-md`}>
                            -{discountPercentage}%
                        </span>
                    )}
                </>
            )}
        </div>
    );
};

export default PriceDisplay;
