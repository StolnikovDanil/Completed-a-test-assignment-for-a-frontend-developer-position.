import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'icon';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = 'primary', className = '', type = 'button', ...props }, ref) => {
        return (
            <button
                ref={ref}
                type={type}
                className={`${styles.button} ${styles[variant]} ${className}`}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';

export default Button;