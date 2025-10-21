import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../api';
import { useUser } from '../../context/UserContext';
import { useCart } from '../../context/CartContext';
import { useCheckoutValidation } from '../../hooks';
import ShippingForm from './ShippingForm';
import PaymentForm from './PaymentForm';
import Button from '../generico/Button';
import ErrorGenerico from '../generico/ErrorGenerico';

const CheckoutForm = () => {
    const { user } = useUser();
    const { clearCart } = useCart();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        address: '',
        cardNumber: '4532 1234 5678 9010',
        expiryDate: '12/25',
        cvv: '123'
    });
    
    const [isLoading, setIsLoading] = useState(false);
    
    // Hook de validación personalizado
    const { error, setError, validateForm, clearError } = useCheckoutValidation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Limpiar error al escribir
        if (error) clearError();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        clearError();

        if (!validateForm(formData)) {
            return;
        }

        setIsLoading(true);

        // Crear orden con estado PAID (pagada)
        const orderRequest = {
            address: formData.address,
            status: 'PAID'
        };

        createOrder(orderRequest)
            .then((order) => {
                console.log('✅ Orden creada exitosamente:', order);
                // Limpiar el carrito local (el backend ya lo limpió en el servidor)
                clearCart();
                // Redirigir a la página de órdenes con mensaje de éxito
                navigate('/perfil/orders', { 
                    state: { 
                        orderSuccess: true,
                        orderId: order.id 
                    } 
                });
            })
            .catch(err => {
                console.error('❌ Error al crear orden:', err);
                setError(err.message || 'Error al procesar el pago. Intenta de nuevo.');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleCancel = () => {
        navigate('/cart');
    };

    return (
        <div className="bg-white border-4 border-black p-8 rounded-lg shadow-[12px_12px_0_0_#FBBF24]">
            <h3 className="text-3xl font-bold mb-6 border-b-4 border-black pb-2">
                Información de Envío y Pago
            </h3>

            {error && <ErrorGenerico message={error} />}

            <form onSubmit={handleSubmit} className="space-y-6">
                <ShippingForm 
                    formData={formData}
                    onChange={handleChange}
                    isLoading={isLoading}
                />

                <div className="border-t-4 border-dashed border-black my-8"></div>

                <PaymentForm
                    formData={formData}
                    onChange={handleChange}
                    isLoading={isLoading}
                />

                {/* Botones */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <Button
                        type="submit"
                        variant="success"
                        disabled={isLoading}
                        className="flex-1 text-xl py-4"
                    >
                        {isLoading ? '⏳ Procesando...' : '💰 ¡Pagar y Realizar Pedido!'}
                    </Button>

                    <Button
                        type="button"
                        onClick={handleCancel}
                        variant="danger"
                        disabled={isLoading}
                        className="sm:w-auto"
                    >
                        Cancelar
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;
