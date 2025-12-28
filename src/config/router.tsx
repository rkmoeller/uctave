import { createBrowserRouter } from 'react-router';
import Frontpage from '../Frontpage';
import Root from '../app/Root';
import SoundMaker from '../app/soundmaker/SoundMaker';
import { Files } from '../app/files/Files';
import { ProjectSelector } from '../app/ProjectSelector/ProjectSelector';

export const routes = createBrowserRouter([
    {
        path: '/',
        Component: Frontpage,
    },
    {
        path: '/app',
        Component: ProjectSelector,
    },
    {
        path: '/app/:projectid',
        Component: Root,
        children: [
            {
                path: 'sounddesigner',
                Component: SoundMaker,
            },
            {
                path: 'files',
                Component: Files,
            },
        ],
    },
]);
