import { createBrowserRouter } from 'react-router';
import Frontpage from '../Frontpage';
import Root from '../app/Root';
import SoundDesigner from '../app/soundmaker/SoundDesigner';
import { ProjectSelector } from '../app/projectselector/ProjectSelector';
import { Arrangement } from '../app/arrangement/Arrangement';
import { Library } from '../app/library/Library';
import { Overview } from '../app/overview/Overview';
import { RootError } from '../app/errorboundaries/RootError';

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
