import type { PluckSynthNodeParams, SynthNodeParams } from '../../model/types/NodeTypes';
import * as Tone from 'tone';

// factory functions for creating Tone synth objects

export const createToneSynthFromParams = (params: SynthNodeParams) => {
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

export const createTonePluckSynthFromParams = (params: PluckSynthNodeParams) => {
    const synth = new Tone.PluckSynth({
        volume: params.volume,
        attackNoise: params.attackNoise,
        resonance: params.resonance,
        release: params.release,
    });

    return synth;
};
