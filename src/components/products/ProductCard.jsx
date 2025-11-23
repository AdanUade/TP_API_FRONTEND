import BaseProductCard from './BaseProductCard';
import Button from '../common/Button';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { isProductOutOfStock } from '../../utils/productHelpers';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const outOfStock = isProductOutOfStock(product);

    return (
        <BaseProductCard product={product}>
            <div className="mt-auto">
                <Button onClick={() => dispatch(addToCart({product, image: product.imageFile}))} disabled={outOfStock}>
                    {outOfStock ? 'Agotado' : '¡Añadir al Carrito!'}
                </Button>
            </div>
        </BaseProductCard>
    );
};

export default ProductCard;