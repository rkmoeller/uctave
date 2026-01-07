import { AudioWaveform, ChevronDown, KeyboardMusic, SlidersVertical } from 'lucide-react';
import { SoundDesignerToolbarMenu } from './SoundDesignerToolbarMenu';
import { SoundDesignerSavePopup } from './SoundDesignerSavePopup';
import { useLiveQuery } from 'dexie-react-hooks';
import db from '../../../db/db';
import { useNavigate, useParams } from 'react-router';
import Button from '../../../components/Button';
import { useState } from 'react';
import { cn } from '../../../helpers/cn';
import { SoundSelection } from './SoundSelection';
import { toast } from '../../../helpers/toasts/toast';

export const SoundDesignerToolbar = () => {
    const { soundid, projectid } = useParams();

    const sound = useLiveQuery(() => {
        if (soundid) {
            return db.sounds.where({ id: soundid }).first();
        }
        return undefined;
    }, [soundid]);

    const navigate = useNavigate();

    const [openPanel, setOpenPanel] = useState<boolean>(false);

    return (
        <div className="bg-zinc-900 h-14 p-2 border-t border-zinc-800 flex items-center">
            <div className=" w-full pl-2">
                <Button
                    size="extrasmall"
                    className="rounded-full"
                    intent={sound ? 'tertiary' : 'secondary'}
                    onClick={() => setOpenPanel((prev) => !prev)}
                >
                    {sound ? sound.title : 'Select sound'}
                </Button>
            </div>
            <div className="flex justify-center items-center gap-2 m-auto h-full w-full">
                <SoundDesignerToolbarMenu>
                    <button className="group hover:bg-neutral-800 p-2 rounded-md flex items-center justify-center cursor-pointer transition-all">
                        <KeyboardMusic
                            className="opacity-90 group-hover:opacity-100 group-hover:text-primary transition-all"
                            size={18}
                        />
                    </button>
                </SoundDesignerToolbarMenu>

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
                <SoundDesignerSavePopup />
            </div>

            <div
                className={cn(
                    'absolute bg-zinc-900/50 left-0 right-0 bottom-13 border-y border-zinc-800 transition-all overflow-hidden backdrop-blur-xl',
                    openPanel ? 'p-4 h-52 opacity-100' : 'p-0 h-0 opacity-0 pointer-events-none'
                )}
            >
                <SoundSelection
                    onSelect={(sound) => {
                        toast({
                            title: 'New Sound Loaded',
                            description: sound.title,
                            type: 'success',
                        });
                        navigate(`/app/${projectid}/sounddesigner/${sound.id}`);
                        setOpenPanel(false);
                    }}
                />
                <button
                    className="absolute top-2 right-2 p-1.5 rounded-full hover:bg-zinc-800 cursor-pointer"
                    onClick={() => setOpenPanel(false)}
                >
                    <ChevronDown size={16} />
                </button>
            </div>
        </div>
    );
};
