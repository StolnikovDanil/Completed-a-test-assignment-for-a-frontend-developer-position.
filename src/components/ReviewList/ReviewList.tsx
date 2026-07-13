import { useState } from 'react';
import type { Review } from '../../types/vehicle';
import ReviewItem from '../ReviewItem/ReviewItem';
import Button from '../../ui/Button/Button';
import styles from './ReviewList.module.css';
import { PAGE_SIZE } from '../../constants/constants.ts';

interface ReviewListProps {
    reviews: Review[];
}

const ReviewList = ({ reviews }: ReviewListProps) => {
    const [currentPage, setCurrentPage] = useState(1);

    const sortedReviews = [...reviews].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    if (sortedReviews.length === 0) {
        return <p className={styles.empty}>Відгуків поки немає.</p>;
    }

    const totalPages = Math.ceil(sortedReviews.length / PAGE_SIZE);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const visibleReviews = sortedReviews.slice(startIndex, startIndex + PAGE_SIZE);

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(1, prev - 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    };

    return (
        <div>
            <section className={styles.list}>
                {visibleReviews.map((review, index) => (
                    <ReviewItem key={`${review.reviewerEmail}-${index}`} review={review} />
                ))}
            </section>

            {totalPages > 1 && (
                <nav className={styles.pagination} aria-label="Пагінація відгуків">
                    <Button
                        variant="icon"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        aria-label="Попередня сторінка"
                    >
                        ←
                    </Button>

                    <span className={styles.pageInfo}>
                        {currentPage} з {totalPages}
                    </span>

                    <Button
                        variant="icon"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        aria-label="Наступна сторінка"
                    >
                        →
                    </Button>
                </nav>
            )}
        </div>
    );
};

export default ReviewList;