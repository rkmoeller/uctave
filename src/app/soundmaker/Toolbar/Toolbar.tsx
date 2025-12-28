import { KeyboardMusic, Play, SlidersVertical } from 'lucide-react';
import { ToolbarMenu } from './ToolbarMenu';

export const Toolbar = () => {
    return (
        <div className="bg-zinc-900 absolute min-w-60 h-12 p-2 bottom-5 right-1/2 rounded-full translate-x-1/2 flex justify-center items-center gap-2">
            <ToolbarMenu>
                <button className="group hover:bg-neutral-800 p-2 rounded-md flex items-center justify-center cursor-pointer transition-all">
                    <KeyboardMusic
                        className="opacity-90 group-hover:opacity-100 group-hover:text-primary transition-all"
                        size={18}
                    />
                </button>
            </ToolbarMenu>

            <button className="group hover:bg-neutral-800 p-2 rounded-md flex items-center justify-center cursor-pointer transition-all">
                <SlidersVertical
                    className="opacity-90 group-hover:opacity-100 group-hover:text-primary transition-all"
                    size={18}
                />
            </button>
            <div className="w-[2px] h-[80%] bg-white/10" />
            <button className="group hover:bg-neutral-800 p-2 rounded-md flex items-center justify-center cursor-pointer transition-all">
                <Play fill="#ffffff" className="opacity-90 group-hover:opacity-100  transition-all" size={18} />
            </button>
        </div>
    );
};
