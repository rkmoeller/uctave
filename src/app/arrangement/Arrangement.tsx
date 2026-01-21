import { ArrangementCanvas } from './ArrangementCanvas';

export const Arrangement = () => {
    return (
        <div className="grow flex flex-col text-white/30 font-semibold overflow-hidden">
            <div className="flex grow h-[calc(100dvh-120px)]">
                <div className="bg-zinc-900 w-72 shrink-0 border-r border-zinc-800" />
                <div className="overflow-hidden">
                    <ArrangementCanvas />
                </div>
            </div>
            <div className="bg-zinc-900 h-14 shrink-0 border-t border-zinc-800" />
        </div>
    );
};
