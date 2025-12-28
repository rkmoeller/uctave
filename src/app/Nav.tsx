import { AudioLines, Brush, FileMusic, PanelTopBottomDashed } from 'lucide-react';
import { Link, NavLink } from 'react-router';
import { cn } from '../helpers/cn';
import {} from 'lucide-react';
import { useActiveProject } from '../hooks/useProject';

const navItems = [
    {
        path: 'app',
        text: 'Arrangement',
        icon: <PanelTopBottomDashed size={16} />,
    },
    {
        path: 'sounddesigner',
        text: 'Sound Designer',
        icon: <Brush size={16} />,
    },
    {
        path: 'files',
        text: 'Files',
        icon: <FileMusic size={16} />,
    },
];

const Nav = () => {
    const project = useActiveProject();

    return (
        <div className="flex flex-col w-64 shrink-0 p-4 gap-4">
            <Link to="/app">
                <div className="flex h-fit gap-3 items-center">
                    <div className="rounded-lg bg-primary w-9 h-9 flex items-center justify-center">
                        <AudioLines className="text-zinc-900" size={22} />
                    </div>
                    <div className=" text-white font-bold">Oxillate</div>
                </div>
            </Link>

            <div className="border-y border-white/5 py-6  w-[95%] self-center text-zinc-100">{project?.title}</div>

            {/* <div className="h-px w-[95%] my-1 self-center bg-white/5" /> */}

            <div className="flex flex-col gap-1.5 w-full">
                {navItems.map((item) => (
                    <NavLink to={item.path} key={item.path} end>
                        {({ isActive }) => {
                            return (
                                <div
                                    className={cn(
                                        'text-white text-sm hover:bg-zinc-800 px-2 py-1.5 rounded-md flex gap-3 items-center',
                                        isActive && 'text-primary bg-zinc-800/80'
                                    )}
                                >
                                    {item.icon}
                                    <span className="translate-y-px">{item.text}</span>
                                </div>
                            );
                        }}
                    </NavLink>
                ))}
            </div>

            {/* <div className="w-full h-px bg-neutral-800"></div> */}
        </div>
    );
};

export default Nav;
