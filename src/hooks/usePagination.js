import { useSearchParams } from 'react-router-dom';
import { DEFAULT_PAGINATION } from '../constants/apiConfig';

export const usePagination = (initialPage = DEFAULT_PAGINATION.PAGE) => {
    // Hook de React Router para leer y modificar los parámetros de búsqueda de la URL.
    const [searchParams, setSearchParams] = useSearchParams();
    
    // La página actual se lee directamente de la URL (`?page=...`). Si no existe, se usa la inicial.
    const currentPage = parseInt(searchParams.get('page')) || initialPage;

    const handlePageChange = (newPage) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', newPage.toString());
        setSearchParams(newParams); // Actualizar la URL provoca un nuevo renderizado.
        
        // Scroll suave hacia arriba para que el usuario vea el inicio de la nueva lista.
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Funciones de ayuda para una manipulación más sencilla de la paginación.
    const resetPage = () => {
        handlePageChange(0);
    };

    const nextPage = (totalPages) => {
        if (currentPage < totalPages - 1) {
            handlePageChange(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            handlePageChange(currentPage - 1);
        }
    };

    // Funciones booleanas para deshabilitar botones en la UI.
    const hasNextPage = (totalPages) => {
        return currentPage < totalPages - 1;
    };

    const hasPrevPage = () => {
        return currentPage > 0;
    };

    const getItemRange = (size = DEFAULT_PAGINATION.SIZE, totalItems) => {
        const start = currentPage * size + 1;
        const end = Math.min((currentPage + 1) * size, totalItems);
        return { start, end };
    };

    return {
        currentPage,
        handlePageChange,
        resetPage,
        nextPage,
        prevPage,
        hasNextPage,
        hasPrevPage,
        getItemRange,
    };
};
