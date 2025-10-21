import { useNavigate } from 'react-router-dom';

import { buildRoute } from '../../constants/routes';
import { isProductOnSale, isProductOutOfStock, calculateFinalPrice } from '../../utils/productHelpers';
import CardImage from './productCard/CardImage';
import CardPrice from './productCard/CardPrice';
import Button from '../generico/Button';
import DeleteProductButton from '../generico/DeleteProductButton';

const ProductCardSeller = ({ product, onDeleted }) => {
    const onSale = isProductOnSale(product);
    const outOfStock = isProductOutOfStock(product);
    const finalPrice = calculateFinalPrice(product.price, product.discount);
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(buildRoute.sellerProductEdit(product.id));
    };
    

    const handleViewDetail = () => {
        navigate(`/product/${product.id}`);
    };

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
                <h3 
                    className="text-2xl font-bold mb-2 hover:text-blue-600 transition-colors cursor-pointer"
                    onClick={handleViewDetail}
                >
                    {product.name}
                </h3>

                <CardPrice
                    price={finalPrice}
                    oldPrice={product.price}
                    onSale={onSale}
                />

                <div className="mb-3 p-2 bg-gray-100 border-2 border-gray-300 rounded">
                    <p className="text-sm font-semibold">
                        Stock: <span className={outOfStock ? 'text-red-600' : 'text-green-600'}>
                            {product.stock} unidades
                        </span>
                    </p>
                </div>

                <div className="flex flex-col gap-2 mt-auto">
                        <Button onClick={handleEdit} variant="primary">
                            Editar
                        </Button>

                        <DeleteProductButton productId={product.id} productName={product.name} onDeleted={onDeleted} />
                </div>
            </div>
        </div>
    );
};

export default ProductCardSeller;