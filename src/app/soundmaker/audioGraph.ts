import type { Edge, Node } from '@xyflow/react';
import * as Tone from 'tone';
import type { NodeTypeNames } from '../../model/NodeTypes';

export class AudioGraph {
    // Holds references to all the ToneJS node objects
    toneNodes = new Map<string, any>();

    // Holds references to all the React Flow objects
    agNodes = new Map<string, Node>();
    agEdges = new Map<string, Edge>();

    /**
     * Syncs the React Flow node-structure to the correct ToneJS state.
     * @param nodes A list of React Flow Nodes
     * @param edges A list of React Flow Edges
     */
    sync(nodes: Node[], edges: Edge[]) {
        const newNodes = new Map<string, Node>(nodes.map((n) => [n.id, n]));
        const newEdges = new Map<string, Edge>(edges.map((e) => [e.id, e]));

        this.updateNodes(newNodes);
        this.updateEdges(newEdges);

        this.agNodes = newNodes;
        this.agEdges = newEdges;
    }

    updateNodes(nodes: Map<string, Node>) {
        // Add new nodes
        for (const [id, node] of nodes) {
            const exists = this.toneNodes.has(id);

            if (!exists) {
                this.toneNodes.set(id, this.createToneNode(node));
            }
        }

        // Remove old nodes
        for (const [id] of this.toneNodes.keys()) {
            if (!nodes.has(id)) {
                this.toneNodes.delete(id);
            }
        }
    }

    updateEdges(edges: Map<string, Edge>) {
        // Create connections based on new edges
        for (const [id] of edges) {
            if (!this.agEdges.has(id)) {
                const sourceId = id.split('-')[0];
                const targetId = id.split('-')[1];

                const source = this.toneNodes.get(sourceId);
                const target = this.toneNodes.get(targetId);

                if (source && target) {
                    source.connect(target);
                }
            }
        }

        // Disconnect nodes based on missing edges
        for (const [id] of this.agEdges) {
            if (!edges.has(id)) {
                const sourceId = id.split('-')[0];
                const targetId = id.split('-')[1];

                const source: Tone.ToneAudioNode = this.toneNodes.get(sourceId);
                const target: Tone.ToneAudioNode = this.toneNodes.get(targetId);

                if (source && target) {
                    source.disconnect(target);
                }
            }
        }
    }

    updateParams<T>(id: string, newParams: T) {
        const toneNode = this.toneNodes.get(id);
        toneNode.set(newParams);
    }

    createToneNode(node: Node) {
        const type: NodeTypeNames = node.type as NodeTypeNames;
        switch (type) {
            case 'synthNode':
                return new Tone.Synth({ ...node.data });
            case 'distortionNode':
                return new Tone.Distortion({ ...node.data });
            case 'destinationNode': {
                const gain = new Tone.Gain({ ...node.data });
                gain.toDestination();
                return gain;
            }
            default:
                break;
        }
    }

    getToneNode(id: string) {
        return this.toneNodes.get(id);
    }

    isNodePlayable(node: any) {
        if (typeof node.triggerAttackRelease === 'function') {
            return true;
        }
        return false;
    }

    play() {
        this.toneNodes.forEach((node) => {
            if (this.isNodePlayable(node)) {
                node.triggerAttackRelease('c4', '8n');
            }
        });
    }

    playNode(id: string) {
        const node = this.toneNodes.get(id);
        if (this.isNodePlayable(node)) {
            node.triggerAttackRelease('c4', '8n');
        }
    }
}

export const audioGraph = new AudioGraph();
