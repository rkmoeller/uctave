import { Handle, Position, useNodes, useReactFlow, type NodeProps } from '@xyflow/react';
import type { PluckSynthNodeType } from '../../../model/types/NodeTypes';
import { ContextMenuItem, ContextMenuPopup } from '../../../components/ContextMenu';
import { GripVertical, Play, Trash } from 'lucide-react';
import { useState } from 'react';
import { useAudioGraph } from '../../../hooks/useAudioGraph';
import { ContextMenu } from '@base-ui/react/context-menu';
import useSoundDesignerStore from '../../../store/SoundDesignerStore';
import { cn } from '../../../helpers/cn';
import { Knob } from '../../../components/Knob';
import * as Tone from 'tone';

export const PluckSynthNode = ({ id, data }: NodeProps<PluckSynthNodeType>) => {
    const { deleteElements, updateNode } = useReactFlow();
    const nodes = useNodes();
    const audioGraph = useAudioGraph();

    const [attackNoise, setAttackNoise] = useState<number>(data.attackNoise);
    const [volume, setVolume] = useState<number>(data.volume);
    const [release, setRelease] = useState<Tone.Unit.Time>(data.release);
    const [resonance, setResonance] = useState<number>(data.resonance);
    const [dampening, setDampening] = useState<Tone.Unit.Frequency>(data.dampening);

    const { selectedNodes } = useSoundDesignerStore();
    const isSelected = selectedNodes.some((node) => node.id === id);

    const play = () => {
        audioGraph.current?.playNode(id);
    };

    const deleteNode = () => {
        deleteElements({ nodes: nodes.filter((node) => node.id === id) });
    };

    return (
        <ContextMenu.Root>
            <ContextMenu.Trigger className="cursor-default">
                <div
                    className={cn(
                        'bg-zinc-900 rounded-md min-w-64 text-neutral-100 hover:shadow-lg hover:shadow-primary/5 flex flex-col ',
                        isSelected ? 'border border-primary' : 'border border-white/15'
                    )}
                >
                    <div className="bg-zinc-800 rounded-t-md p-2 flex justify-between drag-handle cursor-grab">
                        <div className="flex gap-1.5 items-center">
                            <div className="text-xs font-semibold">{data.title}</div>
                        </div>
                        <GripVertical className=" text-neutral-500" size={14} />
                    </div>

                    <div className="p-4 flex gap-4 flex-wrap">
                        <Knob
                            min={-45}
                            max={15}
                            onChange={(volume) => {
                                setVolume(volume);
                                updateNode(id, { data: { ...data, volume: volume } });
                            }}
                            value={volume}
                            label="Volume"
                            unit="db"
                        />
                        <Knob
                            min={0.8}
                            max={0.99}
                            onChange={(r) => {
                                setResonance(r);
                                updateNode(id, { data: { ...data, resonance: r } });
                            }}
                            value={resonance}
                            label="Resonance"
                            floor={false}
                        />
                        <Knob
                            min={1}
                            max={30}
                            onChange={(an) => {
                                setAttackNoise(an);
                                updateNode(id, { data: { ...data, attackNoise: an } });
                            }}
                            value={attackNoise}
                            label="Attack noise"
                            floor={false}
                        />

                        <Knob
                            min={0}
                            max={2000}
                            onChange={(r) => {
                                setRelease(r);
                                updateNode(id, { data: { ...data, release: Tone.Time(r) } });
                            }}
                            value={release as number}
                            label="Release"
                            floor={false}
                            unit="ms"
                        />

                        <Knob
                            min={500}
                            max={7000}
                            onChange={(d) => {
                                setDampening(d);
                                updateNode(id, { data: { ...data, dampening: d } });
                            }}
                            value={dampening as number}
                            label="Dampening"
                            floor={false}
                            unit="hz"
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
                        <ContextMenuItem>Rename</ContextMenuItem>
                        <ContextMenuItem>Change target</ContextMenuItem>
                        <ContextMenuItem
                            className="group flex justify-between"
                            onClick={deleteNode}
                        >
                            Delete
                            <Trash size={16} className="group-hover:text-rose-400" />
                        </ContextMenuItem>
                    </ContextMenuPopup>
                </ContextMenu.Positioner>
            </ContextMenu.Portal>
        </ContextMenu.Root>
    );
};
