import type { AudioGraph } from '../../app/soundmaker/audioGraph';

export type Sound = {
    id: string;
    title: string;
    audioGraph: AudioGraph;
    projectId: string;
};
