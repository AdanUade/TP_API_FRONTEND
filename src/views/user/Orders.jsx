import PageTitle from "../../components/page/PageTitle";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "../../store/orderSlice";
import ErrorGenerico from "../../components/generico/ErrorGenerico";
import LoadingSpinner from "../../components/generico/LoadingSpinner";
import ItemOrder from "../../components/order/ItemOrder";

const Orders = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { items: orderList, isLoading, error } = useSelector(state => state.orders);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        // Mostrar mensaje de éxito si viene del checkout
        if (location.state?.orderSuccess) {
            setShowSuccess(true);
            // Ocultar después de 5 segundos
            setTimeout(() => setShowSuccess(false), 5000);
        }

        dispatch(fetchMyOrders());
    }, [location, dispatch]);

    return (
        <>
        <PageTitle title="Mis Pedidos" subtitle="Revisa el estado de tus pedidos" />
        
        {showSuccess && (
            <div className="mb-6 p-6 bg-green-100 border-4 border-green-500 rounded-lg shadow-[8px_8px_0_0_#15803d] animate-bounce">
                <p className="text-2xl font-bold text-green-700 text-center mb-2">
                    🎉 ¡Pedido Realizado con Éxito!
                </p>
                <p className="text-green-600 text-center">
                    Tu orden #{location.state?.orderId} ha sido procesada correctamente.
                </p>
            </div>
        )}

        {isLoading && <LoadingSpinner />}
        {error && <ErrorGenerico title="Error" message={error} variant="page" />}
        {!isLoading && !error && orderList.length === 0 && (
            <ErrorGenerico 
                title="No hay pedidos"
                message="Parece que no has realizado ningún pedido todavía."
                variant="page"
            />
        )}
        {orderList.map(order => (
            <ItemOrder key={order.id} order={order} />
        ))}
        </>
    );
};

export default Orders;