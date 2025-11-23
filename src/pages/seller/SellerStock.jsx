import { useEffect, useState } from 'react';
import PageTitle from "../../components/page/PageTitle";
import ProductCardSeller from '../../components/products/ProductCardSeller';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorGenerico from '../../components/common/ErrorGenerico';
import { getProductsOutOfStock } from '../../api/ProductApi';
import { usePaginatedFetch } from '../../hooks/usePaginatedFetch.js';
import { usePagination } from '../../hooks/usePagination.js';
import Pagination from '../../components/page/Pagination.jsx';

const SellerStock = () => {
    const { currentPage, handlePageChange } = usePagination();
    const { isLoading, error, data: products, totalPages } = usePaginatedFetch({
        fetchFunction: getProductsOutOfStock,
        page: currentPage,
        size: 8,
        dependencies: [currentPage]
    });

    // Estado local para permitir la eliminación instantánea de la UI
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(products || []);
    }, [products]);

    const handleDeleted = (deletedId) => {
        setItems(prev => {
            const next = prev.filter(p => p.id !== deletedId);
            // Si la página queda vacía y no es la primera, retrocede.
            if (next.length === 0 && currentPage > 0) {
                handlePageChange(currentPage - 1);
            }
            return next;
        });
    };

    if (isLoading) {
        return (
            <>
                <PageTitle 
                    title="Productos Agotados" 
                    subtitle="Gestiona tus productos"
                />
                <LoadingSpinner />
            </>
        );
    }

    if (error) {
        return (
            <>
                <PageTitle 
                    title="Productos Agotados" 
                    subtitle="Gestiona tus productos"
                />
                <ErrorGenerico message={error} />
            </>
        );
    }

    return (
        <>
            <PageTitle 
                title="Productos Agotados" 
                subtitle={`${items.length} producto(s) sin stock`}
            />
            {items.length === 0 ? (
                <div className="bg-white border-4 border-black p-8 rounded-lg shadow-[12px_12px_0_0_#FBBF24] text-center">
                    <p className="text-xl text-gray-600 mb-4">
                        ¡Felicidades! No tienes productos sin stock.
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {items.map(product => (
                            <ProductCardSeller 
                                key={product.id} 
                                product={product}
                                onDeleted={handleDeleted}
                            />
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <Pagination 
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default SellerStock;
