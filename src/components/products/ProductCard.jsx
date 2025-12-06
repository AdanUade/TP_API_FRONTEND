import BaseProductCard from './BaseProductCard';
import Button from '../common/Button';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { isProductOutOfStock } from '../../utils/productHelpers';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const outOfStock = isProductOutOfStock(product);

    const handleAddToCart = () => {
        const result = dispatch(addToCart({ product, image: product.imageFile }));
        if (result && result.error) {
            toast.error(result.error);
        } else {
            toast.success(`¡${product.name} añadido al carrito! 🛒`);
        }
    };

    return (
        <BaseProductCard product={product}>
            <div className="mt-auto">
                <Button onClick={handleAddToCart} disabled={outOfStock}>
                    {outOfStock ? 'Agotado' : '¡Añadir al Carrito!'}
                </Button>
            </div>
        </BaseProductCard>
    );
};

export default ProductCard;