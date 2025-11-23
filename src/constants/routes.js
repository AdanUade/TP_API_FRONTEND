/**
 * Rutas centralizadas de la aplicación
 * Facilita cambios de URLs y evita errores de tipeo
 */

export const ROUTES = {
    // Rutas públicas
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    PRODUCT_DETAIL: '/product/:productId',
    SEARCH: '/search',
    CART: '/cart',
    CONTACTO: '/contactos',
    TERMINOS: '/terminos',
    UNAUTHORIZED: '/unauthorized',
    
    // Categorías (rutas dinámicas)
    CATEGORY: '/category/:category',
    ROPA: '/category/ropa',
    ZAPATILLAS: '/category/zapatillas',
    ACCESORIOS: '/category/accesorios',
    SALE: '/sale',
    
    // Usuario
    PERFIL: '/perfil',
    PERFIL_EDIT: '/perfil/edit',
    PERFIL_PASSWORD: '/perfil/change-password',
    PERFIL_ORDERS: '/perfil/orders',
    CHECKOUT: '/checkout',
    
    // Seller
    SELLER: {
        DASHBOARD: '/seller',
        HOME: '/seller',
        PRODUCTS: '/seller/products',
        PRODUCT_NEW: '/seller/products/new',
        PRODUCT_EDIT: '/seller/products/edit/:id',
        STOCK: '/seller/stock',
    },
    
    // Admin
    ADMIN: {
        DASHBOARD: '/admin',
        HOME: '/admin',
        PRODUCTS: '/admin/products',
        PRODUCT_EDIT: '/admin/products/edit/:id',
        USERS: '/admin/users',
    },

    // Deprecated 
    SELLER_HOME: '/seller',
    SELLER_PRODUCTS: '/seller/products',
    SELLER_PRODUCT_NEW: '/seller/products/new',
    SELLER_PRODUCT_EDIT: '/seller/products/edit/:id',
    SELLER_STOCK: '/seller/stock',
    ADMIN_HOME: '/admin',
    ADMIN_PRODUCTS: '/admin/products',
    ADMIN_PRODUCT_EDIT: '/admin/products/edit/:id',
    ADMIN_USERS: '/admin/users',
};

/**
 * Helpers para construir rutas dinámicas
 */
export const buildRoute = {
    productDetail: (id) => `/product/${id}`,
    sellerProductEdit: (id) => `/seller/products/edit/${id}`,
    adminProductEdit: (id) => `/admin/products/edit/${id}`,
};
