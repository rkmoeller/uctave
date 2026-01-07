import { Handle, Position, useReactFlow, type Node } from '@xyflow/react';
import { Headphones, LockOpen, Lock, GripVertical } from 'lucide-react';
import { useAudioGraph } from '../../../hooks/useAudioGraph';
import { cn } from '../../../helpers/cn';
import * as Tone from 'tone';

export const DestinationNode = ({ id, draggable }: Node) => {
    const { updateNode } = useReactFlow();
    const audioGraph = useAudioGraph();

    const play = () => {
        Tone.start().then(() => {
            audioGraph.current?.play();
        });
    };

    return (
        // <div className=" bg-zinc-900 rounded-t-md rounded-md w-36 text-zinc-100 hover:shadow-lg hover:shadow-primary/5">
        //     <div className="bg-zinc-800 rounded-t-md">
        //         <button
        //             className="rounded-lg w-6 h-6 flex items-center justify-center"
        //             onClick={() => {
        //                 updateNode(id, { draggable: !draggable });
        //             }}
        //         >
        //             {draggable ? <LockOpen size={16} /> : <Lock size={16} />}
        //         </button>
        //     </div>
        //     <Headphones className="text-primary" size={26} onClick={play} />
        //     <Handle type="target" position={Position.Top} />
        // </div>
        <div
            className={cn(
                'bg-zinc-900 rounded-md w-52 text-neutral-100 hover:shadow-lg hover:shadow-primary/5 flex flex-col'
            )}
        >
            <div className="bg-zinc-800 rounded-t-md p-2 flex justify-between drag-handle cursor-grab">
                <div className="flex gap-1.5 items-center">
                    <div className="text-xs font-semibold">Output</div>
                </div>
                {draggable && <GripVertical className=" text-neutral-500" size={14} />}
            </div>

            <div className="p-2">
                <Headphones className="text-primary" size={26} onClick={play} />
            </div>

            <div className="bg-zinc-800 rounded-b-md p-2 flex justify-between">
                <button
                    className="rounded-md w-6 h-6 flex items-center justify-center  hover:bg-white/5 hover:text-white/80 cursor-pointer"
                    onClick={() => {
                        updateNode(id, { draggable: !draggable });
                    }}
                >
                    {draggable ? (
                        <LockOpen className="text-white/40" size={14} />
                    ) : (
                        <Lock className="text-white/30" size={14} />
                    )}
                </button>
            </div>

            <Handle type="target" position={Position.Top} />
        </div>
    );
};
