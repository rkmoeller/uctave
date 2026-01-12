import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import { useParams } from 'react-router';
import db from '../db/db';
import { useOnViewportChange, type Viewport } from '@xyflow/react';
import { useAudioGraph } from './useAudioGraph';
import useSoundDesignerStore from '../store/SoundDesignerStore';
import { getDefaultSoundDesignerData } from '../app/soundmaker/defaultData';
import { createNodesAndEdgesFromPatch } from '../helpers/soundHelpers';
import type { PendingStatus } from '../model/types/PendingStatus';

export const useSoundDesigner = () => {
    const { soundid } = useParams();
    const { selectedNodes, setSelectedNodes } = useSoundDesignerStore();

    const { defaultNodes, defaultEdges } = getDefaultSoundDesignerData();

    const [status, setStatus] = useState<PendingStatus>('pending');
    const [zoom, setZoom] = useState<number>(1);

    const sound = useLiveQuery(async () => {
        if (soundid) {
            const sound = await db.sounds.get({ id: soundid });

            if (!sound && soundid) {
                console.log(soundid);
                throw new Error();
            }
            setStatus('resolved');
            return sound;
        }
        setStatus('resolved');
        return undefined;
    }, [soundid]);

    const { nodes: createdNodes, edges: createdEdges } = createNodesAndEdgesFromPatch(sound);

    useOnViewportChange({
        onChange: (viewport: Viewport) => {
            setZoom(viewport.zoom);
        },
    });

    useAudioGraph();

    return {
        sound,
        status,
        zoom,
        selectedNodes,
        setSelectedNodes,
        defaultNodes,
        defaultEdges,
        createdNodes,
        createdEdges,
    };
};
