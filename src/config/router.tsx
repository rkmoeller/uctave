import { createBrowserRouter } from 'react-router'
import Frontpage from '../Frontpage'
import Root from '../app/Root'
import SoundMaker from '../app/soundmaker/SoundMaker'

export const routes = createBrowserRouter([
    {
        path: '/',
        Component: Frontpage,
    },
    {
        path: '/app',
        Component: Root,
        children: [
            {
                path: '/app/soundmaker',
                Component: SoundMaker,
            },
        ],
    },
])
