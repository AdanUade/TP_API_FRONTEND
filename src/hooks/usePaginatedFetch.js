
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
    const filtersString = JSON.stringify(filters || {});

    const loadData = useCallback(() => {
        setIsLoading(true);
        setError(null);

        // We use the stringified version to ensure we use the current filters values
        // without needing to add the 'filters' object to dependencies, which could cause loops
        const currentFilters = JSON.parse(filtersString);

        const params = {
            page,
            size,
            ...currentFilters
        };

        fetchFunction(params)
            .then(response => {
                setData(response.content || []);
                setTotalPages(response.totalPages || 1);
                setTotalElements(response.totalElements || 0);
            })
            .catch(err => {
                setError(err.message || 'Error loading data');
                setData([]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [fetchFunction, page, size, filtersString]);

    useEffect(() => {
        if (autoLoad) {
            loadData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
