import { formatPrice } from '../../../utils';

const CardPrice = ({ price, oldPrice, onSale }) => (
    <div className="flex items-baseline mb-4 mt-auto">
        <p className={`text-3xl font-bold ${onSale ? 'text-red-600' : 'text-gray-900'}`}>
            {formatPrice(price)}
        </p>
        {onSale && (
            <p className="ml-2 text-xl text-gray-500 line-through">{formatPrice(oldPrice)}</p>
        )}
    </div>
);

export default CardPrice;