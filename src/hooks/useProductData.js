import { useState, useEffect, useMemo } from 'react';
import { getProductById } from '../api/ProductApi';
import { calculateFinalPrice } from '../utils/productHelpers';

export const useProductData = (productId) => {
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        if (!productId) return;
        
        setIsLoading(true);
        setError(null);

        getProductById(productId)
            .then(productData => {
                setProduct(productData);
            })
            .catch(err => {
                console.error('Error loading product:', err);
                setError("No se pudo cargar el producto. Intenta nuevamente más tarde.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [productId]);
    
    const productInfo = useMemo(() => {
        if (!product) return null;
        
        return {
            isOutOfStock: product.stock === 0,
            onSale: product.discount < 1,
            finalPrice: calculateFinalPrice(product.price, product.discount),
            oldPrice: product.price
        };
    }, [product]);

    return {
        product,
        productInfo,
        isLoading,
        error
    };
};