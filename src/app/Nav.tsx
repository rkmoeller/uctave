import { AudioLines } from 'lucide-react';
import { NavLink } from 'react-router';
import { cn } from '../helpers/cn';

const navItems = [
    {
        path: '/app',
        text: 'Arrangement',
    },
    {
        path: '/app/soundmaker',
        text: 'Sound Designer',
    },
];

const Nav = () => {
    return (
        <div className="flex flex-col w-80 shrink-0 p-6 gap-4">
            <div className="flex h-fit gap-2 items-center ">
                <div className="rounded-lg bg-primary w-9 h-9 flex items-center justify-center">
                    <AudioLines className="text-white" />
                </div>
                <div className=" text-white font-bold">Dukebox</div>
            </div>

            {navItems.map((item) => (
                <NavLink to={item.path} key={item.path} end>
                    {({ isActive }) => (
                        <span
                            className={cn(
                                'text-white',
                                isActive && 'text-primary'
                            )}
                        >
                            {item.text}
                        </span>
                    )}
                </NavLink>
            ))}

            {/* <div className="w-full h-px bg-neutral-800"></div> */}
        </div>
    );
};

export default Nav;
