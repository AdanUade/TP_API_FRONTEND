import { Link } from 'react-router-dom';
import Button from '../../generico/Button';
import QuantitySelector from '../../generico/QuantitySelector';

/**
 * Sección de acciones del producto (cantidad, añadir al carrito, navegación)
 */
const ProductActions = ({ 
    quantity, 
    onQuantityChange, 
    onAddToCart, 
    isOutOfStock,
    onGoBack
}) => {
    return (
        <div className="flex flex-col gap-4">
            {!isOutOfStock && (
                <QuantitySelector
                    quantity={quantity}
                    onDecrease={() => onQuantityChange(quantity - 1)}
                    onIncrease={() => onQuantityChange(quantity + 1)}
                    size="large"
                    showLabel={true}
                />
            )}

            <div className="flex flex-col gap-3 mt-auto">
                <Button 
                    onClick={onAddToCart} 
                    disabled={isOutOfStock}
                    variant="success"
                    className="w-full !text-2xl !py-4"
                >
                    {isOutOfStock ? '❌ Agotado' : `¡Añadir ${quantity} al Carrito!`}
                </Button>
                
                <div className="flex gap-3">
                    <Button 
                        onClick={onGoBack} 
                        variant="secondary"
                        className="flex-1"
                    >
                        ← Volver
                    </Button>
                    <Link to="/cart" className="flex-1">
                        <Button variant="primary" className="w-full">
                            Ver Carrito
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductActions;
