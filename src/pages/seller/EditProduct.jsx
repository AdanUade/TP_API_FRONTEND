import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, clearSelectedProduct } from '../../store/productSlice';
import PageTitle from '../../components/page/PageTitle';
import ProductForm from '../../components/products/ProductForm';
import ErrorGenerico from '../../components/common/ErrorGenerico';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const EditProduct = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { selectedProduct: product, isLoading, error } = useSelector(state => state.products);

    useEffect(() => {
        if (!productId) return;
        dispatch(fetchProductById(productId));

        // Cleanup: limpiar producto seleccionado al desmontar
        return () => {
            dispatch(clearSelectedProduct());
        };
    }, [productId, dispatch]);

    const handleSuccess = () => {
        setTimeout(() => {
            navigate('/seller/products');
        }, 2000);
    };

    if (error) {
        return <ErrorGenerico message={error} />;
    }

    if (isLoading || !product) {
        return <LoadingSpinner title="Cargando producto..." />;
    }

    return (
        <>
            <PageTitle title="Editar Producto" subtitle={`Editando: ${product.name}`} />

            <ProductForm product={product} onSuccess={handleSuccess} />
        </>
    );
};

export default EditProduct;
