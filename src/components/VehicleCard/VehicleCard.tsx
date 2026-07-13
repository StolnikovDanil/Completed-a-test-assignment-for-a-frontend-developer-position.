import { Link } from 'react-router';
import type { Vehicle } from '../../types/vehicle';
import styles from './VehicleCard.module.css';

interface VehicleCardProps {
    vehicle: Vehicle;
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
    return (
        <article className={styles.card}>
            <Link to={`/vehicles/${vehicle.id}`} className={styles.link}>
                <img className={styles.image} src={vehicle.thumbnail} alt={vehicle.title} />
                <div className={styles.content}>
                    <h3 className={styles.title}>{vehicle.title}</h3>
                    <p className={styles.brand}>{vehicle.brand}</p>
                    <p className={styles.price}>{vehicle.price} $</p>
                </div>
            </Link>
        </article>
    );
};

export default VehicleCard;