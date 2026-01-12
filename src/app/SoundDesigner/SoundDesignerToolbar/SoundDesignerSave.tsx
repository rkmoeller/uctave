import { useState } from 'react';

import db from '../../../db/db';
import { useActiveProject } from '../../../hooks/useProject';
import { useAudioGraph } from '../../../hooks/useAudioGraph';
import { createSoundPatch } from '../../../helpers/soundHelpers';
import { useNavigate } from 'react-router';
import { toast } from '../../../helpers/toasts/toast';
import { useKeydown } from '../../../hooks/useKeydown';
import type { SoundPatch } from '../../../model/types/SoundPatch';
import {
    DialogBackdrop,
    DialogClose,
    DialogDescription,
    DialogPopup,
    DialogPortal,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
    DialogViewport,
} from '../../../components/Dialog';
import Button from '../../../components/Button';
import { Save } from 'lucide-react';
import { Input } from '../../../components/Input';
import { nanoid } from 'nanoid';

interface SoundDesignerSaveProps {
    sound?: SoundPatch;
}

export const SoundDesignerSave = ({ sound }: SoundDesignerSaveProps) => {
    const [name, setName] = useState<string>('');
    const [saveDialogOpen, setSaveDialogOpen] = useState<boolean>(false);
    const project = useActiveProject();

    const navigate = useNavigate();

    const graph = useAudioGraph();

    const saveSound = async () => {
        if (project && graph.current && (sound || name)) {
            const newId = nanoid();
            const newName = sound?.title ?? name;

            try {
                await db.sounds.upsert(
                    sound?.id ?? newId,
                    createSoundPatch(graph.current, project.id, newName, sound?.id)
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
            return sound ? saveSound() : setSaveDialogOpen(true);
        },
        [sound]
    );

    return (
        <DialogRoot
            open={saveDialogOpen}
            onOpenChange={(val) => {
                if (sound) {
                    saveSound();
                    return;
                }

                setSaveDialogOpen(val);
                if (!val) setName('');
            }}
        >
            <DialogTrigger
                render={(props) => (
                    <Button {...props} className="rounded-full text-sm self-center" size="extrasmall">
                        <Save size={16} />
                        Save
                    </Button>
                )}
            />
            <DialogPortal>
                <DialogBackdrop />
                <DialogViewport>
                    <DialogPopup>
                        <DialogTitle>Save sound</DialogTitle>
                        <DialogDescription>Choose a name for your sound</DialogDescription>
                        <div className="py-4">
                            <Input
                                placeholder="Eg. Euphoric lead.."
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div className="flex justify-between">
                            <DialogClose
                                render={(props) => (
                                    <Button {...props} size="small" intent="tertiary">
                                        Cancel
                                    </Button>
                                )}
                            />
                            <Button
                                size="small"
                                disabled={name.length < 1}
                                onClick={() => {
                                    saveSound();
                                    setSaveDialogOpen(false);
                                    setName('');
                                }}
                            >
                                Save
                            </Button>
                        </div>
                    </DialogPopup>
                </DialogViewport>
            </DialogPortal>
        </DialogRoot>
    );
};
