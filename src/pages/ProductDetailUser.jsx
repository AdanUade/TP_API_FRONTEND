import { useState, useCallback, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { fetchProductById, clearSelectedProduct } from '../store/productSlice';
import { calculateFinalPrice, isProductOutOfStock, isProductOnSale } from '../utils/productHelpers';
import PageTitle from '../components/page/PageTitle';
import Button from '../components/common/Button';
import ErrorGenerico from '../components/common/ErrorGenerico';
import LoadingSpinner from '../components/common/LoadingSpinner';
import CardImage from '../components/products/productCard/CardImage';
import ProductInfo from '../components/products/productDetail/ProductInfo';
import ProductActions from '../components/products/productDetail/ProductActions';

/**
 * Vista de detalle de producto para USUARIOS REGULARES
 * Incluye funcionalidad de carrito y compra
 */
const ProductDetailUser = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [quantity, setQuantity] = useState(1);
    
    const { selectedProduct: product, isLoading, error } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(fetchProductById(productId));
        return () => {
            dispatch(clearSelectedProduct());
        };
    }, [dispatch, productId]);

    const productInfo = useMemo(() => {
        if (!product) return null;
        return {
            isOutOfStock: isProductOutOfStock(product),
            onSale: isProductOnSale(product),
            finalPrice: calculateFinalPrice(product.price, product.discount),
            oldPrice: product.price
        };
    }, [product]);

    const handleAddToCart = useCallback(() => {
        if (product) {
            dispatch(addToCart({product, image: product.imageFile, quantity}));
        }
    }, [dispatch, product, quantity]);

    const handleQuantityChange = useCallback((newQuantity) => {
        setQuantity(Math.max(1, Math.min(newQuantity, product?.stock || 1)));
    }, [product?.stock]);

    if (isLoading) {
        return (
            <>
                <PageTitle title="Cargando..." subtitle="Preparando tu producto épico" />
                <LoadingSpinner />
            </>
        );
    }
    
    if (error || !product) {
        return (
            <>
                <PageTitle title="Producto" subtitle="Detalles del héroe" />
                <ErrorGenerico 
                    title="¡ZAP! Producto no encontrado"
                    message={error || "Parece que este artículo fue víctima de un rayo desintegrador."}
                    variant="page"
                />
                <div className="text-center mt-6">
                    <Button onClick={() => navigate('/')} variant="secondary">
                        ← Volver a la tienda
                    </Button>
                </div>
            </>
        );
    }

    const { isOutOfStock, onSale, finalPrice, oldPrice } = productInfo;
    
    return (
        <div>
            <PageTitle 
                title={product.name} 
                subtitle={`Categoría: ${product.category || 'Producto'}`} 
            />
            
            <div className="grid md:grid-cols-2 gap-8 bg-white border-4 border-black p-6 md:p-8 rounded-lg shadow-[12px_12px_0_0_#000]">
                
                <CardImage
                    id={product.id}
                    image={product.imageFile}
                    name={product.name}
                    onSale={onSale}
                    outOfStock={isOutOfStock}
                    size="detail"
                    showLink={false}
                />
                
                <div className="flex flex-col gap-4">
                    <ProductInfo
                        product={product}
                        finalPrice={finalPrice}
                        oldPrice={oldPrice}
                        discount={product.discount}
                        isOutOfStock={isOutOfStock}
                        onSale={onSale}
                    />
                    
                    <ProductActions
                        quantity={quantity}
                        onQuantityChange={handleQuantityChange}
                        onAddToCart={handleAddToCart}
                        isOutOfStock={isOutOfStock}
                        onGoBack={() => navigate(-1)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductDetailUser;
