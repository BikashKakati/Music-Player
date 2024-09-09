import { configureStore } from "@reduxjs/toolkit";
import { songApi } from "./apiReducers/songApi";
import { songSlice } from "./sliceReducers/songSlice";

export const store = configureStore({
    reducer:{
        [songApi.reducerPath]: songApi.reducer,
        [songSlice.name]:songSlice.reducer,
    },

    middleware:(getDefaultMiddlewares)=> getDefaultMiddlewares({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: ['songSlice/setCurrentSoundState'],
        },
      }).concat(songApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>