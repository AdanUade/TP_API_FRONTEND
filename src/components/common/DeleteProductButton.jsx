import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../store/productSlice';
import Button from './Button';
import { getToken } from '../../utils/token';
import { toast } from 'react-toastify';

const DeleteProductButton = ({ productId, productName, onDeleted }) => {
    const dispatch = useDispatch();
    const [confirming, setConfirming] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteResult, setDeleteResult] = useState(null);

    const startDelete = () => setConfirming(true);
    const cancelDelete = () => setConfirming(false);

    const confirmDelete = () => {
        const token = getToken();
        if (!token) {
            toast.error('No se encontró token de autenticación. Inicia sesión e intenta de nuevo.');
            return;
        }

        setLoading(true);
        setIsDeleting(true);
        const resultAction = dispatch(deleteProduct({ productId, token }));
        setDeleteResult(resultAction);
    };

    useEffect(() => {
        // Detecta cuando termina el loading y hay un resultado
        if (isDeleting && deleteResult) {
            Promise.resolve(deleteResult).then((result) => {
                if (deleteProduct.fulfilled.match(result)) {
                    // Eliminación exitosa
                    toast.success(`Producto "${productName}" eliminado correctamente`);
                    setConfirming(false);
                    if (onDeleted) onDeleted(productId);
                } else {
                    // Error al eliminar
                    const err = result.payload || 'Error al eliminar';
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
                }
                setLoading(false);
                setIsDeleting(false);
                setDeleteResult(null);
            });
        }
    }, [isDeleting, deleteResult, productId, productName, onDeleted]);

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
