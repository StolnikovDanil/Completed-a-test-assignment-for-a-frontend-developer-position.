import type { Review } from '../../types/vehicle';
import styles from './ReviewItem.module.css';

interface ReviewItemProps {
    review: Review;
}

const ReviewItem = ({ review }: ReviewItemProps) => {
    const formattedDate = new Date(review.date).toLocaleDateString('uk-UA');

    return (
        <article className={styles.review}>
            <header className={styles.header}>
                <span className={styles.reviewerName}>{review.reviewerName}</span>
                <span className={styles.rating}>Оцінка: {review.rating}/5</span>
                <time className={styles.date} dateTime={review.date}>{formattedDate}</time>
            </header>
            <p className={styles.comment}>{review.comment}</p>
        </article>
    );
};

export default ReviewItem;