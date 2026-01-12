import { DestinationNode } from '../app/soundmaker/nodes/DestinationNode';
import { DistortionNode } from '../app/soundmaker/nodes/DistortionNode';
import { SynthNode } from '../app/soundmaker/nodes/SynthNode';

export const nodeTypes = {
    synthNode: SynthNode,
    destinationNode: DestinationNode,
    distortionNode: DistortionNode,
};

export type NodeTypeNames = keyof typeof nodeTypes;
