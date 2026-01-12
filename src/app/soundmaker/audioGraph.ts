import * as Tone from 'tone';
import type { NodeTypeNames } from '../../model/NodeTypes';
import type { SynthNodeParams } from '../../model/types/NodeTypes';
import { createSynthFromParams } from '../../helpers/nodeHelpers/nodeHelpers';
import type { EdgePatch, NodePatch } from '../../model/types/SoundPatch';

export class AudioGraph {
    // Holds references to all the ToneJS node objects
    toneNodes = new Map<string, any>();

    // Holds references to all the React Flow objects
    agNodes = new Map<string, NodePatch>();
    agEdges = new Map<string, EdgePatch>();

    /**
     * Syncs the React Flow node-structure to the correct ToneJS state.
     * @param nodes A list of React Flow Nodes
     * @param edges A list of React Flow Edges
     */
    public sync(nodes: NodePatch[], edges: EdgePatch[]) {
        const newNodes = new Map<string, NodePatch>(nodes.map((n) => [n.id, n]));
        const newEdges = new Map<string, EdgePatch>(edges.map((e) => [e.id, e]));

        this.updateNodes(newNodes);
        this.updateEdges(newEdges);

        this.agNodes = newNodes;
        this.agEdges = newEdges;
    }

    private updateNodes(nodes: Map<string, NodePatch>) {
        // Add new nodes
        for (const [id, node] of nodes) {
            const existingNode: Tone.ToneAudioNode | undefined = this.toneNodes.get(id);

            if (!existingNode) {
                this.toneNodes.set(id, this.createToneNode(node));
            } else {
                existingNode.set({ ...node.data });
            }
        }

        // Remove old nodes
        for (const [id, toneNode] of this.toneNodes) {
            if (!nodes.has(id)) {
                this.toneNodes.delete(id);
                toneNode.disconnect();
                toneNode.dispose();
            }
        }
    }

    private updateEdges(edges: Map<string, EdgePatch>) {
        // Create connections based on new edges
        for (const [id] of edges) {
            if (!this.agEdges.has(id)) {
                const sourceId = id.split('->')[0];
                const targetId = id.split('->')[1];

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

    private createToneNode(node: NodePatch) {
        const type = node.type as NodeTypeNames;
        switch (type) {
            case 'synthNode': {
                const params = node.data as SynthNodeParams;
                return createSynthFromParams(params);
            }

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

    public getToneNode(id: string) {
        return this.toneNodes.get(id);
    }

    private isNodePlayable(node: any) {
        if (typeof node.triggerAttackRelease === 'function') {
            return true;
        }
        return false;
    }

    public play() {
        this.toneNodes.forEach((node) => {
            if (this.isNodePlayable(node)) {
                node.triggerAttackRelease('c4', '8n');
            }
        });
    }

    public playNode(id: string) {
        const node = this.toneNodes.get(id);
        if (this.isNodePlayable(node)) {
            node.triggerAttackRelease('c4', '8n');
        }
    }

    public getPatch(): { nodes: NodePatch[]; edges: EdgePatch[] } {
        const nodePatches: NodePatch[] = Array.from(this.agNodes).map(([id, node]) => ({
            type: node.type,
            id: id,
            data: node.data,
            position: node.position,
        }));

        const edgePatches: EdgePatch[] = Array.from(this.agEdges).map(([id, edge]) => ({
            id: id,
            source: edge.source,
            target: edge.target,
        }));

        return {
            nodes: nodePatches,
            edges: edgePatches,
        };
    }
}

export const audioGraph = new AudioGraph();
