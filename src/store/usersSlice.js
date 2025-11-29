import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUsers } from '../api/UserApi';

export const fetchUsers = createAsyncThunk(
    'adminUsers/fetchUsers',
    async (params) => {
        const response = await getAllUsers(params);
        return response;
    }
);

const initialState = {
    items: [],
    totalPages: 0,
    totalElements: 0,
    isLoading: false,
    error: null
};

const usersSlice = createSlice({
    name: 'adminUsers',
    initialState,
    reducers: {
        clearUsers: (state) => {
            state.items = [];
            state.totalPages = 0;
            state.totalElements = 0;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.content || [];
                state.totalPages = action.payload.totalPages || 0;
                state.totalElements = action.payload.totalElements || 0;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { clearUsers } = usersSlice.actions;
export default usersSlice.reducer;
