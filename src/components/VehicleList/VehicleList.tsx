import type { Vehicle } from '../../types/vehicle';
import VehicleCard from '../VehicleCard/VehicleCard';
import styles from './VehicleList.module.css';

interface VehicleListProps {
    vehicles: Vehicle[];
}

const VehicleList = ({ vehicles }: VehicleListProps) => {
    return (
        <section className={styles.grid}>
            {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
        </section>
    );
};

export default VehicleList;