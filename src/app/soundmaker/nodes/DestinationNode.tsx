import {
    Handle,
    Position,
    useNodeConnections,
    useNodesData,
} from '@xyflow/react';
import { Headphones } from 'lucide-react';
import { useEffect } from 'react';

export const DestinationNode = () => {
    const connections = useNodeConnections({
        handleType: 'target',
    });

    const nodesData = useNodesData(connections.map((c) => c.source));

    useEffect(() => console.log(nodesData), [nodesData]);

    const play = () => {
        nodesData.forEach((item) => {
            item.data.value.triggerAttackRelease('C2', '8n').toDestination();
        });
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
