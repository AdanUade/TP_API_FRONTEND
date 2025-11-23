import { useParams } from 'react-router-dom';
import { CATEGORY_INFO } from '../constants/productCategories';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice.js';
import { fetchProductsByCategory } from '../store/productSlice.js';

import PageTitle from '../components/page/PageTitle';
import ProductFilters from '../components/products/ProductFilters';
import ProductGrid from '../components/products/ProductGrid';
import Pagination from '../components/page/Pagination';
import ErrorGenerico from '../components/common/ErrorGenerico';

// Usar hooks personalizados
import { usePagination } from '../hooks/usePagination.js';
import { useFilters } from '../hooks/useFilters.js';
import { useEffect } from 'react';

const Category = ({ category: categoryProp, title: titleProp, subtitle: subtitleProp }) => {
    // Soporte para uso con useParams (ruta dinámica) o props directas
    const { category: categoryFromUrl } = useParams();
    const category = categoryProp || categoryFromUrl;
    
    // Obtener configuración desde constants (centralized)
    const categoryKey = category?.toUpperCase();
    const config = CATEGORY_INFO[categoryKey] || {};
    const title = titleProp || config.title || 'Productos';
    const subtitle = subtitleProp || config.subtitle || 'Descubre nuestros productos';
    
    const dispatch = useDispatch();
    const { items: products, isLoading, error, totalPages } = useSelector(state => state.products);
    const handleAddToCart = (product, image) => dispatch(addToCart({product, image}));
    
    // Hook de paginación
    const { currentPage, handlePageChange, resetPage } = usePagination();
    
    // Hook de filtros
    const { filters, updateFilter } = useFilters({
        sortByPrice: 'default',
        onSale: false
    });
    
    useEffect(() => {
        dispatch(fetchProductsByCategory({
            page: currentPage,
            category,
            sortByPrice: filters.sortByPrice,
            onSale: filters.onSale
        }));
    }, [dispatch, currentPage, category, filters.sortByPrice, filters.onSale]);

    const handleSortChange = (newSortOrder) => {
        updateFilter('sortByPrice', newSortOrder);
        resetPage(); // Volver a página 0 al cambiar filtro
    };

    const handleSaleFilterChange = (isChecked) => {
        updateFilter('onSale', isChecked);
        resetPage(); // Volver a página 0 al cambiar filtro
    };

    if (error) {
        return (
            <div>
                <PageTitle title={title} subtitle={subtitle} />
                <ErrorGenerico message={error} variant="page" />
            </div>
        );
    }

    return (
        <div>
            <PageTitle title={title} subtitle={subtitle} />
            
            <ProductFilters
                sortOrder={filters.sortByPrice}
                onSortChange={handleSortChange}
                showOnlyOnSale={filters.onSale}
                onSaleFilterChange={handleSaleFilterChange}
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
};

export default Category;