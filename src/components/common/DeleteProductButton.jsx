import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../store/productSlice';
import Button from './Button';
import ErrorGenerico from './ErrorGenerico';
import { getToken } from '../../api/AuthApi';
import { toast } from 'react-toastify';

const DeleteProductButton = ({ productId, productName, onDeleted }) => {
    const dispatch = useDispatch();
    const [confirming, setConfirming] = useState(false);
    const [loading, setLoading] = useState(false);

    const startDelete = () => setConfirming(true);
    const cancelDelete = () => setConfirming(false);

    const confirmDelete = async () => {
        setLoading(true);
        try {
            const token = getToken();
            console.debug('DeleteProductButton: token present?', !!token);
            if (!token) {
                throw new Error('No se encontró token de autenticación. Inicia sesión e intenta de nuevo.');
            }

            const resultAction = await dispatch(deleteProduct({ productId, token }));

            if (deleteProduct.fulfilled.match(resultAction)) {
                toast.success(`Producto "${productName}" eliminado correctamente`);
                setConfirming(false);
                if (onDeleted) onDeleted(productId);
            } else {
                throw resultAction.payload || new Error('Error al eliminar');
            }
        } catch (err) {
            console.error('DeleteProductButton: error deleting product', err);
            let msg = 'Error al eliminar el producto';
            if (err) {
                if (typeof err === 'string') msg = err;
                else if (err.message) msg = err.message;
                else {
                    try { msg = JSON.stringify(err); } catch { /* ignore */ }
                }
            }
            toast.error(msg);
            setConfirming(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {!confirming && (
                <Button onClick={startDelete} variant="danger" disabled={loading}>
                    Eliminar
                </Button>
            )}
            {confirming && (
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
