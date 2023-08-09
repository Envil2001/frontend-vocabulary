
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "../../app/axios"
export const userGetById = createAsyncThunk(
    "users/fetchUserById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`/users/user/${id}`);
            if (!res.status === 200) {
                throw new Error('Can\'t authorization. Server error');
            }
            return res.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }
);





const initialState = {
    users: [],
    user: null,
    loading: true
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUsers: (state, action) => {
            state.user = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder
            // GET USER BY ID
            .addCase(userGetById.pending, (state) => {
                state.user = null;
                state.loading = true;
            })
            .addCase(userGetById.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(userGetById.rejected, (state) => {
                state.user = null;
                state.loading = true;
            })

    }
});
export const { getUsers } = userSlice.actions;
export default userSlice.reducer;
