import { Link } from 'react-router';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
    return (
        <main className={styles.page}>
            <h1 className={styles.title}>404</h1>
            <p className={styles.message}>Сторінку не знайдено.</p>
            <Link className={styles.homeLink} to="/">На головну</Link>
        </main>
    );
};

export default NotFoundPage;