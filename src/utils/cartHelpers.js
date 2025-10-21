export const calculateCartTotal = (cartItems) => {
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
        return 0;
    }
    
    return cartItems.reduce((sum, item) => {
        const finalPrice = item.price * item.discount;
        return sum + finalPrice * item.quantity;
    }, 0);
};

export const calculateTotalItems = (cartItems) => {
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
        return 0;
    }
    
    return cartItems.reduce((total, item) => total + item.quantity, 0);
};

export const adaptServerItemToLocal = (serverItem) => {
    return {
        id: serverItem.productId,
        name: serverItem.productName,
        price: serverItem.productPrice,
        discount: serverItem.productDiscount || 1,
        image: serverItem.productImage,
        quantity: serverItem.quantity,
        stock: serverItem.productStock || 999,
    };
};

export const calculateItemPrice = (item) => {
    return item.price * item.discount;
};

export const calculateItemSubtotal = (item) => {
    return calculateItemPrice(item) * item.quantity;
};

export const calculateTotalSavings = (cartItems) => {
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
        return 0;
    }
    
    return cartItems.reduce((savings, item) => {
        const originalTotal = item.price * item.quantity;
        const discountedTotal = item.price * item.discount * item.quantity;
        return savings + (originalTotal - discountedTotal);
    }, 0);
};