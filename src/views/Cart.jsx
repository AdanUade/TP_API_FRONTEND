import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';
import PageTitle from '../components/page/PageTitle';
import CartItem from '../components/cart/CartItem';
import Button from '../components/generico/Button';
import ErrorGenerico from '../components/generico/ErrorGenerico';
import { formatPrice } from '../utils/formatters';
import { calculateTotalSavings } from '../utils/cartHelpers';

const Cart = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { cartItems, cartTotal } = useCart();
    const totalDiscount = calculateTotalSavings(cartItems);

    const handleCheckout = () => {
        if (!isAuthenticated) {
            // Guardar la ruta actual para redirigir después del login
            navigate('/login', { state: { from: '/checkout' } });
        } else {
            navigate('/checkout');
        }
    };

    return (
        <div>
            <PageTitle title="Tu Carrito de Compras" subtitle="¡El botín de tu última aventura!" />

            {cartItems.length === 0 ? (
                <ErrorGenerico
                    message="Tu carrito está más vacío que una ciudad después de una batalla." 
                    variant="page"
                    title="¡ZAP! Carrito Vacío"
                />
            ) : (
                <div className="bg-white border-4 border-black p-4 sm:p-6 shadow-[10px_10px_0_0_#1E90FF]">
                    {cartItems.map(item => (
                        <CartItem key={item.id} item={item} image={item.image} />
                    ))}

                    <div className="border-t-4 border-dashed border-black mt-6 pt-6">
                        
                        {totalDiscount > 0 && (
                            <div className="flex justify-between items-center mb-2 text-lg">
                                <span>Ahorro por descuentos:</span>
                                <span className="font-bold text-red-600">-{formatPrice(totalDiscount)}</span>
                            </div>
                        )}

                        <div className="flex justify-between items-center mb-6 border-t-2 border-black pt-2">
                            <span className="text-2xl font-bold uppercase">Total a Pagar:</span>
                            <span className="text-4xl font-bold text-green-600">{formatPrice(cartTotal)}</span>
                        </div>

                        {!isAuthenticated && (
                            <div className="mb-4 p-4 bg-yellow-100 border-2 border-yellow-500 rounded-md">
                                <p className="text-yellow-800 font-bold text-center">
                                    ⚠️ Debes iniciar sesión para finalizar tu compra
                                </p>
                            </div>
                        )}
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button 
                                onClick={() => navigate('/')} 
                                variant="secondary"
                                className="flex-1"
                            >
                                ↩ Seguir Comprando
                            </Button>
                            <Button 
                                onClick={handleCheckout} 
                                variant="success"
                                className="flex-1"
                            >
                                {isAuthenticated ? '¡Finalizar Compra!' : 'Iniciar Sesión para Comprar'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;