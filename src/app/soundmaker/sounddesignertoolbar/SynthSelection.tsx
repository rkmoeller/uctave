interface SoundSelectionProps {
    onSelect: () => void;
}

export const SynthSelection = ({ onSelect }: SoundSelectionProps) => {
    return <div className="flex flex-wrap gap-4 h-full overflow-y-auto">Synths</div>;
};
