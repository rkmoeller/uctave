import { RouterProvider } from 'react-router'
import { routes } from './config/router'

function App() {
    return (
        <div className="bg-surface-700 w-full h-dvh overflow-x-hidden overflow-y-auto">
            <RouterProvider router={routes} />
        </div>
    )
}

export default App
