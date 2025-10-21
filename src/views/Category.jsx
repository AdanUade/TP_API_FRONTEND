import { getProductsByCategory } from '../api/ProductApi';
import { useCart } from '../context/CartContext';
import { useParams } from 'react-router-dom';
import { CATEGORY_INFO } from '../constants/productCategories';

import PageTitle from '../components/page/PageTitle';
import ProductFilters from '../components/products/ProductFilters';
import ProductGrid from '../components/products/ProductGrid';
import Pagination from '../components/page/Pagination';
import ErrorGenerico from '../components/generico/ErrorGenerico';

// Usar hooks personalizados
import { usePagination } from '../hooks/usePagination.js';
import { useFilters } from '../hooks/useFilters.js';
import { useProducts } from '../hooks/useProducts.js';

const Category = ({ category: categoryProp, title: titleProp, subtitle: subtitleProp }) => {
    // Soporte para uso con useParams (ruta dinámica) o props directas
    const { category: categoryFromUrl } = useParams();
    const category = categoryProp || categoryFromUrl;
    
    // Obtener configuración desde constants (centralized)
    const categoryKey = category?.toUpperCase();
    const config = CATEGORY_INFO[categoryKey] || {};
    const title = titleProp || config.title || 'Productos';
    const subtitle = subtitleProp || config.subtitle || 'Descubre nuestros productos';
    
    const { addToCart } = useCart();
    
    // Hook de paginación
    const { currentPage, handlePageChange, resetPage } = usePagination();
    
    // Hook de filtros
    const { filters, updateFilter } = useFilters({
        sortByPrice: 'default',
        onSale: false
    });
    
    // Hook de productos
    const { products, isLoading, error, totalPages } = useProducts({
        fetchFunction: getProductsByCategory,
        page: currentPage,
        filters: { 
            category, 
            sortByPrice: filters.sortByPrice, 
            onSale: filters.onSale 
        },
        dependencies: [category, filters.sortByPrice, filters.onSale]
    });

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
                onAddToCart={addToCart} 
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