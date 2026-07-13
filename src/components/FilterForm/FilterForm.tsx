import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { filterFormSchema, type FilterFormValues } from '../../utils/validation';
import { useDebounce } from '../../hooks/useDebounce';
import type { FilterParams } from '../../types/vehicle';
import styles from './FilterForm.module.css';
import {z} from "zod";

interface FilterFormProps {
    brands: string[];
    onFilterChange: (filters: FilterParams) => void;
}

const defaultValues: FilterFormValues = {
    search: '',
    brand: null,
    minPrice: null,
    maxPrice: null,
};

const FilterForm = ({ brands, onFilterChange }: FilterFormProps) => {
    const {
        register,
        watch,
        reset,
        formState: { errors },
    } = useForm<
        z.input<typeof filterFormSchema>,
        unknown,
        z.output<typeof filterFormSchema>
    >({
        resolver: zodResolver(filterFormSchema),
        defaultValues,
        mode: 'onChange',
    });

    const values = watch();

    const debouncedSearch = useDebounce(values.search, 300);

    useEffect(() => {
        onFilterChange({
            search: debouncedSearch,
            brand: values.brand || null,
            minPrice: values.minPrice as number | null,
            maxPrice: values.maxPrice as number | null,
        });
    }, [
        debouncedSearch,
        values.brand,
        values.minPrice,
        values.maxPrice,
        onFilterChange,
    ]);

    const handleReset = () => {
        reset(defaultValues);
    };

    return (
        <form className={styles.form}>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="search">
                    Пошук за назвою
                </label>

                <input
                    className={styles.input}
                    id="search"
                    type="text"
                    {...register('search')}
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label} htmlFor="brand">
                    Бренд
                </label>

                <select
                    className={styles.select}
                    id="brand"
                    {...register('brand')}
                >
                    <option value="">Усі бренди</option>

                    {brands.map((brandName) => (
                        <option key={brandName} value={brandName}>
                            {brandName}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.priceRow}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="minPrice">
                        Ціна від
                    </label>

                    <input
                        className={styles.input}
                        id="minPrice"
                        type="number"
                        min={0}
                        {...register('minPrice', {
                            setValueAs: (value) => {
                                if (
                                    value === '' ||
                                    value === null ||
                                    value === undefined
                                ) {
                                    return null;
                                }

                                return Number(value);
                            },
                        })}
                    />

                    {errors.minPrice && (
                        <span className={styles.error}>
                            {errors.minPrice.message}
                        </span>
                    )}
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="maxPrice">
                        Ціна до
                    </label>

                    <input
                        className={styles.input}
                        id="maxPrice"
                        type="number"
                        min={0}
                        {...register('maxPrice', {
                            setValueAs: (value) => {
                                if (
                                    value === '' ||
                                    value === null ||
                                    value === undefined
                                ) {
                                    return null;
                                }

                                return Number(value);
                            },
                        })}
                    />

                    {errors.maxPrice && (
                        <span className={styles.error}>
                            {errors.maxPrice.message}
                        </span>
                    )}
                </div>
            </div>

            <button
                type="button"
                className={styles.resetButton}
                onClick={handleReset}
            >
                Скинути фільтри
            </button>
        </form>
    );
};

export default FilterForm;