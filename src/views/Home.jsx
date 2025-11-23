import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import HeroBanner from '../components/page/HeroBanner';
import PageTitle from '../components/page/PageTitle';
import ProductGrid from "../components/products/ProductGrid";
import ErrorGenerico from '../components/generico/ErrorGenerico';
import { useAuth } from '../hooks/useAuth.js';
import SellerHome from './seller/SellerHome';
import AdminHome from './admin/AdminHome';

const Home = () => {
    const dispatch = useDispatch();
    const { items: latestProducts, isLoading, error } = useSelector(state => state.products);
    const { isAdmin, isSeller } = useAuth();

    useEffect(() => {
        dispatch(fetchProducts({ page: 0, size: 8, sortBy: 'createdAt', sortOrder: 'desc' }));
    }, [dispatch]);

    if (error) {
        return (
            <div>
                <HeroBanner />
                <PageTitle title="Novedades" />
                <ErrorGenerico message={error} variant="page" />
            </div>
        );
    }

    if (isAdmin) {
        return <AdminHome isLoading={isLoading} error={error} latestProducts={latestProducts} />
    }

    if (isSeller) {
        return <SellerHome isLoading={isLoading} error={error} latestProducts={latestProducts} />
    }

    return (
        <div>
            <HeroBanner />
            <PageTitle title="Novedades" />
            <ProductGrid 
                products={latestProducts || []} 
                isLoading={isLoading}
            />
        </div>
    );
};

export default Home;