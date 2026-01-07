import type { Node } from '@xyflow/react';
import * as Tone from 'tone';

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

// Distortion Node
export type DistortionNodeType = Node<{ distortion: number }, 'string'>;
