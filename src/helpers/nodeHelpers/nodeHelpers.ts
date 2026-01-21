import { nanoid } from 'nanoid';
import type { Node, XYPosition } from '@xyflow/react';
import * as Tone from 'tone';

/**
 * Creates a React Flow node object with default values based on its type and a given position.
 * May return undefined if provided with unknown type name.
 * @param type
 * @param position
 */
export const createDefaultNode = (type: string, position: XYPosition): Node | undefined => {
    switch (type) {
        case 'synth':
            return {
                id: nanoid(),
                type: 'synthNode',
                position: position,
                data: { title: 'Synth', ...Tone.Synth.getDefaults() },
                dragHandle: '.drag-handle',
            };
        case 'pluckSynth':
            return {
                id: nanoid(),
                type: 'pluckSynthNode',
                position: position,
                data: {
                    title: 'Pluck Synth',
                    ...Tone.PluckSynth.getDefaults(),
                },
                dragHandle: '.drag-handle',
            };
        default:
            return undefined;
    }
};
