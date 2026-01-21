import type { Node } from '@xyflow/react';
import * as Tone from 'tone';

// These models are used to describe the data that a node can hold to ease conversion between React Flow and Tone.

// Synth Node
export type SynthNodeParams = Omit<Tone.SynthOptions, 'context' | 'onsilence'> & {
    title: string;
};
export type SynthNodeType = Node<SynthNodeParams, 'string'>;

// Pluck Synth Node
export type PluckSynthNodeParams = Omit<Tone.PluckSynthOptions, 'context'> & {
    title: string;
};
export type PluckSynthNodeType = Node<PluckSynthNodeParams, 'string'>;

// Distortion Node
export type DistortionNodeParams = Omit<Tone.DistortionOptions, 'context'> & {
    title: string;
};
export type DistortionNodeType = Node<DistortionNodeParams, 'string'>;

// Destination Node
export type DestinationNodeParams = {};
export type DestinationNodeType = Node<DestinationNodeParams, 'string'>;
