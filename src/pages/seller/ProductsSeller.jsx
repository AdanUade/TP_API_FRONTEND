import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/productSlice";
import { useAuth } from "../../hooks/useAuth.js";
import { usePagination } from "../../hooks/usePagination.js";
import PageTitle from "../../components/page/PageTitle";
import ProductGrid from "../../components/products/ProductGrid";
import ErrorGenerico from "../../components/common/ErrorGenerico";
import Pagination from "../../components/page/Pagination.jsx";

const ProductsSeller = () => {
    const dispatch = useDispatch();
    const { isSeller, isAdmin } = useAuth();
    const { currentPage, handlePageChange } = usePagination();
    
    const { items: products, isLoading, error, totalPages } = useSelector(state => state.products);

    useEffect(() => {
        if (isSeller || isAdmin) {
            dispatch(fetchProducts({ page: currentPage, size: 8 }));
        }
    }, [dispatch, currentPage, isSeller, isAdmin]);

    if (error) {
        return (
            <div>
                <PageTitle title="Productos" subtitle="Error al cargar los productos" />
                <ErrorGenerico message={error} variant="page" />
            </div>
        );
    }

    // Título dinámico según el rol
    const pageTitle = isAdmin ? "Gestionar Productos" : "Mis Productos";
    const pageSubtitle = isAdmin 
        ? "Edita y gestiona todos los productos de la plataforma"
        : "Aquí puedes ver y gestionar tus productos";

    return (
        <>
            <PageTitle 
                title={pageTitle} 
                subtitle={pageSubtitle}
            />
            <ProductGrid 
                products={products || []} 
                isLoading={isLoading}
            />
            {!isLoading && totalPages > 1 && (
                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </>
    );
};

export default ProductsSeller;