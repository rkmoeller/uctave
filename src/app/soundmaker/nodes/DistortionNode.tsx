import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { DistortionNodeType } from '../../../model/types/NodeTypes';

import { ContextMenuItem, ContextMenuPopup } from '../../../components/ContextMenu';
import { GripVertical, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useAudioGraph } from '../../../hooks/useAudioGraph';
import * as Tone from 'tone';
import { ContextMenu } from '@base-ui/react/context-menu';

export const DistortionNode = ({ id, data }: NodeProps<DistortionNodeType>) => {
    const [amount, setAmount] = useState<number>(data.distortion);

    const audioGraph = useAudioGraph();

    return (
        <ContextMenu.Root>
            <ContextMenu.Trigger>
                <div className="bg-neutral-900 rounded-md w-52 text-neutral-100 hover:shadow-lg hover:shadow-primary/5 flex flex-col">
                    <div className="bg-neutral-800 rounded-t-md p-2 flex justify-between drag-handle">
                        <div className="text-xs ">Distortion {id}</div>
                        <GripVertical className=" text-neutral-500" size={14} />
                    </div>

                    <div />

                    <div className="p-2">
                        <input
                            type="number"
                            onChange={(e) => {
                                const d = parseInt(e.target.value);
                                setAmount(d);

                                audioGraph.current?.updateParams<Partial<Tone.DistortionOptions>>(id, {
                                    distortion: d,
                                });
                            }}
                            value={amount}
                            className="w-24 bg-green-900 rounded-md"
                            min={0}
                        />
                    </div>

                    <div className="bg-neutral-800 rounded-b-md p-2 flex justify-between" />
                    <Handle type="target" position={Position.Top} />
                    <Handle type="source" position={Position.Bottom} />
                </div>
            </ContextMenu.Trigger>
            <ContextMenu.Portal>
                <ContextMenu.Positioner>
                    <ContextMenuPopup className="min-w-96">
                        <ContextMenuItem className="group flex justify-between">
                            Delete
                            <Trash2 size={16} className="group-hover:text-rose-400" />
                        </ContextMenuItem>
                        <ContextMenuItem>Change target</ContextMenuItem>
                    </ContextMenuPopup>
                </ContextMenu.Positioner>
            </ContextMenu.Portal>
        </ContextMenu.Root>
    );
};
