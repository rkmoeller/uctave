import { nanoid } from 'nanoid';
import type { XYPosition } from '@xyflow/react';

/**
 * Creates a node with default values based on its type and a given position.
 * May return undefined if provided with unknown type name.
 * @param type
 * @param position
 */
export const createDefaultNode = (type: string, position: XYPosition) => {
    switch (type) {
        case 'synth':
            return {
                id: nanoid(),
                type: 'synthNode',
                position: position,
                data: { title: 'Synth', detune: 1200, volume: 0, portamento: 0 },
                dragHandle: '.drag-handle',
            };
        case 'pluckSynth':
            return {
                id: nanoid(),
                type: 'pluckSynthNode',
                position: position,
                data: {
                    title: 'Synth',
                    attackNoise: 0.5,
                    volume: 0,
                    resonance: 0.5,
                    release: 1000,
                },
                dragHandle: '.drag-handle',
            };
        default:
            return undefined;
    }
};
