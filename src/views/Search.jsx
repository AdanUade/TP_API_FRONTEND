import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { searchProducts } from "../api/ProductApi"
import PageTitle from "../components/page/PageTitle"
import ErrorGenerico from "../components/generico/ErrorGenerico"
import ProductGrid from "../components/products/ProductGrid"
import LoadingSpinner from "../components/generico/LoadingSpinner"
import Pagination from "../components/page/Pagination"
import { useAsync } from "../hooks/useAsync.js"

const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [currentPage, setCurrentPage] = useState(0);
    const { isLoading, error, data: productsData, execute } = useAsync();

    useEffect(() => {
        if (query && query.trim()) {
            execute(() => searchProducts(query, currentPage, 8));
        }
    }, [query, currentPage, execute]);

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

    const results = productsData || { content: [], totalPages: 0 };
    const totalResults = results.totalElements || results.content?.length || 0;

    return (
        <div>
            <PageTitle 
                title={`Resultados para "${query}"`} 
                subtitle={`${totalResults} ${totalResults === 1 ? 'producto encontrado' : 'productos encontrados'}`}
            />
            {results.content?.length === 0 ? (
                <ErrorGenerico 
                    title="Sin resultados"
                    message={`No se encontraron productos para "${query}". Intenta con otros términos.`}
                    variant="page"
                />
            ) : (
                <>
                    <ProductGrid products={results.content} isLoading={false} />
                    {results.totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={results.totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}
        </div>
    )
}
export default Search