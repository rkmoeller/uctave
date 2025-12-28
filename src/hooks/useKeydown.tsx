import { useEffect } from 'react';

export const useKeydown = (key: string, callback: () => void, dependencies: any[] = []) => {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === key) {
                callback();
            }
        };

        document.addEventListener('keydown', handler);

        return () => {
            document.removeEventListener('keydown', handler);
        };
    }, dependencies);
};
