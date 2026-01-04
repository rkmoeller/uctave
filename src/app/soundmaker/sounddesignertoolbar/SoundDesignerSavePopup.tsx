import {
    PopoverPopup,
    PopoverPortal,
    PopoverPositioner,
    PopoverRoot,
    PopoverTitle,
    PopoverTrigger,
} from '../../../components/Popover';
import { Input } from '../../../components/Input';
import { useState } from 'react';
import Button from '../../../components/Button';
import { Save } from 'lucide-react';
import db from '../../../db/db';
import { useActiveProject } from '../../../hooks/useProject';
import { v4 } from 'uuid';
import { useAudioGraph } from '../../../hooks/useAudioGraph';

export const SoundDesignerSavePopup = () => {
    const [name, setName] = useState<string | undefined>();
    const project = useActiveProject();

    const graph = useAudioGraph();

    const handleChange = (val: boolean) => {
        if (!val) {
            setName(undefined);
        }
    };

    const saveSound = () => {
        if (name && name?.length > 0 && project && graph.current) {
            graph.current.toneNodes.forEach((entry) => {
                console.log(entry.get());
            });
            db.sounds.add({ id: v4(), title: name, audioGraph: graph.current, projectId: project.id });
        }
    };

    return (
        <PopoverRoot onOpenChange={handleChange}>
            <PopoverTrigger>
                <Button className="rounded-full text-sm self-center" size="extrasmall" onClick={saveSound}>
                    <Save size={16} />
                    {name?.length && name.length > 0 ? 'Confirm' : 'Save'}
                </Button>
            </PopoverTrigger>
            <PopoverPortal>
                <PopoverPositioner sideOffset={8}>
                    <PopoverPopup className="flex flex-col gap-2">
                        <PopoverTitle>Name your sound</PopoverTitle>
                        <Input
                            placeholder="Eg. Euphoric lead.."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </PopoverPopup>
                </PopoverPositioner>
            </PopoverPortal>
        </PopoverRoot>
    );
};
