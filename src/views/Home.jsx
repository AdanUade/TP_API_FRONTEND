import { useEffect } from 'react';
import HeroBanner from '../components/page/HeroBanner';
import PageTitle from '../components/page/PageTitle';
import ProductFilters from "../components/products/ProductFilters";
import ProductGrid from "../components/products/ProductGrid";
import { useProducts } from "../hooks/useProducts.js";
import { useFilters } from "../hooks/useFilters.js";
import { API_ENDPOINTS } from "../constants/index.js";
import { getAllProducts } from '../api/ProductApi';
import ErrorGenerico from '../components/generico/ErrorGenerico';
import { useAuth } from '../hooks/useAuth.js';
import { useAsync } from '../hooks/useAsync.js';
import SellerHome from './seller/SellerHome';
import AdminHome from './admin/AdminHome';

const Home = () => {
    const { isLoading, error, data: latestProducts, execute } = useAsync();
    const { isAdmin, isSeller } = useAuth();

    useEffect(() => {
        execute(() => 
            getAllProducts({ page: 0, size: 8, sortBy: 'createdAt', sortOrder: 'desc' })
                .then(data => data.content)
        );
    }, []);

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