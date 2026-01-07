import { useLiveQuery } from 'dexie-react-hooks';

import db from '../../../db/db';
import type { SoundPatch } from '../../../model/types/SoundPatch';
import { useActiveProject } from '../../../hooks/useProject';
import { AudioLines, Plus } from 'lucide-react';
import Button from '../../../components/Button';

interface SoundSelectionProps {
    onSelect: (sound: SoundPatch) => void;
    onCreate: () => void;
}

export const SoundSelection = ({ onSelect, onCreate }: SoundSelectionProps) => {
    const project = useActiveProject();
    const sounds = useLiveQuery(() => db.sounds.where({ projectId: project?.id ?? '' }).toArray(), [project]);

    const sortedSounds = sounds?.sort((a, b) => {
        return a.title.localeCompare(b.title);
    });

    return (
        <div className="flex flex-wrap gap-4 h-full overflow-y-auto">
            {sortedSounds && sortedSounds.length > 0 ? (
                <>
                    {sortedSounds.map((sound) => (
                        <button
                            className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-2 text-xs w-20 h-20 flex flex-col justify-center items-center gap-2 hover:border-zinc-600 hover:bg-zinc-800/75 cursor-pointer transition-all"
                            key={sound.id}
                            onClick={() => onSelect(sound)}
                        >
                            <AudioLines size={18} className="text-zinc-500" />
                            {sound.title}
                        </button>
                    ))}
                    <button
                        className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-2 text-xs w-20 h-20 flex flex-col justify-center items-center gap-2 hover:border-zinc-600 hover:bg-zinc-800/75 cursor-pointer transition-all"
                        onClick={onCreate}
                    >
                        <Plus size={18} className="text-zinc-500" />
                    </button>
                </>
            ) : (
                <div className="flex justify-center items-center w-full h-full text-zinc-500 flex-col gap-3">
                    <div>No sounds found.</div>
                    <Button className="rounded-full" size="small" intent="tertiary" onClick={onCreate}>
                        Create sound
                    </Button>
                </div>
            )}
        </div>
    );
};
