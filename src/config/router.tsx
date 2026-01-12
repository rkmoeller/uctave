import { createBrowserRouter } from 'react-router';
import Frontpage from '../Frontpage';
import Root from '../app/Root';
import { ProjectSelector } from '../app/ProjectSelector/ProjectSelector';
import { RootError } from '../app/ErrorBoundaries/RootError';
import { Overview } from '../app/Overview/Overview';
import { Arrangement } from '../app/Arrangement/Arrangement';
import SoundDesigner from '../app/SoundDesigner/SoundDesigner';
import { Library } from 'lucide-react';

export const routes = createBrowserRouter([
    {
        path: '/',
        Component: Frontpage,
        errorElement: <RootError />,
    },
    {
        path: '/app',
        Component: ProjectSelector,
    },
    {
        path: '/app/:projectid',
        Component: Root,
        errorElement: <RootError />,
        children: [
            {
                path: 'overview',
                Component: Overview,
            },
            {
                path: 'arrangement',
                Component: Arrangement,
            },
            {
                path: 'sounddesigner',
                Component: SoundDesigner,
            },
            {
                path: 'sounddesigner/:soundid',
                Component: SoundDesigner,
            },
            {
                path: 'library',
                Component: Library,
            },
        ],
    },
]);
