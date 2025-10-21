import { getAllProducts } from "../../api/ProductApi";
import { useAuth } from "../../hooks/useAuth.js";
import { useProducts } from "../../hooks/useProducts.js";
import { usePagination } from "../../hooks/usePagination.js";
import PageTitle from "../../components/page/PageTitle";
import ProductGrid from "../../components/products/ProductGrid";
import ErrorGenerico from "../../components/generico/ErrorGenerico";
import Pagination from "../../components/page/Pagination.jsx";

const ProductsSeller = () => {
    const { isSeller, isAdmin } = useAuth(); // Obtener también isAdmin
    const { currentPage, handlePageChange } = usePagination();
    
    const { 
        products, 
        isLoading, 
        error, 
        totalPages 
    } = useProducts({
        fetchFunction: getAllProducts,
        page: currentPage,
        size: 8,
        dependencies: [isSeller, isAdmin, currentPage],
        autoLoad: !!(isSeller || isAdmin) // Cargar si es Vendedor O Admin
    });

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