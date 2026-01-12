import { useLiveQuery } from 'dexie-react-hooks';
import db from '../../../../db/db';
import type { SoundPatch } from '../../../../model/types/SoundPatch';
import { useActiveProject } from '../../../../hooks/useProject';
import { Plus } from 'lucide-react';
import { SearchInput } from '../../../../components/SearchInput';
import { useState } from 'react';
import { SoundSelectionItem } from './SoundSelectionItem';

interface SoundSelectionProps {
    onSelect: (sound: SoundPatch) => void;
    onCreate: () => void;
}

export const SoundSelection = ({ onSelect, onCreate }: SoundSelectionProps) => {
    const project = useActiveProject();
    const sounds = useLiveQuery(
        () => db.sounds.where({ projectId: project?.id ?? '' }).toArray(),
        [project]
    );

    const [search, setSearch] = useState<string>('');

    const filteredSounds = sounds
        ?.filter((sound) => sound.title.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            return a.title.localeCompare(b.title);
        });

    return (
        <div className="flex flex-col gap-4 h-full">
            <div className="flex gap-4 items-center">
                <h1 className="text-zinc-100 font-medium">Select sound</h1>
                <SearchInput value={search} onValueChange={setSearch} placeholder="Search.." />
            </div>
            <div className="flex flex-wrap gap-4 grow overflow-y-auto">
                {filteredSounds && filteredSounds.length > 0 ? (
                    <>
                        {filteredSounds.map((sound) => (
                            <SoundSelectionItem sound={sound} onClick={() => onSelect(sound)} />
                        ))}
                        <button
                            className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-2 text-xs w-20 h-20 flex flex-col justify-center items-center gap-2 hover:border-zinc-600 hover:bg-zinc-800/75 cursor-pointer transition-all"
                            onClick={onCreate}
                        >
                            <Plus size={18} className="text-zinc-500" />
                        </button>
                    </>
                ) : (
                    <div className="flex justify-center items-center w-full grow text-zinc-500 flex-col gap-3">
                        <div>No sounds found.</div>
                    </div>
                )}
            </div>
        </div>
    );
};
