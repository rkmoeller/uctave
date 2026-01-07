import type { AudioGraph } from '../app/soundmaker/audioGraph';
import type { SoundPatch } from '../model/types/SoundPatch';
import { v4 } from 'uuid';
import type { Edge, Node } from '@xyflow/react';

export const createSoundPatch = (audioGraph: AudioGraph, projectId: string, title: string): SoundPatch => {
    const { nodes, edges } = audioGraph.getPatch();

    const patch = {
        id: v4(),
        projectId: projectId,
        title: title,
        graph: {
            nodes: nodes,
            edges: edges,
        },
    } satisfies SoundPatch;

    return patch;
};

export const createNodesAndEdgesFromPatch = (soundPatch?: SoundPatch) => {
    if (!soundPatch) {
        return { nodes: [], edges: [] };
    }

    const nodes: Node[] = soundPatch.graph.nodes.map((nodePatch) => {
        return {
            id: nodePatch.id,
            type: nodePatch.type,
            position: nodePatch.position,
            data: nodePatch.data,
            dragHandle: '.drag-handle',
        };
    });

    const edges: Edge[] = soundPatch.graph.edges.map((edgePatch) => {
        return {
            id: edgePatch.id,
            source: edgePatch.source,
            target: edgePatch.target,
        };
    });

    return { nodes, edges };
};
