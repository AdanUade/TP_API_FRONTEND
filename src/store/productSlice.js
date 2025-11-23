import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as ProductApi from '../api/ProductApi';
import { DEFAULT_PAGINATION } from '../constants/apiConfig';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (params, { rejectWithValue }) => {
        try {
            const response = await ProductApi.getAllProducts(params);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchProductsByCategory = createAsyncThunk(
    'products/fetchProductsByCategory',
    async ({ category, ...params }, { rejectWithValue }) => {
        try {
            const response = await ProductApi.getProductsByCategory({ category, ...params });
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchProductsOnSale = createAsyncThunk(
    'products/fetchProductsOnSale',
    async (params, { rejectWithValue }) => {
        try {
            const response = await ProductApi.getProductsOnSale(params);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await ProductApi.getProductById(id);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const searchProducts = createAsyncThunk(
    'products/searchProducts',
    async ({ query, ...params }, { rejectWithValue }) => {
        try {
            const response = await ProductApi.searchProducts({ query, ...params });
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const createProduct = createAsyncThunk(
    'products/createProduct',
    async ({ productRequest, image, token }, { rejectWithValue }) => {
        try {
            const response = await ProductApi.createProductWithImage({ productRequest, image, token });
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ productId, productRequest, token }, { rejectWithValue }) => {
        try {
            const response = await ProductApi.updateProduct({ productId, productRequest, token });
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async ({ productId, token }, { rejectWithValue }) => {
        try {
            await ProductApi.deleteProduct({ productId, token });
            return productId;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const initialState = {
    items: [],
    selectedProduct: null,
    totalPages: 0,
    totalElements: 0,
    isLoading: false,
    error: null,
    pagination: {
        page: DEFAULT_PAGINATION.PAGE,
        size: DEFAULT_PAGINATION.SIZE
    }
};

const handlePending = (state) => {
    state.isLoading = true;
    state.error = null;
};

const handleFulfilledList = (state, action) => {
    state.isLoading = false;
    state.items = action.payload.content || [];
    state.totalPages = action.payload.totalPages || 0;
    state.totalElements = action.payload.totalElements || 0;
};

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.items = [];
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
        },
        clearProducts: (state) => {
            state.items = [];
            state.totalPages = 0;
            state.totalElements = 0;
            state.error = null;
        },
        setPagination: (state, action) => {
            state.pagination = { ...state.pagination, ...action.payload };
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Products
            .addCase(fetchProducts.pending, handlePending)
            .addCase(fetchProducts.fulfilled, handleFulfilledList)
            .addCase(fetchProducts.rejected, handleRejected)

            // Fetch Products By Category
            .addCase(fetchProductsByCategory.pending, handlePending)
            .addCase(fetchProductsByCategory.fulfilled, handleFulfilledList)
            .addCase(fetchProductsByCategory.rejected, handleRejected)

            // Fetch Products On Sale
            .addCase(fetchProductsOnSale.pending, handlePending)
            .addCase(fetchProductsOnSale.fulfilled, handleFulfilledList)
            .addCase(fetchProductsOnSale.rejected, handleRejected)

            // Search Products
            .addCase(searchProducts.pending, handlePending)
            .addCase(searchProducts.fulfilled, handleFulfilledList)
            .addCase(searchProducts.rejected, handleRejected)

            // Fetch Product By ID
            .addCase(fetchProductById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.selectedProduct = null;
            })

            // Create Product
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items.push(action.payload);
                // Optionally update selectedProduct if navigating to detail
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Update Product
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedProduct = action.payload;
                // Update item in list if present
                const index = state.items.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Delete Product
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = state.items.filter(item => item.id !== action.payload);
                if (state.selectedProduct?.id === action.payload) {
                    state.selectedProduct = null;
                }
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { clearSelectedProduct, clearProducts, setPagination } = productSlice.actions;
export default productSlice.reducer;
