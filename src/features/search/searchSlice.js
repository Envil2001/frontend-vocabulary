import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../app/axios";

const initialState = {
    filteredItems: [],
    loading: false,
};

// Асинхронное действие для поиска постов
export const searchPosts = createAsyncThunk(
    "search/searchPosts",
    async (searchTerm, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/fields/search?q=${searchTerm}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // FETCHING ALL FIELDS
            .addCase(searchPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchPosts.fulfilled, (state, action) => {
                state.filteredItems = action.payload;
                state.loading = false;
            })
            .addCase(searchPosts.rejected, (state) => {
                state.loading = true;
            })

    }
});

export default searchSlice.reducer;
