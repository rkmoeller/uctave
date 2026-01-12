import { AudioLines, Pencil, Trash } from 'lucide-react';
import type { SoundPatch } from '../../../../model/types/SoundPatch';
import {
    PopoverPopup,
    PopoverPortal,
    PopoverPositioner,
    PopoverRoot,
    PopoverTrigger,
} from '../../../../components/Popover';
import db from '../../../../db/db';
import { useNavigate, useParams } from 'react-router';
import { toast } from '../../../../helpers/toasts/toast';
import { cn } from '../../../../helpers/cn';

interface SoundSelectionItemProps {
    sound: SoundPatch;
    onClick: () => void;
}

export const SoundSelectionItem = ({ sound, onClick }: SoundSelectionItemProps) => {
    const { soundid, projectid } = useParams();
    const navigate = useNavigate();

    const active = soundid === sound.id;

    const onDelete = async () => {
        await db.sounds.delete(sound.id);

        toast({
            title: 'Sound deleted',
            description: sound.title,
            type: 'delete',
        });

        if (soundid === sound.id) {
            navigate(`/app/${projectid}/sounddesigner`);
        }
    };

    return (
        <PopoverRoot>
            <div className="relative">
                <PopoverTrigger
                    delay={200}
                    openOnHover
                    render={(props) => (
                        <button
                            {...props}
                            className={cn(
                                'bg-zinc-800/50 border border-zinc-700 rounded-lg p-2 text-xs w-20 h-20 flex flex-col justify-center items-center gap-2 hover:border-zinc-600 hover:bg-zinc-800/75 cursor-pointer transition-all',
                                active &&
                                    'border-primary hover:border-primary-hover hover:bg-primary/5'
                            )}
                            key={sound.id}
                            onClick={onClick}
                        >
                            <AudioLines
                                size={18}
                                className={cn(
                                    'text-zinc-500',
                                    active && 'text-primary hover:text-primary'
                                )}
                            />
                            {sound.title}
                        </button>
                    )}
                />
                <PopoverPortal>
                    <PopoverPositioner side="top" sideOffset={5}>
                        <PopoverPopup className="p-1 flex gap-1 w-fit min-w-0">
                            <button className="hover:bg-zinc-800 p-1.5 rounded group cursor-pointer">
                                <Pencil
                                    size={14}
                                    className="text-zinc-400 group-hover:text-zinc-100"
                                />
                            </button>
                            <button
                                className="hover:bg-zinc-800 group p-1.5 rounded cursor-pointer"
                                onClick={onDelete}
                            >
                                <Trash
                                    size={14}
                                    className="group-hover:text-rose-400 text-zinc-400"
                                />
                            </button>
                        </PopoverPopup>
                    </PopoverPositioner>
                </PopoverPortal>
            </div>
        </PopoverRoot>
    );
};
