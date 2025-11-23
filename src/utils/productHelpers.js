export const calculateFinalPrice = (price, discount) => {
    return price * discount;
};

export const getDiscountPercentage = (discount) => {
    if (discount >= 1) return 0;
    return Math.round((1 - discount) * 100);
};


export const isProductOnSale = (product) => product && product.discount < 1;

export const isProductOutOfStock = (product) => product && product.stock === 0;