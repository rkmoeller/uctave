import type { Node } from '@xyflow/react';
import * as Tone from 'tone';

// These models are used to describe the data that a node can hold to ease conversion between React Flow and Tone.

// Synth Node
export type SynthNodeParams = {
    title: string;
    detune: number;
    envelope: Tone.EnvelopeOptions;
    portamento: number;
    volume: number;
    oscillator: Tone.OmniOscillatorOptions;
};

export type SynthNodeType = Node<SynthNodeParams, 'string'>;

// Pluck Synth Node
export type PluckSynthNodeParams = {
    title: string;
    attackNoise: number;
    release: Tone.Unit.Time;
    resonance: number;
    volume: number;
};

export type PluckSynthNodeType = Node<PluckSynthNodeParams, 'string'>;

// Distortion Node
export type DistortionNodeParams = {
    title: string;
    distortion: number;
    wet: number;
};

export type DistortionNodeType = Node<DistortionNodeParams, 'string'>;

// Destination Node
export type DestinationNodeParams = {};

export type DestinationNodeType = Node<DestinationNodeParams, 'string'>;
