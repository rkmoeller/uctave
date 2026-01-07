import { useEffect, useState } from 'react';
import { useMouse } from '../hooks/useMouse';
import { cn } from '../helpers/cn';

interface KnobProps {
    value: number;
    min: number;
    max: number;
    onChange: (val: number) => void;
    sensitivity?: number;
    label?: string;
    hideValue?: boolean;
}

export const Knob = ({ value, min, max, sensitivity = 1, label, hideValue = true, onChange }: KnobProps) => {
    const [dragStart, setDragStart] = useState<{ x: number; y: number; intialValue: number } | undefined>();

    const MIN_DEGREES = 0;
    const MAX_DEGREES = 360;

    const internalSensitivity = (max - min) * (sensitivity * 0.005);

    const calcValuePercent = () => {
        const valueDiff = value - min;
        const wholeDiff = max - min;
        return (valueDiff / wholeDiff) * 100;
    };

    const valuePercent = calcValuePercent();
    const currentDegress = (MAX_DEGREES / 100) * valuePercent;

    const { mousePosition, shift } = useMouse();

    const clamp = (v: number) => {
        return Math.max(min, Math.min(v, max));
    };

    useEffect(() => {
        if (dragStart && mousePosition) {
            const sens = shift ? 10 : internalSensitivity;
            const diffY = (dragStart.y - mousePosition.y) * sens;
            const newValue = Math.floor(clamp(dragStart.intialValue + diffY));

            onChange(newValue);
        }
    }, [mousePosition, dragStart]);

    useEffect(() => {
        const onMouseUp = () => {
            setDragStart(undefined);
        };

        document.addEventListener('mouseup', onMouseUp);

        return () => {
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, []);

    return (
        <div className="flex flex-col gap-1 items-center w-fit relative">
            {!hideValue && <span className="text-white/30 text-xs">{value}</span>}
            {dragStart && (
                <div className="absolute -top-7 text-xs rounded px-1.25 py-px font-semibold bg-zinc-800/30 border border-zinc-700 z-100 text-primary-hover">
                    {value}
                </div>
            )}
            <div
                className="relative aspect-square w-10 cursor-ns-resize group"
                onMouseDown={(e) => setDragStart({ x: e.clientX, y: e.clientY, intialValue: value })}
            >
                {/* Top */}
                <div className="absolute bg-zinc-800 inset-[3px] z-10 rounded-full flex items-center justify-center">
                    {/* Indicator */}
                    <div
                        className={cn(
                            'h-[calc(50%+3px)] rounded-full w-[3px]',
                            valuePercent > 0 ? 'bg-primary' : 'bg-zinc-700'
                        )}
                        style={{ transform: `rotate(${currentDegress}deg) translateY(50%)` }}
                    />
                </div>

                {/* Circle Fill */}
                <div
                    className="absolute inset-0 z-1 rounded-full rotate-180"
                    style={{
                        background: `conic-gradient(${dragStart ? 'var(--color-primary-hover)' : 'var(--color-primary)'} ${MIN_DEGREES}deg ${currentDegress}deg, transparent ${currentDegress}deg ${MIN_DEGREES}deg)`,
                    }}
                />

                {/* Background */}
                <div className="absolute bg-zinc-700 inset-0 rounded-full group-hover:bg-zinc-600" />
            </div>
            <span className="text-white/30 text-xs">{label}</span>
        </div>
    );
};
