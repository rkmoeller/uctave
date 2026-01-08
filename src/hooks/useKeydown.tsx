import { useEffect, useState } from 'react';

export const useKeydown = (key: string, ctrl: boolean = false, callback: () => void, dependencies: any[] = []) => {
    const [ctrlPressed, setCtrlPressed] = useState<boolean>(false);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Control' && ctrl) {
                setCtrlPressed(true);
                return;
            }

            if (e.key === key) {
                if (!ctrl || (ctrl && ctrlPressed)) {
                    e.preventDefault();
                    callback();
                }
            }
        };

        const keyUpHandler = (e: KeyboardEvent) => {
            if (e.key === 'Control') {
                setCtrlPressed(false);
            }
        };

        document.addEventListener('keydown', handler);
        document.addEventListener('keyup', keyUpHandler);

        return () => {
            document.removeEventListener('keydown', handler);
            document.removeEventListener('keyup', keyUpHandler);
        };
    }, [ctrlPressed, key, ctrl, callback, ...dependencies]);
};
