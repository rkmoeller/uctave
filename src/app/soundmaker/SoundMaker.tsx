import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Background,
    BackgroundVariant,
    ReactFlow,
    useReactFlow,
    type Edge,
    type EdgeChange,
    type Node,
    type NodeChange,
} from '@xyflow/react';
import { useCallback, useState } from 'react';
import '@xyflow/react/dist/style.css';
import { nodeTypes } from '../../model/NodeTypes';
import { initialEdges, initialNodes } from './initialData';
import { useAudioGraph } from '../../hooks/useAudioGraph';
import { Toolbar } from './Toolbar/Toolbar';
import { useKeydown } from '../../hooks/useKeydown';
import useSoundDesignerStore from '../../store/SoundDesignerStore';

const SoundMaker = () => {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const { deleteElements } = useReactFlow();
    const { setSelectedNodes, selectedNodes } = useSoundDesignerStore();

    useAudioGraph();

    useKeydown('Delete', () => deleteElements({ nodes: selectedNodes }), [selectedNodes]);

    console.log('HIT');

    const onNodesChange = useCallback(
        (changes: NodeChange<Node>[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        []
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange<Edge>[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
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
                onNodeClick={(_, node) => {
                    setSelectedNodes([node]);
                }}
                defaultEdgeOptions={{ type: 'smoothstep', style: { color: 'red' } }}
                onPaneClick={(e) => console.log(e)}
            >
                <Background color="#313140" bgColor="#101012" variant={BackgroundVariant.Dots} />
            </ReactFlow>

            {/* Toolbar */}
            <Toolbar />
        </div>
    );
};

export default SoundMaker;
