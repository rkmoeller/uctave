import { useState } from 'react';
import { SearchInput } from '../../../../components/SearchInput';
import { SynthSelectionItem } from './SynthSelectionItem';
import type { SynthType } from '../../../../model/types/SynthType';

const synths: SynthType[] = [
    { type: 'synth', title: 'Synth' },
    { type: 'pluckSynth', title: 'Pluck Synth' },
];

export const SynthSelection = () => {
    const [search, setSearch] = useState<string>('');

    const filteredSynths = synths.filter((s) =>
        s.title.toLowerCase().includes(search?.toLowerCase())
    );

    return (
        <div className="flex flex-col gap-4 h-full">
            <div className="flex gap-4 items-center">
                <h1 className="text-zinc-100 font-medium">Synths</h1>
                <SearchInput value={search} onValueChange={setSearch} placeholder="Search.." />
            </div>
            <div className="flex flex-wrap gap-4 grow overflow-y-auto">
                {filteredSynths.length > 0 ? (
                    filteredSynths.map((synth) => <SynthSelectionItem synth={synth} />)
                ) : (
                    <div className="flex justify-center items-center w-full grow text-zinc-500 flex-col gap-3">
                        <div>No synths found.</div>
                    </div>
                )}
            </div>
        </div>
    );
};
