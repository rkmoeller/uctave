import { useRouteError } from 'react-router';
import { Error404 } from './404';

export const RootError = () => {
    const error: any = useRouteError();

    switch (error.status) {
        case 404: {
            return <Error404 />;
        }
        default: {
            return <div>Oops!</div>;
        }
    }
};
