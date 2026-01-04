import { Outlet } from 'react-router';
import Nav from './Nav';
import { ReactFlowProvider } from '@xyflow/react';

const Root = () => {
    return (
        <ReactFlowProvider>
            <div className="flex flex-col h-dvh">
                <Nav />

                <div className="flex flex-col w-full grow bg-surface-900">
                    <Outlet />
                </div>
            </div>
        </ReactFlowProvider>
    );
};

export default Root;
