import { GripVertical, KeyboardMusic } from 'lucide-react';
import { cn } from '../../../../helpers/cn';
import { type DragEvent } from 'react';

interface SoundSelectionItemProps {
    synth: string;
}

export const SynthSelectionItem = ({ synth }: SoundSelectionItemProps) => {
    const onDragStart = (e: DragEvent) => {
        e.dataTransfer.setData('text/plain', synth);
    };

    return (
        <div className="relative" draggable onDragStart={onDragStart}>
            <button
                className={cn(
                    'bg-zinc-800/50 border border-zinc-700 rounded-lg p-2 text-xs w-20 h-20 flex flex-col justify-center items-center gap-2 hover:border-zinc-600 hover:bg-zinc-800/75 transition-all group cursor-move'
                )}
            >
                <GripVertical
                    className="absolute top-1.5 right-1 opacity-0 group-hover:opacity-30 transition-all"
                    size={14}
                />
                <KeyboardMusic size={18} className={'text-zinc-500'} />
                {synth}
            </button>
        </div>
    );
};
