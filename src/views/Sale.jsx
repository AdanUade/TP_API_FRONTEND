import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProductsOnSale } from '../api/ProductApi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice.js';
import { useAsync } from '../hooks/useAsync.js';

import PageTitle from '../components/page/PageTitle';
import ProductFilters from '../components/products/ProductFilters';
import ProductGrid from '../components/products/ProductGrid';
import Pagination from '../components/page/Pagination';
import ErrorForm from '../components/generico/ErrorGenerico';

const Sale = () => {
    const dispatch = useDispatch();
    const handleAddToCart = (product, image) => dispatch(addToCart({product, image}));
    const [searchParams, setSearchParams] = useSearchParams();
    const { isLoading, error, data: productsData, execute } = useAsync();

    const currentPage = parseInt(searchParams.get('page')) || 0;
    const [sortByPrice, setSortByPrice] = useState('default');

    useEffect(() => {
        execute(() => 
            getProductsOnSale({
                page: currentPage,
                sortByPrice: sortByPrice,
            })
        );
    }, [currentPage, sortByPrice, execute]);

    const products = productsData?.content || [];
    const totalPages = productsData?.totalPages || 1;
    
    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage.toString() });
        window.scrollTo(0, 0);
    };

    const handleSortChange = (newSortOrder) => {
        setSortByPrice(newSortOrder);
        setSearchParams({ page: '0' }); 
    };

    if (error) {
        return (
            <div>
                <PageTitle title="¡SALE!" subtitle="¡Ofertas que son un verdadero POW!" />
                <ErrorForm message={error} variant="page" />
            </div>
        );
    }
    
    return (
        <div>
            <PageTitle title="¡SALE!" subtitle="¡Ofertas que son un verdadero POW!" />

            <ProductFilters
                sortOrder={sortByPrice}
                onSortChange={handleSortChange}
                showSaleFilter={false} 
            />
            
            <ProductGrid 
                products={products} 
                isLoading={isLoading} 
                onAddToCart={handleAddToCart}
            />
            
            {!isLoading && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}
export default Sale;