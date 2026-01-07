import { useEffect, useState } from 'react';

export const useMouse = () => {
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>();
    const [mouseDown, setMouseDown] = useState<boolean>(false);
    const [shift, setShift] = useState<boolean>(false);

    const onMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        setShift(e.shiftKey);
    };

    const onMouseDown = () => {
        setMouseDown(true);
    };

    const onMouseUp = () => {
        setMouseDown(false);
    };

    useEffect(() => {
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mouseup', onMouseUp);

        return () => {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, []);

    return { mousePosition, mouseDown, shift };
};
