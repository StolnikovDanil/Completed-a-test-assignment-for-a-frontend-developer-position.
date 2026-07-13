import { forwardRef } from 'react';
import type { TextareaHTMLAttributes } from 'react';
import styles from './Textarea.module.css';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className = '', ...props }, ref) => {
        return <textarea ref={ref} className={`${styles.textarea} ${className}`} {...props} />;
    }
);

Textarea.displayName = 'Textarea';

export default Textarea;