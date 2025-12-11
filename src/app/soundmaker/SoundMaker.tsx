import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Background,
    BackgroundVariant,
    ReactFlow,
    type Edge,
    type EdgeChange,
    type Node,
    type NodeChange,
} from '@xyflow/react';
import { useCallback, useState } from 'react';
import '@xyflow/react/dist/style.css';
import { Play } from 'lucide-react';
import * as Tone from 'tone';
import { nodeTypes } from '../../model/NodeTypes';

const initialNodes: Node[] = [
    {
        id: 'n1',
        type: 'synthNode',
        position: { x: -100, y: 0 },
        data: {},
        dragHandle: '.drag-handle',
    },
    {
        id: 'n2',
        type: 'synthNode',
        position: { x: 100, y: 0 },
        data: {},
        dragHandle: '.drag-handle',
    },
    {
        id: 'n3',
        position: { x: 50, y: 100 },
        data: {},
        type: 'destinationNode',
    },
];
const initialEdges: Edge[] = [
    { id: 'n1-n3', source: 'n1', target: 'n3' },
    { id: 'n2-n3', source: 'n2', target: 'n3' },
];

const SoundMaker = () => {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes: NodeChange<Node>[]) =>
            setNodes((nodesSnapshot) =>
                applyNodeChanges(changes, nodesSnapshot)
            ),
        []
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange<Edge>[]) =>
            setEdges((edgesSnapshot) =>
                applyEdgeChanges(changes, edgesSnapshot)
            ),
        []
    );
    const onConnect = useCallback((params: any) => {
        return setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot));
    }, []);

    return (
        <div className="text-white w-full relative">
            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                defaultViewport={{ zoom: 1.2, x: 0, y: 0 }}
            >
                <Background color="#272727" variant={BackgroundVariant.Dots} />
            </ReactFlow>

            {/* Toolbar */}
            <div className="bg-surface-700 absolute min-w-60 p-2 bottom-5 right-1/2 rounded-full translate-x-1/2 flex justify-center">
                <button
                    className="group hover:bg-neutral-800 h-8 w-8 rounded-md flex items-center justify-center cursor-pointer transition-all"
                    onClick={async () => {
                        await Tone.start();
                    }}
                >
                    <Play
                        fill="#ffffff"
                        className="opacity-60 group-hover:opacity-100 transition-all"
                    />
                </button>
            </div>
        </div>
    );
};

export default SoundMaker;
