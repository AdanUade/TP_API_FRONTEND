import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isAuthenticated, removeToken } from '../api/AuthApi';
import { getUserMe } from '../api/UserApi';

export const refreshUser = createAsyncThunk(
    'user/refreshUser',
    async (_, { rejectWithValue }) => {
        if (!isAuthenticated()) {
            return null;
        }
        try {
            const userData = await getUserMe();
            return userData;
        } catch (error) {
            removeToken();
            return rejectWithValue(error.response?.data || 'Error fetching user');
        }
    }
);

export const logoutUser = createAsyncThunk(
    'user/logout',
    async () => {
        removeToken();
        return null;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isLoading: true,
        error: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(refreshUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(refreshUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
            })
            .addCase(refreshUser.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
            });
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
