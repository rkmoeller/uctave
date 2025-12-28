import { useEffect, useRef } from 'react';
import { audioGraph, AudioGraph } from '../app/soundmaker/audioGraph';
import { useEdges, useNodes } from '@xyflow/react';

export const useAudioGraph = () => {
    const nodes = useNodes();
    const edges = useEdges();

    const audioGraphRef = useRef<AudioGraph | null>(audioGraph);

    useEffect(() => {
        audioGraphRef.current?.sync(nodes, edges);
    }, [nodes, edges]);

    return audioGraphRef;
};
