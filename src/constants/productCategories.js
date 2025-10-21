export const PRODUCT_CATEGORIES = {
    ROPA: 'ROPA',
    ZAPATILLAS: 'ZAPATILLAS',
    ACCESORIOS: 'ACCESORIOS',
};

export const CATEGORY_INFO = {
    [PRODUCT_CATEGORIES.ROPA]: {
        title: 'Ropa',
        subtitle: 'Encuentra tu estilo único',
        icon: '👕',
        path: '/category/ropa',
    },
    [PRODUCT_CATEGORIES.ZAPATILLAS]: {
        title: 'Zapatillas',
        subtitle: 'Dale poder a tus pasos',
        icon: '👟',
        path: '/category/zapatillas',
    },
    [PRODUCT_CATEGORIES.ACCESORIOS]: {
        title: 'Accesorios',
        subtitle: 'Completa tu look',
        icon: '🎒',
        path: '/category/accesorios',
    },
};

export const SORT_OPTIONS = {
    DEFAULT: 'default',
    PRICE_ASC: 'price-asc',
    PRICE_DESC: 'price-desc',
    NAME_ASC: 'name-asc',
    NAME_DESC: 'name-desc',
    NEWEST: 'newest',
    OLDEST: 'oldest',
};


export const SORT_LABELS = {
    [SORT_OPTIONS.DEFAULT]: 'Relevancia',
    [SORT_OPTIONS.PRICE_ASC]: 'Precio: Menor a Mayor',
    [SORT_OPTIONS.PRICE_DESC]: 'Precio: Mayor a Menor',
    [SORT_OPTIONS.NAME_ASC]: 'Nombre: A-Z',
    [SORT_OPTIONS.NAME_DESC]: 'Nombre: Z-A',
    [SORT_OPTIONS.NEWEST]: 'Más Recientes',
    [SORT_OPTIONS.OLDEST]: 'Más Antiguos',
};