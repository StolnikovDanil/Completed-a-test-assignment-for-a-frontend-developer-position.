import { configureStore } from '@reduxjs/toolkit';
import { vehiclesApi} from "../api/vehiclesApi.ts";

export const store = configureStore({
    reducer: {
        [vehiclesApi.reducerPath]: vehiclesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(vehiclesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;