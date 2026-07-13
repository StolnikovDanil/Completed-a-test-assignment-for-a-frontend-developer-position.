import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reviewFormSchema, type ReviewFormValues } from '../../utils/validation';
import type { NewReviewInput } from '../../types/vehicle';
import Input from '../../ui/Input/Input';
import Select from '../../ui/Select/Select';
import Textarea from '../../ui/Textarea/Textarea';
import Button from '../../ui/Button/Button';
import FormField from '../../ui/FormField/FormField';
import styles from './ReviewForm.module.css';

interface ReviewFormProps {
    onAddReview: (review: NewReviewInput) => void;
}

const defaultValues: ReviewFormValues = {
    reviewerName: '',
    comment: '',
    rating: 5,
};

const ReviewForm = ({ onAddReview }: ReviewFormProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ReviewFormValues>({
        resolver: zodResolver(reviewFormSchema),
        defaultValues,
    });

    const onSubmit = (values: ReviewFormValues) => {
        onAddReview(values);
        reset(defaultValues);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <FormField label="Ім'я" htmlFor="reviewerName" error={errors.reviewerName?.message}>
                <Input id="reviewerName" type="text" {...register('reviewerName')} />
            </FormField>

            <FormField label="Текст відгуку" htmlFor="comment" error={errors.comment?.message}>
                <Textarea id="comment" {...register('comment')} />
            </FormField>

            <FormField label="Оцінка" htmlFor="rating" error={errors.rating?.message}>
                <Select id="rating" {...register('rating', { valueAsNumber: true })}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </Select>
            </FormField>

            <Button type="submit">Залишити відгук</Button>
        </form>
    );
};

export default ReviewForm;