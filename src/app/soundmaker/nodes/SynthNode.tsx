import { Handle, Position, useNodes, useReactFlow, type NodeProps } from '@xyflow/react';
import type { SynthNodeType } from '../../../model/types/NodeTypes';
import { ContextMenuItem, ContextMenuPopup } from '../../../components/ContextMenu';
import { GripVertical, Play, Trash, Volume2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAudioGraph } from '../../../hooks/useAudioGraph';
import * as Tone from 'tone';
import { ContextMenu } from '@base-ui/react/context-menu';
import useSoundDesignerStore from '../../../store/SoundDesignerStore';
import { cn } from '../../../helpers/cn';

export const SynthNode = ({ id, data }: NodeProps<SynthNodeType>) => {
    const { deleteElements } = useReactFlow();
    const audioGraph = useAudioGraph();
    const [detune, setDetune] = useState<number>(data.detune);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const nodes = useNodes();
    const { selectedNodes } = useSoundDesignerStore();

    const isSelected = selectedNodes.some((node) => node.id === id);

    const play = () => {
        setIsPlaying(true);
        audioGraph.current?.playNode(id);
    };

    const deleteNode = () => {
        deleteElements({ nodes: nodes.filter((node) => node.id === id) });
    };

    useEffect(() => {
        if (audioGraph.current?.getToneNode(id) !== undefined) {
            audioGraph.current?.updateParams(id, { onsilence: () => setIsPlaying(false) });
        }
    }, [audioGraph, id]);

    return (
        <ContextMenu.Root>
            <ContextMenu.Trigger className="cursor-default">
                <div
                    className={cn(
                        'bg-zinc-900 rounded-md w-52 text-neutral-100 hover:shadow-lg hover:shadow-primary/5 flex flex-col',
                        isSelected ? ' border border-primary' : ''
                    )}
                >
                    <div className="bg-zinc-800 rounded-t-md p-2 flex justify-between drag-handle cursor-grab">
                        <div className="flex gap-1.5 items-center">
                            <div className="text-xs font-semibold">Synth {id}</div>
                            {
                                <Volume2
                                    className={
                                        isPlaying ? 'text-primary opacity-100 animate-pulse' : 'text-white opacity-30'
                                    }
                                    size={12}
                                />
                            }
                        </div>
                        <GripVertical className=" text-neutral-500" size={14} />
                    </div>

                    <div className="p-2">
                        <input
                            type="number"
                            onChange={(e) => {
                                const d = parseInt(e.target.value);
                                setDetune(d);

                                audioGraph.current?.updateParams<Partial<Tone.SynthOptions>>(id, { detune: d });
                            }}
                            value={detune}
                            className="w-24 bg-green-900 rounded-md"
                            min={0}
                        />
                    </div>

                    <div className="bg-zinc-800 rounded-b-md p-2 flex justify-between">
                        <button onMouseDown={play}>
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
                    <ContextMenuPopup className="min-w-[200px]">
                        <ContextMenuItem className="group flex justify-between" onClick={deleteNode}>
                            Delete
                            <Trash size={16} className="group-hover:text-rose-400" />
                        </ContextMenuItem>
                        <ContextMenuItem>Change target</ContextMenuItem>
                    </ContextMenuPopup>
                </ContextMenu.Positioner>
            </ContextMenu.Portal>
        </ContextMenu.Root>
    );
};
