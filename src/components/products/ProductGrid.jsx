import { useAuth } from '../../hooks/useAuth';
import ProductCard from './ProductCard';
import ProductCardSeller from './ProductCardSeller';
import ProductCardSkeleton from './ProductCardSkeleton';

const ProductGrid = ({ products, isLoading }) => {
    const { isSeller, isAdmin } = useAuth();
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {Array.from({ length: 8 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    const CardComponent = (isSeller || isAdmin) ? ProductCardSeller : ProductCard;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map(product => (
                <CardComponent 
                    key={product.id} 
                    product={product}
                />
            ))}
        </div>
    );
};

export default ProductGrid;