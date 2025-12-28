import { Handle, Position } from '@xyflow/react';
import { Headphones } from 'lucide-react';
import { useAudioGraph } from '../../../hooks/useAudioGraph';

export const DestinationNode = () => {
    const audioGraph = useAudioGraph();

    const play = () => {
        audioGraph.current?.play();
    };

    return (
        <div
            className="bg-neutral-800 rounded-md px-4 py-2 text-neutral-100 hover:shadow-lg hover:shadow-primary/5"
            onClick={play}
        >
            <Headphones className="text-primary" size={16} />
            <Handle type="target" position={Position.Top} />
        </div>
    );
};
