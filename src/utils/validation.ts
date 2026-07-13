import { z } from 'zod';


const nullablePrice = z.preprocess((val) => {
    if (val === '' || val === undefined) return null;
    if (typeof val === 'number' && Number.isNaN(val)) return null;
    return val;
}, z.number().nonnegative('Ціна не може бути відʼємною').nullable());

export const filterFormSchema = z
    .object({
        search: z.string(),
        brand: z.string().nullable(),
        minPrice: nullablePrice,
        maxPrice: nullablePrice,
    })
    .refine(
        (data) => data.minPrice === null || data.maxPrice === null || data.minPrice <= data.maxPrice,
        {
            message: 'Мінімальна ціна не може бути більшою за максимальну',
            path: ['minPrice'],
        }
    );

export type FilterFormValues = z.infer<typeof filterFormSchema>;

export const reviewFormSchema = z.object({
    reviewerName: z
        .string()
        .min(1, 'Введіть ім\'я')
        .max(50, 'Ім\'я не може перевищувати 50 символів'),
    comment: z
        .string()
        .min(1, 'Введіть текст відгуку')
        .max(500, 'Відгук не може перевищувати 500 символів'),
    rating: z
        .number()
        .min(1, 'Мінімальна оцінка — 1')
        .max(5, 'Максимальна оцінка — 5'),
});

export type ReviewFormValues = z.infer<typeof reviewFormSchema>;