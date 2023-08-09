
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import fieldsReducer from "../features/fields/fieldsApiSlice"
import usersReducer from "../features/users/usersApiSlice"
import searchReducer from "../features/search/searchSlice"

const rooteReducer = combineReducers({
    auth: authReducer,
    fields: fieldsReducer,
    users: usersReducer,
    search: searchReducer,
})
export const store = configureStore({
    reducer: rooteReducer, // Pass the rootReducer directly here
})

