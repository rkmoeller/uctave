import { useEffect, useRef, type WheelEvent, type MouseEvent } from 'react';
import { CanvasManager } from '../../model/classes/CanvasManager';

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
    };

    const onScroll = (e: WheelEvent) => {
        canvasManagerRef.current?.onScroll(e);
    };

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
            onWheel={onScroll}
            onMouseMove={onMouseMove}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
        />
    );
};
