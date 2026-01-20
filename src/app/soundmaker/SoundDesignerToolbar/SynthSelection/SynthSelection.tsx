import { useState } from 'react';
import { SearchInput } from '../../../../components/SearchInput';
import { SynthSelectionItem } from './SynthSelectionItem';

const synths = ['Synth'];

export const SynthSelection = () => {
    const [search, setSearch] = useState<string | undefined>();

    return (
        <div className="flex flex-col gap-4 h-full">
            <div className="flex gap-4 items-center">
                <h1 className="text-zinc-100 font-medium">Synths</h1>
                <SearchInput value={search} onValueChange={setSearch} placeholder="Search.." />
            </div>
            <div className="flex flex-wrap gap-4 grow overflow-y-auto">
                {synths.map((synth) => (
                    <SynthSelectionItem synth={synth} />
                ))}
            </div>
        </div>
    );
};
