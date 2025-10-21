/**
 * Roles de usuario y navegación por rol
 */

export const USER_ROLES = {
    USER: 'USER',
    SELLER: 'SELLER',
    ADMIN: 'ADMIN',
};

/**
 * Items de navegación por rol de usuario
 */
export const NAV_ITEMS = {
    [USER_ROLES.USER]: [
        { path: '/category/ropa', label: 'Ropa' },
        { path: '/category/zapatillas', label: 'Zapatillas' },
        { path: '/category/accesorios', label: 'Accesorios' },
        { path: '/sale', label: 'Sale' },
    ],
    [USER_ROLES.SELLER]: [
        { path: '/seller/products/new', label: 'Nuevo Producto' },
        { path: '/seller/products', label: 'Mis Productos' },
        { path: '/seller/stock', label: 'Agotados' },
    ],
    [USER_ROLES.ADMIN]: [
        { path: '/admin/products', label: 'Productos' },
        { path: '/admin/users', label: 'Usuarios' },
    ],
};