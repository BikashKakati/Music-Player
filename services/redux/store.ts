import { configureStore } from "@reduxjs/toolkit";
import { songApi } from "./apiReducers/songApi";

export const store = configureStore({
    reducer:{
        [songApi.reducerPath]: songApi.reducer,
    },

    middleware:(getDefaultMiddlewares)=> getDefaultMiddlewares().concat(songApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>