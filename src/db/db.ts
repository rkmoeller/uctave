import { Dexie, type EntityTable } from 'dexie';
import type { Project } from '../model/types/Project';

const db = new Dexie('uctave') as Dexie & {
    projects: EntityTable<Project, 'id'>;
};

db.version(1).stores({
    projects: 'id, title, created, updated, deleted',
});

// db.projects.add({ id: '3453', title: 'test123', created: new Date(), updated: new Date() });

export default db;
