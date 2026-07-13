import { forwardRef } from 'react';
import type { SelectHTMLAttributes } from 'react';
import styles from './Select.module.css';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className = '', ...props }, ref) => {
        return <select ref={ref} className={`${styles.select} ${className}`} {...props} />;
    }
);

Select.displayName = 'Select';

export default Select;