import { AudioWaveform, ChevronDown, KeyboardMusic, Plus, SlidersVertical } from 'lucide-react';
import { SoundDesignerSave } from './SoundDesignerSave';
import { useLiveQuery } from 'dexie-react-hooks';
import db from '../../../db/db';
import { useNavigate, useParams } from 'react-router';
import Button from '../../../components/Button';
import { useState } from 'react';
import { cn } from '../../../helpers/cn';
import { SoundSelection } from './SoundSelection/SoundSelection';
import { toast } from '../../../helpers/toasts/toast';
import { SynthSelection } from './SynthSelection';

export const SoundDesignerToolbar = () => {
    const { soundid, projectid } = useParams();

    const sound = useLiveQuery(() => {
        if (soundid) {
            return db.sounds.where({ id: soundid }).first();
        }
        return undefined;
    }, [soundid]);

    const navigate = useNavigate();

    const [openPanel, setOpenPanel] = useState<string | undefined>();

    const goToNewSound = () => {
        navigate(`/app/${projectid}/sounddesigner`);
        setOpenPanel(undefined);
    };

    const getPanel = () => {
        switch (openPanel) {
            case 'soundSelection': {
                return (
                    <SoundSelection
                        onSelect={(sound) => {
                            toast({
                                title: 'New sound loaded',
                                description: sound.title,
                                type: 'success',
                            });
                            navigate(`/app/${projectid}/sounddesigner/${sound.id}`);
                            togglePanel(undefined);
                        }}
                        onCreate={goToNewSound}
                    />
                );
            }
            case 'synthSelection': {
                return <SynthSelection onSelect={() => {}} />;
            }
            default: {
                return null;
            }
        }
    };

    const togglePanel = async (newPanel?: string) => {
        if (!newPanel) {
            setOpenPanel(undefined);
            return;
        }

        if (openPanel) {
            setOpenPanel(undefined);

            // Transition Animation Delay
            await new Promise((resolve) => {
                setTimeout(resolve, 125);
            });

            if (newPanel === openPanel) {
                return;
            }
        }

        setOpenPanel(newPanel);
    };

    return (
        <div className="bg-zinc-900 h-14 p-2 border-t border-zinc-800 flex items-center">
            <div className=" w-full pl-2 flex gap-3">
                <Button
                    size="extrasmall"
                    className="rounded-full"
                    intent={'secondary'}
                    onClick={() => togglePanel('soundSelection')}
                >
                    {sound ? sound.title : 'Unnamed sound'}
                </Button>
                <button
                    className="rounded-full bg-zinc-700 aspect-square w-6 flex justify-center items-center hover:bg-zinc-600 cursor-pointer"
                    onClick={goToNewSound}
                >
                    <Plus size={14} />
                </button>
            </div>
            <div className="flex justify-center items-center gap-2 m-auto h-full w-full">
                <button
                    className="group hover:bg-neutral-800 p-2 rounded-md flex items-center justify-center cursor-pointer transition-all"
                    onClick={() => togglePanel('synthSelection')}
                >
                    <KeyboardMusic
                        className="opacity-90 group-hover:opacity-100 group-hover:text-primary transition-all"
                        size={18}
                    />
                </button>

                <button className="group hover:bg-neutral-800 p-2 rounded-md flex items-center justify-center cursor-pointer transition-all">
                    <SlidersVertical
                        className="opacity-90 group-hover:opacity-100 group-hover:text-primary transition-all"
                        size={18}
                    />
                </button>

                <button className="group hover:bg-neutral-800 p-2 rounded-md flex items-center justify-center cursor-pointer transition-all">
                    <AudioWaveform
                        className="opacity-90 group-hover:opacity-100 group-hover:text-primary transition-all"
                        size={18}
                    />
                </button>
            </div>

            <div className="w-full flex justify-end">
                <SoundDesignerSave sound={sound} />
            </div>

            <div
                className={cn(
                    'absolute bg-zinc-900/50 left-0 right-0 bottom-13 border-y border-zinc-800 transition-all overflow-hidden backdrop-blur-md',
                    openPanel ? 'p-4 pb-0 h-64 opacity-100' : 'p-0 h-0 border-0 pointer-events-none'
                )}
            >
                {getPanel()}
                <button
                    className="absolute top-2 right-2 p-1.5 rounded-full hover:bg-zinc-800 cursor-pointer"
                    onClick={() => togglePanel(undefined)}
                >
                    <ChevronDown size={16} />
                </button>
            </div>
        </div>
    );
};
