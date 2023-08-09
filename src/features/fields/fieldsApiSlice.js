import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "../../app/axios"

export const fetchFields = createAsyncThunk('fields/fetchFields', async (page, { rejectWithValue }) => {
    try {
        const res = await axios.get(`/fields?page=${page}&limit=10`);
        return res.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});
export const fetchFieldbyId = createAsyncThunk('fields/fetchFieldbyId', async (id) => {
    const { data } = await axios.get(`/fields/field/${id}`);
    return data;
});
export const fetchFieldOwner = createAsyncThunk('fields/fetchFieldOwner', async (id) => {
    const { data } = await axios.get(`/fields/fields/${id}/owner`);
    return data;
});
export const createField = createAsyncThunk('fields/createField', async (params) => {
    const { data } = await axios.post(`/fields/create`, params);
    return data;
});
export const deleteField = createAsyncThunk('fields/deleteField', async (id) => {
    const { data } = await axios.delete(`/fields/field/${id}`);
    return data;
});
export const updateField = createAsyncThunk('fields/updateField', async ({ folderId, formData }) => {
    const { data } = await axios.patch(`/fields/field/${folderId}`, formData);
    return data;
});

export const createWord = createAsyncThunk(
    "words/createWord",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const res = await axios.post(`/words/createword/${id}`, formData);
            if (!res.status === 200) {
                throw new Error('Can\'t add. Server error');
            }
            return res.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }
);
export const deleteWord = createAsyncThunk(
    "words/deleteWord",
    async ({ post_id, _id }, { rejectWithValue }) => {
        try {
            const res = await axios.delete(`/words/deleteword/${post_id}/${_id}`);
            if (!res.status === 200) {
                throw new Error('Can\'t add. Server error');
            }
            return res.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }
);
export const updateWord = createAsyncThunk(
    "words/updateWord",
    async ({ fieldId, wordId, formData }, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`/words/updateeword/${fieldId}/${wordId}`, formData);
            if (!res.status === 200) {
                throw new Error('Can\'t add. Server error');
            }
            return res.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }
);


const initialState = {
    fields: [],
    words: [],
    field: {},
    userFields: [],
    loading: true,
    hasMore: true,
    currentPage: 0,
};

const fieldsSlice = createSlice({
    name: 'fields',
    initialState,
    reducers: {
        resetFields(state) {
            state.fields = initialState.fields; // Сбрасываем fields до начального значения
            state.currentPage = 0;
            state.hasMore = true;
        },
    },
    extraReducers: (builder) => {
        builder
            // FETCHING ALL FIELDS
            .addCase(fetchFields.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFields.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.length > 0) {
                    state.fields = [...state.fields, ...action.payload]
                    state.currentPage++;
                    state.hasMore = action.payload.length === 10;
                } else {
                    // Это последняя страница, устанавливаем hasMore в false
                    state.hasMore = false;
                }
            })
            .addCase(fetchFields.rejected, (state, action) => {
                state.loading = false;
            })
            // FETCHING BY ID FIELD
            .addCase(fetchFieldbyId.pending, (state) => {
                state.field = {};
                state.loading = true;
            })
            .addCase(fetchFieldbyId.fulfilled, (state, action) => {
                state.field = action.payload;

                state.fields = []
                state.currentPage = 0;
                state.loading = false;
            })
            .addCase(fetchFieldbyId.rejected, (state) => {
                state.field = {};
                state.loading = true;
            })
            // CREATE FIELD
            .addCase(createField.pending, (state) => {
                state.loading = true;
            })
            .addCase(createField.fulfilled, (state, action) => {
                state.loading = false;
                state.fields = [...state.fields, action.payload];
                state.userFields = [...state.userFields, action.payload];
            })
            .addCase(createField.rejected, (state) => {
                state.loading = false;
            })
            // DELETE FIELD
            .addCase(deleteField.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteField.fulfilled, (state, action) => {
                state.loading = false;
                const {
                    arg
                } = action.meta;
                if (arg) {
                    state.userFields = state.userFields.filter((item) => item._id !== arg);
                    state.fields = state.fields.filter((item) => item._id !== arg);
                }
            })
            .addCase(deleteField.rejected, (state) => {
                state.loading = false;
            })
            // GET FIELD USERS
            .addCase(fetchFieldOwner.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFieldOwner.fulfilled, (state, action) => {
                state.loading = false;
                state.userFields = action.payload;
            })
            .addCase(fetchFieldOwner.rejected, (state) => {
                state.loading = false;
            })
            // UPDATE FIELD 
            .addCase(updateField.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateField.fulfilled, (state, action) => {
                state.loading = false;
                const {
                    arg: { folderId },
                } = action.meta;

                if (folderId) {
                    state.userFields = state.userFields.map((item) =>
                        item._id === folderId ? action.payload : item
                    );
                    state.fields = state.fields.map((item) =>
                        item._id === folderId ? action.payload : item
                    );
                }
            })
            .addCase(updateField.rejected, (state) => {
                state.loading = false;
            })
            // CREATE WORD
            .addCase(createWord.pending, (state) => {
                state.words = [];
                state.loading = true;
            })
            .addCase(createWord.fulfilled, (state, action) => {
                state.field.words.push(action.payload)
                state.loading = false;
            })
            .addCase(createWord.rejected, (state) => {
                state.words = [];
                state.loading = true;
            })
            // DELETE WORD
            .addCase(deleteWord.pending, (state) => {
                state.words = [];
                state.loading = true;
            })
            .addCase(deleteWord.fulfilled, (state, action) => {
                const {
                    arg
                } = action.meta;
                if (arg) {
                    state.field.words = state.field.words.filter((item) => item._id !== arg._id);
                }
                state.loading = false;
            })
            .addCase(deleteWord.rejected, (state) => {
                state.words = [];
                state.loading = true;
            })
            // UPDATE WORD
            .addCase(updateWord.pending, (state) => {
                state.words = [];
                state.loading = true;
            })
            .addCase(updateWord.fulfilled, (state, action) => {
                if (state.field) {
                    const { fieldId, wordId, formData } = action.meta.arg;
                    const updatedField = { ...state.field };
                    const updatedWords = updatedField.words.map((word) =>
                        word._id === wordId ? { ...word, ...formData } : word
                    );
                    updatedField.words = updatedWords;
                    state.field = updatedField;
                }
                state.loading = false;
            })
            .addCase(updateWord.rejected, (state) => {
                state.words = [];
                state.loading = true;
            })
    }
})
export const { resetFields } = fieldsSlice.actions;
export default fieldsSlice.reducer;