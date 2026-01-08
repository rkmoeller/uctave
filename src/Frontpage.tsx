import { Link } from 'react-router';
import Button from './components/Button';

const Frontpage = () => {
    return (
        <div className="flex flex-col justify-center items-center h-full bg-zinc-950/80 gap-10 overflow-hidden p-8">
            <div className="flex flex-col items-center gap-1 sm:gap-0">
                <h1 className="text-white text-7xl sm:text-9xl italic font-bold title">Uctave</h1>
                <h2 className="text-zinc-500 text-xl sm:text-3xl font-semibold">Digital Audio Workstation</h2>
            </div>

            <div className="flex gap-4 z-100">
                <Link to="/app" viewTransition>
                    <Button className="logo rounded-full" size="small">
                        Try as guest
                    </Button>
                </Link>
                <Link to="/app" viewTransition>
                    <Button className="logo rounded-full" intent="tertiary" size="small" disabled>
                        Login
                    </Button>
                </Link>
            </div>
            <div className="relative flex flex-col items-center">
                <div className="mask-b-from-50% mask-b-to-90% p-3 relative">
                    <img
                        src="/product.png"
                        className="w-5xl outline-8 outline-primary/10 rounded-xl border border-primary/30 z-10"
                    />
                </div>

                <div
                    className="w-[1400px] opacity-8 aspect-square rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute"
                    style={{
                        background: 'radial-gradient(farthest-side, var(--color-primary), transparent)',
                    }}
                />
            </div>
        </div>
    );
};

export default Frontpage;
