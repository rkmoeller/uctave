import { DestinationNode } from '../app/SoundDesigner/nodes/DestinationNode';
import { DistortionNode } from '../app/SoundDesigner/nodes/DistortionNode';
import { SynthNode } from '../app/SoundDesigner/nodes/SynthNode';

export const nodeTypes = {
    synthNode: SynthNode,
    destinationNode: DestinationNode,
    distortionNode: DistortionNode,
};

export type NodeTypeNames = keyof typeof nodeTypes;
