import { useSearchParams } from 'react-router-dom';
import { DEFAULT_PAGINATION } from '../constants/apiConfig';

/**
 * Hook para gestionar la paginación sincronizándola con los parámetros de la URL.
 * Lee y escribe el número de página en el parámetro `?page=` de la URL,
 * convirtiendo la URL en la fuente de verdad del estado de paginación.
 *
 * @param {number} [initialPage=DEFAULT_PAGINATION.PAGE] - La página inicial a usar si no hay ninguna en la URL.
 * @returns {{currentPage: number, handlePageChange: function, resetPage: function, nextPage: function, prevPage: function, hasNextPage: function, hasPrevPage: function, getItemRange: function}} - Un objeto con el estado y los manejadores para controlar la paginación.
 */
export const usePagination = (initialPage = DEFAULT_PAGINATION.PAGE) => {
    // Hook de React Router para leer y modificar los parámetros de búsqueda de la URL.
    const [searchParams, setSearchParams] = useSearchParams();
    
    // La página actual se lee directamente de la URL (`?page=...`). Si no existe, se usa la inicial.
    const currentPage = parseInt(searchParams.get('page')) || initialPage;

    /**
     * Cambia la página actual actualizando el parámetro en la URL.
     * @param {number} newPage - El nuevo número de página.
     */
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

    /**
     * Calcula el rango de ítems que se están mostrando actualmente.
     * @param {number} size - El número de ítems por página.
     * @param {number} totalItems - El número total de ítems.
     * @returns {{start: number, end: number}} - El rango de inicio y fin.
     */
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
