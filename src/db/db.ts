import { Dexie, type EntityTable } from 'dexie';
import type { Project } from '../model/types/Project';
import type { SoundPatch } from '../model/types/SoundPatch';

const db = new Dexie('uctave') as Dexie & {
    projects: EntityTable<Project, 'id'>;
    sounds: EntityTable<SoundPatch, 'id'>;
};

db.version(1).stores({
    projects: 'id, title, created, updated, deleted',
    sounds: 'id, title, graph, projectId',
});

// db.projects.add({ id: '3453', title: 'test123', created: new Date(), updated: new Date() });

export default db;
