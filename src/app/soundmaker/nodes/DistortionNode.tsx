import { Handle, Position, useReactFlow, type NodeProps } from '@xyflow/react';
import type { DistortionNodeType } from '../../../model/types/NodeTypes';
import { ContextMenuItem, ContextMenuPopup } from '../../../components/ContextMenu';
import { GripVertical, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { ContextMenu } from '@base-ui/react/context-menu';
import { Knob } from '../../../components/Knob';

export const DistortionNode = ({ id, data }: NodeProps<DistortionNodeType>) => {
    const { updateNode } = useReactFlow();
    const [amount, setAmount] = useState<number>(data.distortion);

    return (
        <ContextMenu.Root>
            <ContextMenu.Trigger>
                <div className="bg-zinc-900 rounded-md w-52 text-neutral-100 hover:shadow-lg hover:shadow-primary/5 flex flex-col">
                    <div className="bg-zinc-800 rounded-t-md p-2 flex justify-between drag-handle">
                        <div className="text-xs ">Distortion </div>
                        <GripVertical className=" text-neutral-500" size={14} />
                    </div>

                    <div />

                    <div className="p-2">
                        <Knob
                            min={0}
                            max={2}
                            onChange={(amount) => {
                                setAmount(amount);
                                updateNode(id, { data: { ...data, distortion: amount } });
                            }}
                            value={amount}
                            label="Amount"
                            floor={false}
                        />
                    </div>

                    <div className="bg-zinc-800 rounded-b-md p-2 flex justify-between" />
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
