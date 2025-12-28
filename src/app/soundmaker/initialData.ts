import type { Edge, Node } from '@xyflow/react';

export const initialNodes: Node[] = [
    {
        id: 'n1',
        type: 'synthNode',
        position: { x: -150, y: -50 },
        data: { detune: 1200 },
        dragHandle: '.drag-handle',
    },
    {
        id: 'n2',
        type: 'synthNode',
        position: { x: 150, y: -50 },
        data: { detune: 0 },
        dragHandle: '.drag-handle',
    },
    {
        id: 'n3',
        type: 'distortionNode',
        position: { x: 0, y: -50 },
        data: { distortion: 0 },
        dragHandle: '.drag-handle',
    },
    {
        id: 'output',
        position: { x: 50, y: 100 },
        data: {},
        type: 'destinationNode',
    },
];

export const initialEdges: Edge[] = [
    { id: 'n1-n3', source: 'n1', target: 'n3' },
    { id: 'n3-output', source: 'n3', target: 'output' },
    { id: 'n2-output', source: 'n2', target: 'output' },
];
