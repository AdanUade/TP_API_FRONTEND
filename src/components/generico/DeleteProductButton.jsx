import { useState } from 'react';
import Button from './Button';
import ErrorGenerico from './ErrorGenerico';
import { deleteProduct } from '../../api/ProductApi';
import { getToken } from '../../api/AuthApi';

const DeleteProductButton = ({ productId, productName, onDeleted }) => {
    const [confirming, setConfirming] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const startDelete = () => setConfirming(true);
    const cancelDelete = () => setConfirming(false);

    const confirmDelete = async () => {
        setLoading(true);
        setMessage(null);
        try {
            const token = getToken();
            // debug: ensure token exists and log presence (avoid printing secret in logs by default)
            console.debug('DeleteProductButton: token present?', !!token);
            if (!token) {
                throw new Error('No se encontró token de autenticación. Inicia sesión e intenta de nuevo.');
            }
            await deleteProduct({ productId, token });
            setMessage(`Producto "${productName}" eliminado correctamente`);
            setDeleted(true);
            setConfirming(false);
            if (onDeleted) onDeleted(productId);
        } catch (err) {
            // err puede ser objeto parseado por handleResponse o Error
            console.error('DeleteProductButton: error deleting product', err);
            let msg = 'Error al eliminar el producto';
            if (err) {
                if (typeof err === 'string') msg = err;
                else if (err.message) msg = err.message;
                else {
                    try { msg = JSON.stringify(err); } catch { /* ignore stringify errors */ }
                }
            }
            setMessage(msg);
            setDeleted(true);
            setConfirming(false);
        } finally {
            setLoading(false);
        }
    };

    if (deleted && message) {
        return <ErrorGenerico message={message} />;
    }

    return (
        <>
            {!confirming && !deleted && (
                <Button onClick={startDelete} variant="danger" disabled={loading}>
                    Eliminar
                </Button>
            )}
            {confirming && !deleted && (
                <div className="flex gap-2">
                    <Button onClick={confirmDelete} variant="danger" className="flex-1" disabled={loading}>
                        {loading ? 'Eliminando...' : 'Confirmar eliminación'}
                    </Button>
                    <Button onClick={cancelDelete} variant="secondary" className="flex-1" disabled={loading}>
                        Cancelar
                    </Button>
                </div>
            )}
        </>
    );
};

export default DeleteProductButton;
