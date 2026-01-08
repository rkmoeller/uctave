import { Link, useNavigate } from 'react-router';
import Button from '../../components/Button';

export const Error404 = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-dvh flex justify-center items-center flex-col overflow-hidden relative">
            <h1 className="text-primary font-extrabold text-9xl italic">404</h1>
            <h2 className="text-zinc-600 font-semibold text-2xl">Page not found!</h2>

            <div className="flex gap-2 mt-8">
                <Button onClick={() => navigate(-1)} className="z-10" size="small">
                    Go back
                </Button>
                <Link to="/" className="z-10">
                    <Button intent="tertiary" size="small">
                        Frontpage
                    </Button>
                </Link>
            </div>

            <div
                className="w-[1400px] opacity-5 aspect-square rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute"
                style={{
                    background: 'radial-gradient(farthest-side, var(--color-primary), transparent)',
                }}
            />
        </div>
    );
};
