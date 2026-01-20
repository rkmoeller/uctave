import type { SoundPatch } from '../model/types/SoundPatch';
import type { Edge, Node } from '@xyflow/react';
import { nanoid } from 'nanoid';
import type { AudioGraph } from '../app/soundmaker/audioGraph';

/**
 * Creates a new SoundPatch object from the current snapshot of an AudioGraph object.
 * Used primarily to convert the current AudioGraph state to a storable patch.
 * @param soundPatch
 */
export const createSoundPatch = (
    audioGraph: AudioGraph,
    projectId: string,
    title: string,
    id?: string
): SoundPatch => {
    const { nodes, edges } = audioGraph.getPatch();

    const patch = {
        id: id ?? nanoid(),
        projectId: projectId,
        title: title,
        graph: {
            nodes: nodes,
            edges: edges,
        },
    } satisfies SoundPatch;

    return patch;
};

/**
 * Creates React Flow node and edge objects from a SoundPatch object.
 * Used primarily to load a new sound in the Sound Designer.
 * @param soundPatch
 */
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
