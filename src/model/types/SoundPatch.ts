import type { Edge, Node } from '@xyflow/react';

export type SoundPatch = {
    id: string;
    title: string;
    projectId: string;
    graph: {
        nodes: NodePatch[];
        edges: EdgePatch[];
    };
};

export type NodePatch = Pick<Node, 'type' | 'data' | 'id' | 'position'>;
export type EdgePatch = Pick<Edge, 'source' | 'target' | 'id'>;
