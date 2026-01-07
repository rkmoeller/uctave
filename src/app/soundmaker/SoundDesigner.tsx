import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Background,
    BackgroundVariant,
    ReactFlow,
    useOnViewportChange,
    useReactFlow,
    type Edge,
    type EdgeChange,
    type Node,
    type NodeChange,
    type Viewport,
} from '@xyflow/react';
import { useCallback, useEffect, useState } from 'react';
import '@xyflow/react/dist/style.css';
import { nodeTypes } from '../../model/NodeTypes';
import { getDefaultSoundDesignerData } from './defaultData';
import { useAudioGraph } from '../../hooks/useAudioGraph';
import { SoundDesignerToolbar } from './sounddesignertoolbar/SoundDesignerToolbar';
import { useKeydown } from '../../hooks/useKeydown';
import useSoundDesignerStore from '../../store/SoundDesignerStore';
import { ZoomIn } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { useParams } from 'react-router';
import db from '../../db/db';
import { createNodesAndEdgesFromPatch } from '../../helpers/soundHelpers';

const SoundDesigner = () => {
    const { soundid } = useParams();
    const { getNode } = useReactFlow();

    const sound = useLiveQuery(() => (soundid ? db.sounds.get({ id: soundid }) : undefined), [soundid]);
    const { nodes: createdNodes, edges: createdEdges } = createNodesAndEdgesFromPatch(sound);

    const [zoom, setZoom] = useState<number>(1);

    const { defaultNodes, defaultEdges } = getDefaultSoundDesignerData();

    const [nodes, setNodes] = useState<Node[]>();
    const [edges, setEdges] = useState<Edge[]>();

    useEffect(() => {
        setNodes(createdNodes.length > 0 ? createdNodes : defaultNodes);
        setEdges(createdEdges.length > 0 ? createdEdges : defaultEdges);
    }, [createdNodes, createdEdges]);

    const { deleteElements } = useReactFlow();
    const { setSelectedNodes, selectedNodes } = useSoundDesignerStore();

    useAudioGraph();

    useKeydown('Delete', false, () => deleteElements({ nodes: selectedNodes }), [selectedNodes]);

    useOnViewportChange({
        onChange: (viewport: Viewport) => {
            setZoom(viewport.zoom);
        },
    });

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
                zoomOnDoubleClick={false}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                defaultViewport={{
                    zoom: zoom,
                    x: getNode('output')?.position.x ?? 0,
                    y: getNode('output')?.position.y ?? 0,
                }}
                onNodeClick={(_, node) => {
                    setSelectedNodes([node]);
                }}
                defaultEdgeOptions={{ type: 'smoothstep' }}
            >
                <div className="bg-white/10 text-white/60 px-3 py-1 absolute top-2 right-2 rounded-full text-xs font-semibold z-100 flex gap-1 items-center">
                    <ZoomIn size={14} />
                    {Math.floor(zoom * 100)}%
                </div>
                <Background color="#313140" bgColor="#101012" variant={BackgroundVariant.Dots} />
            </ReactFlow>

            <SoundDesignerToolbar />
        </div>
    );
};

export default SoundDesigner;
