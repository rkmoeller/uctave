import { AudioLines, Brush, Download, FileMusic, PanelTopBottomDashed } from 'lucide-react';
import { Link, NavLink } from 'react-router';

import {} from 'lucide-react';
import { useActiveProject } from '../hooks/useProject';
import { cn } from '../helpers/cn';
import Button from '../components/Button';

const navItems = [
    {
        path: 'overview',
        text: 'Overview',
        icon: <PanelTopBottomDashed size={16} />,
    },
    {
        path: 'arrangement',
        text: 'Arrangement',
        icon: <PanelTopBottomDashed size={16} />,
    },
    {
        path: 'sounddesigner',
        text: 'Sound Designer',
        icon: <Brush size={16} />,
    },
    {
        path: 'library',
        text: 'Library',
        icon: <FileMusic size={16} />,
    },
];

const Nav = () => {
    const project = useActiveProject();

    if (!project) {
        return <>pending</>;
    }

    return (
        <div className="flex items-center justify-between w-full shrink-0 p-3 gap-4 border-b border-l border-zinc-800">
            <div className="flex items-center gap-4">
                <Link to="/app">
                    <div className="flex h-fit gap-3 items-center">
                        <div className="rounded-lg bg-primary hover:bg-primary-hover w-8 h-8 flex items-center justify-center">
                            <AudioLines className="text-zinc-900" size={20} />
                        </div>
                        <div>
                            <div className="text-white/80 hover:text-white font-medium text-xs bg-zinc-800 rounded-full px-3 py-1">
                                {project.title}
                            </div>
                            {/* <div className="text-white/30 text-xs">{project?.updated.toLocaleString()}</div> */}
                        </div>
                    </div>
                </Link>
            </div>

            <div className="flex rounded-full gap-1.5  bg-zinc-800 px-2 py-1.5">
                {navItems.map((item) => (
                    <NavLink to={item.path} key={item.path} viewTransition>
                        {({ isActive }) => {
                            return (
                                <div
                                    className={cn(
                                        'tab text-xs px-3 py-1 rounded-full text-white/80 text-center hover:bg-zinc-700/50 hover:text-white transition-all',
                                        isActive &&
                                            'bg-primary hover:bg-primary-hover text-zinc-800 hover:text-zinc-900 font-semibold'
                                    )}
                                    style={{
                                        viewTransitionName: isActive ? 'active-tab' : undefined,
                                    }}
                                >
                                    <span className="translate-y-px">{item.text}</span>
                                </div>
                            );
                        }}
                    </NavLink>
                ))}
            </div>

            <Button className="rounded-full text-sm" size="extrasmall" intent="secondary" disabled>
                <Download size={16} />
                Export
            </Button>
        </div>
    );
};

export default Nav;
