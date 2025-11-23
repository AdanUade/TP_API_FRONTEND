import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { searchProducts } from "../store/productSlice"
import PageTitle from "../components/page/PageTitle"
import ErrorGenerico from "../components/common/ErrorGenerico"
import ProductGrid from "../components/products/ProductGrid"
import LoadingSpinner from "../components/common/LoadingSpinner"
import Pagination from "../components/page/Pagination"

const Search = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [currentPage, setCurrentPage] = useState(0);
    const { items: products, isLoading, error, totalPages, totalElements } = useSelector(state => state.products);

    useEffect(() => {
        if (query && query.trim()) {
            dispatch(searchProducts({ query, page: currentPage, size: 8 }));
        }
    }, [dispatch, query, currentPage]);

    useEffect(() => {
        setCurrentPage(0);
    }, [query]);

    if (!query || !query.trim()) {
        return (
            <div>
                <PageTitle title="Búsqueda" subtitle="¿Qué estás buscando?" />
                <ErrorGenerico 
                    title="Escribe algo para buscar"
                    message="Usa la barra de búsqueda para encontrar productos épicos."
                    variant="page"
                />
            </div>
        );
    }

    if (isLoading) {
        return (
            <div>
                <PageTitle title={`Buscando "${query}"...`} subtitle="Rastreando productos épicos" />
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <PageTitle title="Error en la búsqueda" subtitle="¡Algo salió mal!" />
                <ErrorGenerico message={error} variant="page" />
            </div>
        );
    }

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const totalResults = totalElements || products.length || 0;

    return (
        <div>
            <PageTitle 
                title={`Resultados para "${query}"`} 
                subtitle={`${totalResults} ${totalResults === 1 ? 'producto encontrado' : 'productos encontrados'}`}
            />
            {products.length === 0 ? (
                <ErrorGenerico 
                    title="Sin resultados"
                    message={`No se encontraron productos para "${query}". Intenta con otros términos.`}
                    variant="page"
                />
            ) : (
                <>
                    <ProductGrid products={products} isLoading={false} />
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}
        </div>
    )
}
export default Search