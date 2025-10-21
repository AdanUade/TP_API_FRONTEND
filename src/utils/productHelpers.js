export const calculateFinalPrice = (price, discount) => {
    return price * discount;
};

export const getDiscountPercentage = (discount) => {
    if (discount >= 1) return 0;
    return Math.round((1 - discount) * 100);
};

/**
 * Verifica si un producto está en oferta.
 * @param {object} product - El objeto del producto.
 * @returns {boolean} - True si el producto está en oferta.
 */
export const isProductOnSale = (product) => product && product.discount < 1;

/**
 * Verifica si un producto está agotado.
 * @param {object} product - El objeto del producto.
 * @returns {boolean} - True si el producto está agotado.
 */
export const isProductOutOfStock = (product) => product && product.stock === 0;