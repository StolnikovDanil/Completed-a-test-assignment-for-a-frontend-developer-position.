import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Vehicle} from "../types/vehicle.ts";

interface VehiclesResponse {
    products: Vehicle[];
    total: number;
    skip: number;
    limit: number;
}

export const vehiclesApi = createApi({
    reducerPath: 'vehiclesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
    endpoints: (builder) => ({
        getVehicles: builder.query<VehiclesResponse, void>({
            query: () => '/products/category/vehicle',
        }),
        getVehicleById: builder.query<Vehicle, number>({
            query: (id) => `/products/${id}`,
        }),
    }),
});

export const { useGetVehiclesQuery, useGetVehicleByIdQuery } = vehiclesApi;