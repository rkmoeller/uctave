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
import { useAudioGraph } from '../../../hooks/useAudioGraph';
import { createSoundPatch } from '../../../helpers/soundHelpers';
import { useNavigate } from 'react-router';
import { v4 } from 'uuid';
import { toast } from '../../../helpers/toasts/toast';
import { useKeydown } from '../../../hooks/useKeydown';
import type { SoundPatch } from '../../../model/types/SoundPatch';

interface SoundDesignerSaveProps {
    sound?: SoundPatch;
}

export const SoundDesignerSave = ({ sound }: SoundDesignerSaveProps) => {
    const [name, setName] = useState<string | undefined>();
    const project = useActiveProject();

    const navigate = useNavigate();

    const graph = useAudioGraph();

    const handleChange = (val: boolean) => {
        if (!val) {
            setName(undefined);
        }
    };

    const saveSound = async () => {
        if (project && graph.current && (sound || name)) {
            const newId = v4();

            try {
                await db.sounds.upsert(
                    sound?.id ?? newId,
                    createSoundPatch(graph.current, project.id, sound?.title ?? name!)
                );
                if (!sound) {
                    navigate(newId);
                }
                toast({
                    title: 'Saved!',
                    type: 'success',
                });
            } catch (e) {
                console.error(e);
                toast({
                    title: 'Failed to save.',
                    type: 'error',
                });
            }
        }
    };

    useKeydown(
        's',
        true,
        () => {
            saveSound();
        },
        [sound, project, graph]
    );

    return (
        <PopoverRoot onOpenChange={handleChange}>
            <PopoverTrigger>
                <Button className="rounded-full text-sm self-center" size="extrasmall" onClick={saveSound}>
                    <Save size={16} />
                    {name?.length && name.length > 0 ? 'Confirm' : sound ? 'Update' : 'Save'}
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
