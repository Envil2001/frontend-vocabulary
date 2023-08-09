import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../app/axios';

// Создаем асинхронные санки для выполнения операций с сервером
export const userLogin = createAsyncThunk('auth/login', async (params, { rejectWithValue }) => {
    try {
        const res = await axios.post('/auth/login', params);
        if (res.status !== 200) {
            throw new Error("Can't authorization. Server error");
        }
        return res.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

export const userRegistration = createAsyncThunk(
    'auth/registration',
    async (params, { rejectWithValue }) => {
        try {
            const res = await axios.post('/auth/registration', params);
            if (res.status !== 200) {
                throw new Error("Can't registration. Server error");
            }
            return res.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get('/auth/refresh', { withCredentials: true });
        return res.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});

export const userUpdate = createAsyncThunk(
    'users/userUpdate',
    async ({ id, params }, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`/users/user/${id}/update`, params);
            if (res.status !== 200) {
                throw new Error("Can't update user. Server error");
            }
            return res.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

const initialState = {
    loading: false,
    userInfo: null, 
    userToken: null, 
    error: null,
    success: false, 
    activationCodeValid: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.userInfo = null;
            state.userToken = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
        setUser: (state, action) => {
            state.userInfo = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload.user;
                state.userToken = action.payload.accessToken;
                localStorage.setItem('user', JSON.stringify(action.payload.user));
                localStorage.setItem('token', action.payload.accessToken);
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(userRegistration.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userRegistration.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload.user;
                state.userToken = action.payload.accessToken;
                localStorage.setItem('user', JSON.stringify(action.payload.user));
                localStorage.setItem('token', action.payload.accessToken);
            })
            .addCase(userRegistration.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(userUpdate.pending, (state) => {
                state.loading = true;
            })
            .addCase(userUpdate.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.loading = false;
            })
            .addCase(userUpdate.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const selectIsAuth = (state) => state.auth.userInfo;
export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer;
