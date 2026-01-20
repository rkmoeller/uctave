import { nanoid } from 'nanoid';
import type { XYPosition } from '@xyflow/react';

export const createDefaultNode = (type: string, position: XYPosition) => {
    switch (type) {
        case 'Synth':
            return {
                id: nanoid(),
                type: 'synthNode',
                position: position,
                data: { title: 'Synth', detune: 1200, volume: 0, portamento: 0 },
                dragHandle: '.drag-handle',
            };
        default:
            return undefined;
    }
};
