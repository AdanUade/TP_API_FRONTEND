import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageTitle from '../../components/page/PageTitle';
import ProductForm from '../../components/products/ProductForm';
import { getProductById } from '../../api/ProductApi';
import ErrorGenerico from '../../components/common/ErrorGenerico';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const EditProduct = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!productId) return;
        getProductById(productId)
            .then(p => setProduct(p))
            .catch(err => setError(err.message || 'Error al cargar el producto'));
    }, [productId]);

    const handleSuccess = () => {
        setSuccess(true);
        setTimeout(() => {
            navigate('/seller/products');
        }, 2000);
    };

    if (error) {
        return <ErrorGenerico message={error} />;
    }

    if (!product) {
        return <LoadingSpinner title="Cargando producto..." />;
    }

    return (
        <>
            <PageTitle title="Editar Producto" subtitle={`Editando: ${product.name}`} />

            <ProductForm product={product} onSuccess={handleSuccess} />

            {success && (
                <div className="text-green-600 mt-4 text-center font-bold">
                    ¡Producto actualizado! Redirigiendo a tus productos...
                </div>
            )}
        </>
    );
};

export default EditProduct;
