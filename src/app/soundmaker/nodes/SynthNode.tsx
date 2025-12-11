import { Handle, Position, useReactFlow, type NodeProps } from '@xyflow/react';
import * as Tone from 'tone';
import type { SynthNodeType } from '../../../model/types/NodeTypes';
import { useSynthNode } from '../../../hooks/useSynthNode';
import { ContextMenu } from '@base-ui-components/react';
import {
    ContextMenuItem,
    ContextMenuPopup,
} from '../../../components/ContextMenu';
import { GripVertical, Play, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export const SynthNode = ({ id }: NodeProps<SynthNodeType>) => {
    const { updateNodeData } = useReactFlow();
    const synth = useSynthNode(new Tone.Synth().toDestination());

    const [detune, setDetune] = useState<number>(0);

    useEffect(() => {
        updateNodeData(id, { value: synth.current });
    }, [synth.current]);

    const play = () => {
        synth.current.triggerAttackRelease('C2', '8n').toDestination();
    };

    return (
        <ContextMenu.Root>
            <ContextMenu.Trigger>
                <div className="bg-neutral-900 rounded-md w-52 text-neutral-100 hover:shadow-lg hover:shadow-primary/5 flex flex-col">
                    <div className="bg-neutral-800 rounded-t-md p-2 flex justify-between drag-handle">
                        <div className="text-xs ">Synth {id}</div>
                        <GripVertical className=" text-neutral-500" size={14} />
                    </div>

                    <div />

                    <div className="p-2">
                        <input
                            type="number"
                            onChange={(e) => {
                                const d = parseInt(e.target.value);
                                setDetune(d);
                                synth.current.set({ detune: d });
                            }}
                            value={detune}
                            className="w-24 bg-green-900 rounded-md"
                            min={0}
                        />
                    </div>

                    <div className="bg-neutral-800 rounded-b-md p-2 flex justify-between">
                        <button onClick={play}>
                            <Play
                                size={16}
                                className="opacity-30 hover:opacity-100 cursor-pointer hover:fill-primary hover:text-primary"
                            />
                        </button>
                    </div>

                    <Handle type="source" position={Position.Bottom} />
                </div>
            </ContextMenu.Trigger>
            <ContextMenu.Portal>
                <ContextMenu.Positioner>
                    <ContextMenuPopup className="min-w-96">
                        <ContextMenuItem className="group flex justify-between">
                            Delete
                            <Trash2
                                size={16}
                                className="group-hover:text-rose-400"
                            />
                        </ContextMenuItem>
                        <ContextMenuItem>Change target</ContextMenuItem>
                    </ContextMenuPopup>
                </ContextMenu.Positioner>
            </ContextMenu.Portal>
        </ContextMenu.Root>
    );
};
