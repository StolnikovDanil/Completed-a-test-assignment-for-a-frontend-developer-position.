import type { Vehicle, FilterParams } from '../types/vehicle';

export function filterVehicles(vehicles: Vehicle[], filters: FilterParams): Vehicle[] {
    return vehicles.filter((vehicle) => {
        const matchesSearch = vehicle.title
            .toLowerCase()
            .includes(filters.search.toLowerCase());

        const matchesBrand = !filters.brand || vehicle.brand === filters.brand;

        const matchesMinPrice = filters.minPrice === null || vehicle.price >= filters.minPrice;

        const matchesMaxPrice = filters.maxPrice === null || vehicle.price <= filters.maxPrice;

        return matchesSearch && matchesBrand && matchesMinPrice && matchesMaxPrice;
    });
}