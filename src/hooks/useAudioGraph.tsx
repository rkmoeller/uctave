import { useEffect, useRef } from 'react';

import { useEdges, useNodes } from '@xyflow/react';
import { audioGraph, type AudioGraph } from '../app/soundmaker/audioGraph';

export const useAudioGraph = () => {
    const nodes = useNodes();
    const edges = useEdges();

    const audioGraphRef = useRef<AudioGraph | null>(audioGraph);

    useEffect(() => {
        audioGraphRef.current?.sync(nodes, edges);
    }, [nodes, edges]);

    return audioGraphRef;
};
