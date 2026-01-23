import { Pause, Play, Square } from 'lucide-react';
import { ArrangementCanvas } from './ArrangementCanvas';
import { CanvasManager } from '../../model/classes/CanvasManager';
import { useEffect, useRef, useState } from 'react';

// For testing
const defaultObjects = [
    { startBeat: 4, duration: 16, track: 3 },
    { startBeat: 18, duration: 4, track: 2 },
];

export const Arrangement = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvasManagerRef = useRef<CanvasManager | null>(null);

    const [isPlaying, setIsPlaying] = useState<boolean>(false);

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
        canvasManagerRef?.current?.onScroll(e);
    };

    useEffect(() => {
        const handler = (e) => onScroll(e);
        canvasRef?.current?.addEventListener('wheel', handler, { passive: false });

        return () => {
            canvasRef?.current?.removeEventListener('wheel', handler);
            canvasManagerRef?.current?.stopPlayback();
        };
    }, []);

    useEffect(() => {
        init();
    }, []);

    // For testing
    useEffect(() => {
        canvasManagerRef?.current?.setObjects(defaultObjects);
    }, [defaultObjects]);

    const play = () => {
        setIsPlaying(true);
        canvasManagerRef.current?.startPlayback();
    };

    const pause = () => {
        setIsPlaying(false);
        canvasManagerRef.current?.pausePlayback();
    };

    const stop = () => {
        setIsPlaying(false);
        canvasManagerRef.current?.stopPlayback();
    };

    return (
        <div className="grow flex flex-col text-white/30 font-semibold overflow-hidden">
            <div className="flex grow h-[calc(100dvh-120px)]">
                <div className="bg-zinc-900 w-72 shrink-0 border-r border-zinc-800" />
                <div className="overflow-hidden">
                    <ArrangementCanvas ref={canvasRef} canvasManager={canvasManagerRef} />
                </div>
            </div>
            <div className="bg-zinc-900 h-14 shrink-0 border-t border-zinc-800 flex justify-center items-center">
                <button
                    className="group hover:bg-neutral-800 p-2 rounded-md flex items-center justify-center cursor-pointer transition-all"
                    onClick={() => (isPlaying ? pause() : play())}
                >
                    {isPlaying ? (
                        <Pause
                            className="opacity-90 group-hover:opacity-100 group-hover:text-primary group-hover:fill-primary transition-all"
                            size={18}
                        />
                    ) : (
                        <Play
                            className="opacity-90 group-hover:opacity-100 group-hover:text-primary group-hover:fill-primary transition-all"
                            size={18}
                        />
                    )}
                </button>
                <button
                    className="group hover:bg-neutral-800 p-2 rounded-md flex items-center justify-center cursor-pointer transition-all"
                    onClick={stop}
                >
                    <Square
                        className="opacity-90 group-hover:opacity-100 group-hover:text-primary group-hover:fill-primary transition-all"
                        size={18}
                    />
                </button>
            </div>
        </div>
    );
};
