import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reviewFormSchema, type ReviewFormValues } from '../../utils/validation';
import type { NewReviewInput } from '../../types/vehicle';
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
            <div className={styles.field}>
                <label className={styles.label} htmlFor="reviewerName">Ім'я</label>
                <input className={styles.input} id="reviewerName" type="text" {...register('reviewerName')} />
                {errors.reviewerName && <span className={styles.error}>{errors.reviewerName.message}</span>}
            </div>

            <div className={styles.field}>
                <label className={styles.label} htmlFor="comment">Текст відгуку</label>
                <textarea className={styles.textarea} id="comment" {...register('comment')} />
                {errors.comment && <span className={styles.error}>{errors.comment.message}</span>}
            </div>

            <div className={styles.field}>
                <label className={styles.label} htmlFor="rating">Оцінка</label>
                <select className={styles.select} id="rating" {...register('rating', { valueAsNumber: true })}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                {errors.rating && <span className={styles.error}>{errors.rating.message}</span>}
            </div>

            <button type="submit" className={styles.submitButton}>Залишити відгук</button>
        </form>
    );
};

export default ReviewForm;