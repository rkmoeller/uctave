import { RouterProvider } from 'react-router';
import { routes } from './config/router';
import { Toaster } from 'sonner';

function App() {
    return (
        <div className="bg-zinc-900 w-full h-dvh overflow-x-hidden overflow-y-auto">
            <Toaster />
            <RouterProvider router={routes} />
        </div>
    );
}

export default App;
