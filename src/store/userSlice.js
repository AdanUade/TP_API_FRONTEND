import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isAuthenticated, removeToken, authenticate, register, saveToken } from '../api/AuthApi';
import { getUserMe, updateUserMe } from '../api/UserApi';

export const refreshUser = createAsyncThunk(
    'user/refreshUser',
    async () => {
        if (!isAuthenticated()) {
            return null;
        }
        const userData = await getUserMe();
        return userData;
    }
);

export const loginUser = createAsyncThunk(
    'user/login',
    async (credentials, { dispatch }) => {
        const response = await authenticate(credentials);
        saveToken(response.access_token);
        const user = await dispatch(refreshUser()).unwrap();
        return user;
    }
);

export const registerUser = createAsyncThunk(
    'user/register',
    async (userData, { dispatch }) => {
        const response = await register(userData);
        saveToken(response.access_token);
        const user = await dispatch(refreshUser()).unwrap();
        return user;
    }
);

export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async (userData, { dispatch }) => {
        await updateUserMe(userData);
        const user = await dispatch(refreshUser()).unwrap();
        return user;
    }
);

export const updatePassword = createAsyncThunk(
    'user/updatePassword',
    async (passwordData) => {
        await updateUserMe(passwordData);
        return;
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

            // Login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Register
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Update Profile
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Update Password
            .addCase(updatePassword.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updatePassword.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(updatePassword.rejected, (state, action) => {
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
