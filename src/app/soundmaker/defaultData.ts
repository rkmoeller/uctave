import type { Edge, Node } from '@xyflow/react';
import { v4 } from 'uuid';

export const getDefaultSoundDesignerData = () => {
    const synthOneId = v4();
    const synthTwoId = v4();
    const distortionId = v4();
    const outputId = v4();

    const defaultNodes: Node[] = [
        {
            id: synthOneId,
            type: 'synthNode',
            position: { x: -225, y: -250 },
            data: { title: 'Synth 1', detune: 1200, volume: 0, portamento: 0 },
            dragHandle: '.drag-handle',
        },
        {
            id: synthTwoId,
            type: 'synthNode',
            position: { x: 225, y: -250 },
            data: { title: 'Synth 2', detune: 0, volume: 0, portamento: 0 },
            dragHandle: '.drag-handle',
        },
        {
            id: distortionId,
            type: 'distortionNode',
            position: { x: -200, y: -50 },
            data: { distortion: 0 },
            dragHandle: '.drag-handle',
        },
        {
            id: outputId,
            position: { x: 50, y: 100 },
            data: {},
            type: 'destinationNode',
            draggable: false,
            dragHandle: '.drag-handle',
        },
    ];

    const defaultEdges: Edge[] = [
        { id: `${synthOneId}->${distortionId}`, source: synthOneId, target: distortionId },
        { id: `${distortionId}->${outputId}`, source: distortionId, target: outputId },
        { id: `${synthTwoId}->${outputId}`, source: synthTwoId, target: outputId },
    ];

    return { defaultNodes, defaultEdges };
};
