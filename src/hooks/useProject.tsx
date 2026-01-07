import { useLiveQuery } from 'dexie-react-hooks';
import { useParams } from 'react-router';
import db from '../db/db';

export const useActiveProject = () => {
    const { projectid } = useParams();
    const project = useLiveQuery(() => db.projects.get({ id: projectid }));

    return project;
};
