import { Link } from 'react-router-dom';
import CardImage from './CardImage';
import CardPrice from './CardPrice';
import { isProductOnSale, isProductOutOfStock, calculateFinalPrice } from '../../utils/productHelpers';

const BaseProductCard = ({ product, children, onClickTitle }) => {
    const onSale = isProductOnSale(product);
    const outOfStock = isProductOutOfStock(product);
    const finalPrice = calculateFinalPrice(product.price, product.discount);

    const TitleComponent = onClickTitle ? (
        <h3
            className="text-2xl font-bold mb-2 hover:text-blue-600 transition-colors cursor-pointer"
            onClick={onClickTitle}
        >
            {product.name}
        </h3>
    ) : (
        <Link to={`/product/${product.id}`}>
            <h3 className="text-2xl font-bold mb-2 hover:text-blue-600 transition-colors cursor-pointer">
                {product.name}
            </h3>
        </Link>
    );

    return (
        <div className="bg-white border-4 border-black rounded-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 shadow-[8px_8px_0_0_#000] flex flex-col">
            <CardImage
                id={product.id}
                name={product.name}
                onSale={onSale}
                outOfStock={outOfStock}
                image={product.imageFile}
            />

            <div className="p-4 flex flex-col flex-grow">
                {TitleComponent}

                <CardPrice
                    price={finalPrice}
                    oldPrice={product.price}
                    onSale={onSale}
                />

                {children}
            </div>
        </div>
    );
};

export default BaseProductCard;
