import { useEffect, useRef } from 'react';
import useVolume from './VolumeStore';
import * as Tone from 'tone';

export const useSynthNode = (synthInput: Tone.Synth<Tone.SynthOptions>) => {
    const volume = useVolume((state) => state.volume);
    const synth = useRef(synthInput);

    useEffect(() => {
        synth.current.set({ volume: volume });
    }, [volume]);

    return synth;
};
