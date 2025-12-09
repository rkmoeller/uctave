import type { Node } from '@xyflow/react';
import * as Tone from 'tone';

export type SynthNodeType = Node<
    { synth: Tone.Synth<Tone.SynthOptions> },
    'string'
>;
