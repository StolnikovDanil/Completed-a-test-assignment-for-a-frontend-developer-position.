import { useMemo, useState, useCallback } from 'react';
import { useGetVehiclesQuery } from '../../api/vehiclesApi';
import VehicleList from '../../components/VehicleList/VehicleList';
import FilterForm from '../../components/FilterForm/FilterForm';
import { filterVehicles } from '../../utils/filterVehicles';
import type { FilterParams } from '../../types/vehicle';
import styles from './HomePage.module.css';

const initialFilters: FilterParams = {
    search: '',
    brand: null,
    minPrice: null,
    maxPrice: null,
};

const HomePage = () => {
    const { data, isLoading, isError } = useGetVehiclesQuery();
    const [filters, setFilters] = useState<FilterParams>(initialFilters);

    const handleFilterChange = useCallback((newFilters: FilterParams) => {
        setFilters(newFilters);
    }, []);

    const brands = useMemo(() => {
        if (!data) return [];
        return Array.from(new Set(data.products.map((vehicle) => vehicle.brand)));
    }, [data]);

    const filteredVehicles = useMemo(() => {
        if (!data) return [];
        return filterVehicles(data.products, filters);
    }, [data, filters]);

    if (isLoading) {
        return (
            <main className={styles.page}>
                <p className={styles.statusMessage}>Завантаження...</p>
            </main>
        );
    }

    if (isError) {
        return (
            <main className={styles.page}>
                <p className={styles.errorMessage}>Не вдалося завантажити список автомобілів.</p>
            </main>
        );
    }

    if (!data || data.products.length === 0) {
        return (
            <main className={styles.page}>
                <p className={styles.statusMessage}>Автомобілів не знайдено.</p>
            </main>
        );
    }

    return (
        <main className={styles.page}>
            <h1 className={styles.title}>Car Showroom</h1>
            <FilterForm brands={brands} onFilterChange={handleFilterChange} />
            {filteredVehicles.length === 0 ? (
                <p className={styles.statusMessage}>За заданими фільтрами нічого не знайдено.</p>
            ) : (
                <VehicleList vehicles={filteredVehicles} />
            )}
        </main>
    );
};

export default HomePage;