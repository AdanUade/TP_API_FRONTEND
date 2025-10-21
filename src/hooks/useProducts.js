
import { useState, useEffect, useCallback } from 'react';
import { DEFAULT_PAGINATION } from '../constants/apiConfig';

export const useProducts = ({ 
    fetchFunction,
    page = DEFAULT_PAGINATION.PAGE,
    size = DEFAULT_PAGINATION.SIZE,
    filters = {},
    dependencies = [],
    autoLoad = true
}) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);

    /**
     * Función para cargar productos
     */
    const loadProducts = useCallback(() => {
        setIsLoading(true);
        setError(null);

        // Construir parámetros
        const params = {
            page,
            size,
            ...filters
        };

        fetchFunction(params)
            .then(data => {
                setProducts(data.content || []);
                setTotalPages(data.totalPages || 1);
                setTotalElements(data.totalElements || 0);
            })
            .catch(err => {
                console.error('Error al cargar productos:', err);
                setError(err.message || 'Error al cargar productos');
                setProducts([]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [fetchFunction, page, size, JSON.stringify(filters)]);

    /**
     * Efecto para cargar productos automáticamente
     */
    useEffect(() => {
        if (autoLoad) {
            loadProducts();
        }
    }, [loadProducts, autoLoad, ...dependencies]);

    /**
     * Función para recargar productos manualmente
     */
    const refetch = () => {
        loadProducts();
    };

    /**
     * Función para limpiar productos
     */
    const clear = () => {
        setProducts([]);
        setError(null);
        setTotalPages(1);
        setTotalElements(0);
    };

    /**
     * Verifica si hay productos
     */
    const hasProducts = products.length > 0;

    /**
     * Verifica si es la última página
     */
    const isLastPage = page >= totalPages - 1;

    /**
     * Verifica si es la primera página
     */
    const isFirstPage = page === 0;

    return {
        // Estado
        products,
        isLoading,
        error,
        totalPages,
        totalElements,
        
        // Funciones
        refetch,
        clear,
        
        // Helpers
        hasProducts,
        isLastPage,
        isFirstPage,
    };
};
