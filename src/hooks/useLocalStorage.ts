import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : initialValue;
        } catch {
            return initialValue;
        }
    });

    const setValue = (value: T | ((prevValue: T) => T)) => {
        setStoredValue((prevValue) => {
            const valueToStore =
                value instanceof Function ? value(prevValue) : value;

            try {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch {
                // localStorage недоступний (наприклад, приватний режим) — ігноруємо
            }

            return valueToStore;
        });
    };

    return [storedValue, setValue] as const;
}