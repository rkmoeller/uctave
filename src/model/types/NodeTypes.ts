import type { Node } from '@xyflow/react';
import * as Tone from 'tone';

export type SynthNodeType = Node<
    {
        detune: number;
        envelope: Omit<Tone.EnvelopeOptions, 'context'>;
        portamento: number;
        volume: number;
        oscillator: Omit<Tone.OmniOscillatorOptions, 'context'>;
        onSilence: () => void;
    },
    'string'
>;

export type DistortionNodeType = Node<{ distortion: number }, 'string'>;
