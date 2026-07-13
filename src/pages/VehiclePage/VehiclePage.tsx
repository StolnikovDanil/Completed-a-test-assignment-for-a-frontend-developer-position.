import { useParams, Link } from 'react-router';
import { useGetVehicleByIdQuery } from '../../api/vehiclesApi';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import ReviewList from '../../components/ReviewList/ReviewList';
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import type { Review, NewReviewInput } from '../../types/vehicle';
import styles from './VehiclePage.module.css';

const VehiclePage = () => {
    const { vehicleId } = useParams<{ vehicleId: string }>();
    const id = Number(vehicleId);

    const { data: vehicle, isLoading, isError } = useGetVehicleByIdQuery(id, {
        skip: !vehicleId || Number.isNaN(id),
    });

    const [localReviews, setLocalReviews] = useLocalStorage<Review[]>(
        `vehicle-reviews-${vehicleId}`,
        []
    );

    const handleAddReview = (input: NewReviewInput) => {
        const newReview: Review = {
            rating: input.rating,
            comment: input.comment,
            date: new Date().toISOString(),
            reviewerName: input.reviewerName,
            reviewerEmail: `${input.reviewerName.toLowerCase().replace(/\s+/g, '.')}@local.review`,
        };

        setLocalReviews((prev) => [newReview, ...prev]);
    };

    if (!vehicleId || Number.isNaN(id)) {
        return (
            <main className={styles.page}>
                <p className={styles.statusMessage}>Автомобіль не знайдено.</p>
                <Link className={styles.backLink} to="/">Назад до каталогу</Link>
            </main>
        );
    }

    if (isLoading) {
        return (
            <main className={styles.page}>
                <p className={styles.statusMessage}>Завантаження...</p>
            </main>
        );
    }

    if (isError || !vehicle) {
        return (
            <main className={styles.page}>
                <p className={styles.statusMessage}>Автомобіль не знайдено.</p>
                <Link className={styles.backLink} to="/">Назад до каталогу</Link>
            </main>
        );
    }

    const apiReviews = vehicle.reviews ?? [];
    const allReviews = [...localReviews, ...apiReviews];

    const images = vehicle.images ?? [];

    return (
        <main className={styles.page}>
            <Link className={styles.backLink} to="/">Назад до каталогу</Link>

            <article className={styles.details}>
                <section className={styles.gallery}>
                    {images.length > 0 ? (
                        images.map((image, index) => (
                            <img
                                key={image}
                                className={styles.galleryImage}
                                src={image}
                                alt={`${vehicle.title} — фото ${index + 1}`}
                            />
                        ))
                    ) : (
                        <img
                            className={styles.galleryImage}
                            src={vehicle.thumbnail}
                            alt={vehicle.title}
                        />
                    )}
                </section>

                <section className={styles.info}>
                    <h1 className={styles.infoTitle}>{vehicle.title}</h1>
                    <p className={styles.infoBrand}>{vehicle.brand}</p>
                    <p className={styles.infoDescription}>{vehicle.description}</p>
                    <p className={styles.infoPrice}>{vehicle.price} $</p>
                    <div className={styles.infoMeta}>
                        <span>Рейтинг: {vehicle.rating}</span>
                        <span>В наявності: {vehicle.stock}</span>
                    </div>
                </section>
            </article>

            <section className={styles.reviewsSection}>
                <h2 className={styles.reviewsTitle}>Відгуки</h2>
                <ReviewList reviews={allReviews} />
                <ReviewForm onAddReview={handleAddReview} />
            </section>
        </main>
    );
};

export default VehiclePage;