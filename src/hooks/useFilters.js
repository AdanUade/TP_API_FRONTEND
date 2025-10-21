import { useState } from 'react';
import { SORT_OPTIONS } from '../constants/productCategories';

export const useFilters = (initialFilters = {}) => {
    const [filters, setFilters] = useState({
        sortByPrice: SORT_OPTIONS.DEFAULT,
        onSale: false,
        category: null,
        minPrice: null,
        maxPrice: null,
        inStock: true,
        ...initialFilters
    });

    const updateFilter = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const setMultipleFilters = (newFilters) => {
        setFilters(prev => ({
            ...prev,
            ...newFilters
        }));
    };

    const resetFilters = () => {
        setFilters({
            sortByPrice: SORT_OPTIONS.DEFAULT,
            onSale: false,
            category: null,
            minPrice: null,
            maxPrice: null,
            inStock: true,
            ...initialFilters
        });
    };

    const toggleFilter = (key) => {
        setFilters(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const hasActiveFilters = () => {
        return (
            filters.sortByPrice !== SORT_OPTIONS.DEFAULT ||
            filters.onSale === true ||
            filters.category !== null ||
            filters.minPrice !== null ||
            filters.maxPrice !== null ||
            filters.inStock !== true
        );
    };

    const getActiveFilters = () => {
        return Object.entries(filters).reduce((active, [key, value]) => {
            if (value !== null && value !== undefined && value !== false) {
                active[key] = value;
            }
            return active;
        }, {});
    };

    const countActiveFilters = () => {
        let count = 0;
        if (filters.sortByPrice !== SORT_OPTIONS.DEFAULT) count++;
        if (filters.onSale) count++;
        if (filters.category) count++;
        if (filters.minPrice !== null) count++;
        if (filters.maxPrice !== null) count++;
        if (!filters.inStock) count++; 
        return count;
    };

    return {
        filters,
        updateFilter,
        setMultipleFilters,
        resetFilters,
        toggleFilter,
        hasActiveFilters,
        getActiveFilters,
        countActiveFilters,
    };
};
