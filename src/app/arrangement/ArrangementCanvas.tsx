import { type MouseEvent, type RefObject } from 'react';
import type { CanvasManager } from '../../model/classes/CanvasManager';

interface ArrangementCanvasProps {
    ref: RefObject<HTMLCanvasElement | null>;
    canvasManager: RefObject<CanvasManager | null>;
}

export const ArrangementCanvas = ({ ref, canvasManager }: ArrangementCanvasProps) => {
    const onMouseMove = (e: MouseEvent) => canvasManager?.current?.onMouseMove(e);
    const onMouseDown = (e: MouseEvent) => canvasManager?.current?.onMouseDown(e);
    const onMouseUp = (e: MouseEvent) => canvasManager?.current?.onMouseUp(e);

    return (
        <canvas
            ref={ref}
            className="bg-[#101012]"
            width={4000}
            height={4000}
            onMouseMove={onMouseMove}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
        />
    );
};
