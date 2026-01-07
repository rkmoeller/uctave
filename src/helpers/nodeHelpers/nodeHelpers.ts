import type { SynthNodeParams } from '../../model/types/NodeTypes';
import * as Tone from 'tone';

export const createSynthFromParams = (params: SynthNodeParams) => {
    const synth = new Tone.Synth({
        volume: params.volume,
        detune: params.detune,
        envelope: params.envelope,
        portamento: params.portamento,
    });

    if (params.oscillator) {
        synth.set({ oscillator: { ...params.oscillator } });
    }

    return synth;
};
