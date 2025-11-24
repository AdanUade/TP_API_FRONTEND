import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../store/cartSlice';
import { createNewOrder, resetOrderSuccess, clearOrderError } from '../../store/orderSlice';
import { useCheckoutValidation } from '../../hooks';
import ShippingForm from './ShippingForm';
import PaymentForm from './PaymentForm';
import Button from '../common/Button';
import ErrorGenerico from '../common/ErrorGenerico';
import { toast } from 'react-toastify';

const CheckoutForm = () => {
    const { user } = useSelector(state => state.user);
    const { isLoading, error: orderError, success, currentOrder } = useSelector(state => state.orders);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        address: '',
        cardNumber: '4532 1234 5678 9010',
        expiryDate: '12/25',
        cvv: '123'
    });
    
    // Hook de validación personalizado
    const { error: validationError, setError, validateForm, clearError } = useCheckoutValidation();

    // Reset success/error state on mount
    useEffect(() => {
        dispatch(resetOrderSuccess());
        dispatch(clearOrderError());
    }, [dispatch]);

    // Handle success
    useEffect(() => {
        if (success && currentOrder) {
             dispatch(clearCart());
             toast.success(`¡Orden #${currentOrder.id} creada exitosamente! 🎉`);
             navigate('/perfil/orders', {
                 state: {
                     orderSuccess: true,
                     orderId: currentOrder.id
                 }
             });
        }
    }, [success, currentOrder, dispatch, navigate]);

    // Handle API errors
    useEffect(() => {
        if (orderError) {
             console.error('❌ Error al crear orden:', orderError);
             const errorMessage = typeof orderError === 'string' ? orderError : 'Error al procesar el pago. Intenta de nuevo.';
             setError(errorMessage);
             toast.error(errorMessage);
        }
    }, [orderError, setError]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Limpiar error al escribir
        if (validationError) clearError();
        if (orderError) dispatch(clearOrderError());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        clearError();
        dispatch(clearOrderError());

        if (!validateForm(formData)) {
            return;
        }

        // Crear orden con estado PAID (pagada)
        const orderRequest = {
            address: formData.address,
            status: 'PAID'
        };

        dispatch(createNewOrder(orderRequest));
    };

    const handleCancel = () => {
        navigate('/cart');
    };

    return (
        <div className="bg-white border-4 border-black p-8 rounded-lg shadow-[12px_12px_0_0_#FBBF24]">
            <h3 className="text-3xl font-bold mb-6 border-b-4 border-black pb-2">
                Información de Envío y Pago
            </h3>

            {(validationError || orderError) && <ErrorGenerico message={validationError || (typeof orderError === 'string' ? orderError : 'Error en la orden')} />}

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
