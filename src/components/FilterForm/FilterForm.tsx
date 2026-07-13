import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { filterFormSchema, type FilterFormValues } from '../../utils/validation';
import { useDebounce } from '../../hooks/useDebounce';
import type { FilterParams } from '../../types/vehicle';
import Input from '../../ui/Input/Input';
import Select from '../../ui/Select/Select';
import Button from '../../ui/Button/Button';
import FormField from "../../ui/FormField/FormField.tsx";
import styles from './FilterForm.module.css';
import { z } from 'zod';

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
            minPrice: errors.minPrice
                ? Infinity
                : (values.minPrice as number | null),
            maxPrice: errors.maxPrice
                ? -Infinity
                : (values.maxPrice as number | null),
        });
    }, [
        debouncedSearch,
        values.brand,
        values.minPrice,
        values.maxPrice,
        errors.minPrice,
        errors.maxPrice,
        onFilterChange,
    ]);

    const handleReset = () => {
        reset(defaultValues);
    };

    return (
        <form className={styles.form}>
            <FormField label="Пошук за назвою" htmlFor="search">
                <Input id="search" type="text" {...register('search')} />
            </FormField>

            <FormField label="Бренд" htmlFor="brand">
                <Select id="brand" {...register('brand')}>
                    <option value="">Усі бренди</option>

                    {brands.map((brandName) => (
                        <option key={brandName} value={brandName}>
                            {brandName}
                        </option>
                    ))}
                </Select>
            </FormField>

            <div className={styles.priceRow}>
                <FormField
                    label="Ціна від"
                    htmlFor="minPrice"
                    error={errors.minPrice?.message}
                    errorPosition="absolute"
                >
                    <Input
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
                </FormField>

                <FormField
                    label="Ціна до"
                    htmlFor="maxPrice"
                    error={errors.maxPrice?.message}
                    errorPosition="absolute"
                >
                    <Input
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
                </FormField>
            </div>

            <Button variant="secondary" className={styles.resetButton} onClick={handleReset}>
                Скинути фільтри
            </Button>
        </form>
    );
};

export default FilterForm;