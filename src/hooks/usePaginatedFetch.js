
import { useState, useEffect, useCallback } from 'react';
import { DEFAULT_PAGINATION } from '../constants/apiConfig';

export const usePaginatedFetch = ({
    fetchFunction,
    page = DEFAULT_PAGINATION.PAGE,
    size = DEFAULT_PAGINATION.SIZE,
    filters = {},
    dependencies = [],
    autoLoad = true
}) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);

    // Create a stable reference for filters to avoid complexity in dependency array
    const filtersString = JSON.stringify(filters);

    const loadData = useCallback(() => {
        setIsLoading(true);
        setError(null);

        // Parse filters back or use the prop directly if we trust it won't change during execution
        // (but props change, so closures capture old values).
        // However, standard practice is just to list the object if it's small or stable.
        // Or use the stringified version for comparison.
        // Here we use the outer 'filters' which is captured.

        const params = {
            page,
            size,
            ...filters
        };

        fetchFunction(params)
            .then(response => {
                setData(response.content || []);
                setTotalPages(response.totalPages || 1);
                setTotalElements(response.totalElements || 0);
            })
            .catch(err => {
                console.error('Error loading data:', err);
                setError(err.message || 'Error loading data');
                setData([]);
            })
            .finally(() => {
                setIsLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchFunction, page, size, filtersString]);

    useEffect(() => {
        if (autoLoad) {
            loadData();
        }
    }, [loadData, autoLoad, ...dependencies]);

    const refetch = () => {
        loadData();
    };

    const clear = () => {
        setData([]);
        setError(null);
        setTotalPages(1);
        setTotalElements(0);
    };

    const hasData = data.length > 0;
    const isLastPage = page >= totalPages - 1;
    const isFirstPage = page === 0;

    return {
        data,
        isLoading,
        error,
        totalPages,
        totalElements,
        refetch,
        clear,
        hasData,
        isLastPage,
        isFirstPage,
    };
};
