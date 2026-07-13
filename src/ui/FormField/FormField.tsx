import type { ReactNode } from 'react';
import styles from './FormField.module.css';

interface FormFieldProps {
    label: string;
    htmlFor: string;
    error?: string;
    errorPosition?: 'static' | 'absolute';
    children: ReactNode;
}

const FormField = ({
                       label,
                       htmlFor,
                       error,
                       errorPosition = 'static',
                       children,
                   }: FormFieldProps) => {
    return (
        <div className={styles.field}>
            <label className={styles.label} htmlFor={htmlFor}>
                {label}
            </label>

            {children}

            {errorPosition === 'absolute' ? (
                <span className={styles.errorAbsolute}>{error}</span>
            ) : (
                error && <span className={styles.error}>{error}</span>
            )}
        </div>
    );
};

export default FormField;