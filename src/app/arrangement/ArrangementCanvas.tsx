import { useEffect, useRef, type MouseEvent } from 'react';
import { CanvasManager } from '../../model/classes/CanvasManager';

// For testing
const defaultObjects = [
    { startBeat: 4, duration: 8, track: 3 },
    { startBeat: 18, duration: 4, track: 2 },
];

export const ArrangementCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvasManagerRef = useRef<CanvasManager | null>(null);

    const init = () => {
        const canvas = canvasRef.current;

        if (!canvas) {
            throw new Error('No canvas was mounted.');
        }

        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error('Could not retrieve canvas context.');
        }

        canvasManagerRef.current = new CanvasManager(canvas, ctx);
        canvasManagerRef.current.setObjects(defaultObjects);
    };

    // Manually setting wheel event listener is required to be able to set passive property
    // This allows for preventing default for proper zoom control
    const onScroll = (e: WheelEvent) => {
        canvasManagerRef.current?.onScroll(e);
    };

    useEffect(() => {
        const handler = (e) => onScroll(e);
        canvasRef.current?.addEventListener('wheel', handler, { passive: false });

        return () => {
            canvasRef.current?.removeEventListener('wheel', handler);
        };
    }, []);

    // For testing
    useEffect(() => {
        canvasManagerRef?.current?.setObjects(defaultObjects);
    }, [defaultObjects]);

    const onMouseMove = (e: MouseEvent) => {
        canvasManagerRef.current?.onMouseMove(e);
    };

    const onMouseDown = (e: MouseEvent) => {
        canvasManagerRef.current?.onMouseDown(e);
    };

    const onMouseUp = (e: MouseEvent) => {
        canvasManagerRef.current?.onMouseUp(e);
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="bg-[#101012]"
            width={4000}
            height={4000}
            onMouseMove={onMouseMove}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
        />
    );
};
