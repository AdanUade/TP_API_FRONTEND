import { PriceDisplay, StockStatus } from '../common';

const ProductInfo = ({ product, finalPrice, oldPrice, discount, isOutOfStock, onSale }) => {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-4xl lg:text-5xl font-extrabold uppercase">
                {product.name}
            </h2>
            
            <PriceDisplay 
                finalPrice={finalPrice}
                originalPrice={oldPrice}
                discount={discount}
                size="large"
                showBadge={true}
            />

            <div className="p-4 bg-gray-50 border-2 border-black rounded-md">
                <h3 className="text-2xl font-bold mb-2 uppercase">Descripción:</h3>
                <p className="text-lg leading-relaxed font-sans text-gray-700">
                    {product.description || 'Este increíble producto te hará sentir como un verdadero superhéroe. ¡No te lo pierdas!'}
                </p>
            </div>
            
            <StockStatus stock={product.stock} lowStockThreshold={5} />
        </div>
    );
};

export default ProductInfo;
