import { useParams, useNavigate } from 'react-router-dom';
import { useProductData } from '../../hooks/useProductData';
import { buildRoute } from '../../constants/routes';
import { isProductOutOfStock, isProductOnSale, calculateFinalPrice, getDiscountPercentage } from '../../utils/productHelpers';
import PageTitle from '../../components/page/PageTitle';
import Button from '../../components/generico/Button';
import ErrorGenerico from '../../components/generico/ErrorGenerico';
import LoadingSpinner from '../../components/generico/LoadingSpinner';
import CardImage from '../../components/products/productCard/CardImage';
import ProductInfo from '../../components/products/productDetail/ProductInfo';
import DeleteProductButton from '../../components/generico/DeleteProductButton';

/**
 * Vista de detalle de producto para VENDEDORES y ADMINISTRADORES
 * Incluye funcionalidad de edición y eliminación
 */
const ProductDetailSeller = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    
    const { product, isLoading, error } = useProductData(productId);

    const handleEdit = () => {
        navigate(buildRoute.sellerProductEdit(product.id));
    };

    // callback que recibe DeleteProductButton cuando la eliminación fue exitosa
    const handleDeleted = (deletedId) => {
        // por ahora, volvemos al listado de stock de vendedor
        navigate('/seller/stock');
    };

    if (isLoading) {
        return (
            <>
                <PageTitle title="Cargando..." subtitle="Cargando información del producto" />
                <LoadingSpinner />
            </>
        );
    }
    
    if (error || !product) {
        return (
            <>
                <PageTitle title="Producto" subtitle="Gestión de producto" />
                <ErrorGenerico 
                    title="Producto no encontrado"
                    message={error || "No se encontró el producto solicitado."}
                    variant="page"
                />
                <div className="text-center mt-6">
                    <Button onClick={() => navigate('/seller/stock')} variant="secondary">
                        ← Volver al inventario
                    </Button>
                </div>
            </>
        );
    }

    // Se calcula la información derivada del producto usando los helpers
    const onSale = isProductOnSale(product);
    const isOutOfStock = isProductOutOfStock(product);
    const finalPrice = calculateFinalPrice(product.price, product.discount);
    const oldPrice = product.price;
    
    return (
        <div>
            <PageTitle 
                title={product.name} 
                subtitle="Gestión de Producto" 
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

                    <div className="border-t-2 border-black pt-4 mt-4">
                        <h3 className="text-xl font-bold mb-4">Panel de Gestión</h3>
                        
                        <div className="space-y-2 mb-4">
                            <p className="flex justify-between">
                                <span className="font-semibold">Stock disponible:</span>
                                <span className={isOutOfStock ? 'text-red-600' : 'text-green-600'}>
                                    {product.stock} unidades
                                </span>
                            </p>
                            <p className="flex justify-between">
                                <span className="font-semibold">Categoría:</span>
                                <span>{product.category || 'Sin categoría'}</span>
                            </p>
                            {onSale && (
                                <p className="flex justify-between">
                                    <span className="font-semibold">Descuento:</span>
                                    <span className="text-green-600">
                                        {getDiscountPercentage(product.discount)}% OFF
                                    </span>
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-3">
                            <Button 
                                onClick={handleEdit}
                                variant="primary"
                            >
                                Editar Producto
                            </Button>
                            <DeleteProductButton
                                productId={product.id}
                                productName={product.name}
                                onDeleted={handleDeleted}
                            />
                            <Button 
                                onClick={() => navigate(-1)}
                                variant="secondary"
                            >
                                ← Volver
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailSeller;
