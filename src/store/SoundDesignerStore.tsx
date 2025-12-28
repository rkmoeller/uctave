import { create } from 'zustand';
import type { Node } from '@xyflow/react';

interface SoundDesignerState {
    selectedNodes: Node[];
    setSelectedNodes: (newNodes: Node[]) => void;
}

const useSoundDesignerStore = create<SoundDesignerState>()((set) => ({
    selectedNodes: [],
    setSelectedNodes: (newNodes: Node[]) => set(() => ({ selectedNodes: newNodes })),
}));

export default useSoundDesignerStore;
