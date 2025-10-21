import { formatPrice, formatDateTime } from '../../utils/formatters';

const ItemOrder = ({ order }) => {
    // Formatear la fecha
    const formattedDate = formatDateTime(order.dateTime);

    // Obtener el color del badge según el estado
    const getStatusColor = (status) => {
        switch(status) {
            case 'PENDING':
                return 'bg-yellow-500 border-yellow-700';
            case 'PAID':
                return 'bg-green-500 border-green-700';
            case 'CANCELLED':
                return 'bg-red-500 border-red-700';
            default:
                return 'bg-gray-500 border-gray-700';
        }
    };

    // Traducir el estado
    const getStatusText = (status) => {
        switch(status) {
            case 'PENDING':
                return 'Pendiente';
            case 'PAID':
                return 'Pagado';
            case 'CANCELLED':
                return 'Cancelado';
            default:
                return status;
        }
    };

    return (
        <div className="bg-white border-4 border-black p-6 mb-4 rounded-lg shadow-[8px_8px_0_0_#1E90FF]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-4 border-dashed border-black pb-4 mb-4">
                <div>
                    <h4 className="text-3xl font-bold mb-2">📦 Pedido #{order.id}</h4>
                    <p className="font-sans text-lg text-gray-700">{formattedDate}</p>
                    <p className="font-sans text-md text-gray-600 mt-1">📍 {order.address}</p>
                </div>
                <div className={`${getStatusColor(order.status)} text-white font-bold py-2 px-4 border-b-4 rounded-lg text-lg mt-2 sm:mt-0`}>
                    {getStatusText(order.status)}
                </div>
            </div>
            
            <div className="space-y-2 mb-4">
                <h5 className="text-xl font-bold uppercase mb-3">Productos:</h5>
                <ul className="space-y-2">
                    {order.items && order.items.map((item) => (
                        <li key={item.id} className="flex justify-between items-center border-2 border-black p-3 rounded-md bg-gray-50">
                            <div className="flex-1">
                                <span className="font-bold text-lg">{item.productName || 'Producto'}</span>
                                <span className="text-gray-600 ml-2">x{item.count}</span>
                            </div>
                            <span className="font-bold text-lg">{formatPrice(item.subtotal)}</span>
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className="flex justify-between items-center border-t-4 border-black pt-4">
                <span className="text-2xl font-bold uppercase">Total:</span>
                <span className="text-4xl font-bold text-green-600">{formatPrice(order.totalPrice)}</span>
            </div>
        </div>
    );
};

export default ItemOrder;
