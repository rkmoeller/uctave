import { AudioWaveform, KeyboardMusic, SlidersVertical } from 'lucide-react';
import { SoundDesignerToolbarMenu } from './SoundDesignerToolbarMenu';
import { SoundDesignerSavePopup } from './SoundDesignerSavePopup';

export const SoundDesignerToolbar = () => {
    return (
        <div className="bg-zinc-900 h-14 p-2 border-t border-zinc-800 flex items-center">
            <div className="w-full" />
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
        </div>
    );
};
