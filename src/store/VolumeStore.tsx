import { create } from 'zustand';

interface VolumeState {
    volume: number;
    setVolume: (newVolume: number) => void;
}

const useVolume = create<VolumeState>()((set) => ({
    volume: 0,
    setVolume: (newVolume: number) => set(() => ({ volume: newVolume })),
}));

export default useVolume;
