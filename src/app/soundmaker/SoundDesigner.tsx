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
import { SoundDesignerToolbar } from './sounddesignertoolbar/SoundDesignerToolbar';
import { useKeydown } from '../../hooks/useKeydown';
import useSoundDesignerStore from '../../store/SoundDesignerStore';

const SoundDesigner = () => {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const { deleteElements } = useReactFlow();
    const { setSelectedNodes, selectedNodes } = useSoundDesignerStore();

    useAudioGraph();

    useKeydown('Delete', () => deleteElements({ nodes: selectedNodes }), [selectedNodes]);

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
        <div className="text-white w-fullf flex flex-col grow relative">
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
            >
                <Background color="#313140" bgColor="#101012" variant={BackgroundVariant.Dots} />
            </ReactFlow>

            <SoundDesignerToolbar />
        </div>
    );
};

export default SoundDesigner;
