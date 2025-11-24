import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PageTitle from '../../components/page/PageTitle';
import CheckoutForm from '../../components/order/CheckoutForm';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorGenerico from '../../components/common/ErrorGenerico';

const Checkout = () => {
    const { user, isLoading } = useSelector(state => state.user);
    const { items: cartItems } = useSelector(state => state.cart);
    const { success: orderSuccess } = useSelector(state => state.orders);
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar autenticación
        if (!isLoading && !user) {
            navigate('/login', { state: { from: '/checkout' } });
            return;
        }

        // Verificar que el carrito no esté vacío (solo si NO hay una orden exitosa)
        if (!isLoading && cartItems && cartItems.length === 0 && !orderSuccess) {
            navigate('/cart');
        }
    }, [user, isLoading, cartItems, navigate, orderSuccess]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!user) {
        return null;
    }

    if (!cartItems || cartItems.length === 0) {
        return (
            <ErrorGenerico
                title="Carrito Vacío"
                message="No tienes productos en el carrito para procesar el pago."
                variant="page"
            />
        );
    }

    return (
        <>
            <PageTitle
                title="Finalizar Compra"
                subtitle="Completa tu información para procesar el pedido"
            />
            <div className="max-w-3xl mx-auto">
                <CheckoutForm />
            </div>
        </>
    );
};

export default Checkout;
