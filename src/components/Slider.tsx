import { Slider as BaseSlider } from '@base-ui/react';

interface SliderProps {
    value: number;
    onChange: (val: number) => void;
    min?: number;
    max?: number;
}

export const Slider = (props: SliderProps) => {
    const { value, onChange, min = 0, max = 100 } = props;

    return (
        <BaseSlider.Root value={value} onValueChange={onChange} min={min} max={max}>
            <BaseSlider.Control>
                <div className="flex items-center gap-4 ">
                    <BaseSlider.Track className="bg-white/10 h-1.5 w-full rounded-full">
                        <BaseSlider.Indicator className="bg-linear-to-r from-blue-400 to-primary rounded-full" />
                        <BaseSlider.Thumb className="bg-neutral-100 w-4 h-4 rounded-full" />
                    </BaseSlider.Track>
                    <span className="text-sm text-white/30 w-2">{value}</span>
                </div>
            </BaseSlider.Control>
        </BaseSlider.Root>
    );
};
