import { useAuth } from '../hooks/useAuth';
import ProductDetailUser from './ProductDetailUser';
import ProductDetailSeller from './seller/ProductDetailSeller';

const ProductDetail = () => {
    const { isSeller, isAdmin } = useAuth();

    if (isSeller || isAdmin) {
        return <ProductDetailSeller />;
    }

    return <ProductDetailUser />;
};

export default ProductDetail;
