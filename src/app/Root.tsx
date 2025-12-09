import { ReactFlowProvider } from '@xyflow/react';
import { Outlet } from 'react-router';
import Nav from './Nav';
import useVolume from '../hooks/VolumeStore';
import { Slider } from '../components/Slider';

const Root = () => {
    const volume = useVolume((state) => state.volume);
    const setVolume = useVolume((state) => state.setVolume);

    return (
        <ReactFlowProvider>
            <div className="flex">
                <Nav />

                <div className="flex flex-col w-full h-dvh">
                    <div className="flex h-12 items-center justify-center">
                        {/* <input
                            type="range"
                            id="volume"
                            name="volume"
                            min="-15"
                            max="15"
                            onChange={(e) =>
                                setVolume(parseInt(e.target.value))
                            }
                            className="h-fit"
                        /> */}
                        <div className="w-40">
                            <Slider
                                value={volume}
                                onChange={(val) => setVolume(val)}
                                min={-20}
                                max={20}
                            />
                        </div>
                    </div>
                    <div className="bg-surface-900 flex grow rounded-tl-4xl overflow-hidden">
                        <Outlet />
                    </div>
                </div>
            </div>
        </ReactFlowProvider>
    );
};

export default Root;
