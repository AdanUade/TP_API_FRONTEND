import { useNavigate } from 'react-router-dom';
import { buildRoute } from '../../constants/routes';
import { isProductOutOfStock } from '../../utils/productHelpers';
import BaseProductCard from './BaseProductCard';
import Button from '../common/Button';
import DeleteProductButton from '../common/DeleteProductButton';

const ProductCardSeller = ({ product, onDeleted }) => {
    const outOfStock = isProductOutOfStock(product);
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(buildRoute.sellerProductEdit(product.id));
    };
    
    const handleViewDetail = () => {
        navigate(`/product/${product.id}`);
    };

    return (
        <BaseProductCard product={product} onClickTitle={handleViewDetail}>
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
        </BaseProductCard>
    );
};

export default ProductCardSeller;