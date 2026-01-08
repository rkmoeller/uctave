import { useLiveQuery } from 'dexie-react-hooks';
import { AudioLines } from 'lucide-react';
import db from '../../db/db';
import Button from '../../components/Button';
import type { Project } from '../../model/types/Project';
import { useState } from 'react';
import { Input } from '../../components/Input';
import { Link } from 'react-router';
import { ProjectListItem } from './ProjectListItem';
import { nanoid } from 'nanoid';

export const ProjectSelector = () => {
    const projects = useLiveQuery(async () =>
        (await db.projects.toArray()).sort((a, b) => a.created.getTime() - b.created.getTime())
    );
    const [tempProjectTitle, setTempProjectTitle] = useState<string | undefined>();

    const createProject = async () => {
        if (tempProjectTitle && tempProjectTitle.length > 0) {
            const newProject: Project = {
                id: nanoid(),
                title: tempProjectTitle,
                created: new Date(),
                updated: new Date(),
            };
            await db.projects.add(newProject);
            setTempProjectTitle(undefined);
        }
    };

    const deleteProject = (project: Project) => {
        db.projects.delete(project.id);
        db.sounds.where({ projectid: project.id }).delete();
    };

    const editProject = (editedProject: Project) => {
        db.projects.put(editedProject);
    };

    return (
        <div className="p-6 w-full h-dvh flex items-center justify-center relative">
            <Link to="/" viewTransition>
                <div className="absolute top-3 left-3 flex h-fit gap-3 items-center">
                    <div className="rounded-lg bg-primary w-8 h-8 flex items-center justify-center logo">
                        <AudioLines className="text-zinc-900" size={22} />
                    </div>
                    <div className=" text-white font-bold title">Uctave</div>
                </div>
            </Link>
            <div className="max-w-[800px] min-h-96 w-full m-auto">
                {((projects && projects.length > 0) || tempProjectTitle !== undefined) && (
                    <div className="flex justify-between items-center py-4">
                        <h1 className="text-zinc-100 font-bold text-2xl">Select project</h1>
                        <Button className="h-fit" size="small" onClick={() => setTempProjectTitle('')}>
                            New project
                        </Button>
                    </div>
                )}
                <div className="flex flex-col rounded-xl p-4 gap-2 border border-zinc-800">
                    {(!projects || projects.length === 0) && tempProjectTitle === undefined ? (
                        <div className="bg-zinc-800/50 col-span-full min-h-64 rounded-lg flex flex-col items-center justify-center gap-1">
                            <span className="text-zinc-200 font-semibold">You haven't created a project yet.</span>
                            <span className="text-zinc-500">Get started by creating a new project</span>
                            <Button className="mt-4" size="small" onClick={() => setTempProjectTitle('')}>
                                Create project
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            {projects?.map((project) => (
                                <ProjectListItem
                                    project={project}
                                    onDelete={() => deleteProject(project)}
                                    onEdit={(editedProject) => editProject(editedProject)}
                                />
                            ))}
                            {tempProjectTitle !== undefined && (
                                <div className="rounded-lg bg-zinc-800/50 p-4 flex gap-3 justify-between items-center">
                                    <Input
                                        type="text"
                                        placeholder="Project title.."
                                        value={tempProjectTitle}
                                        onChange={(e) => setTempProjectTitle(e.target.value)}
                                    />

                                    <div className="flex gap-3">
                                        <Button
                                            size="extrasmall"
                                            intent="tertiary"
                                            className="w-full py-1.5"
                                            onClick={() => setTempProjectTitle(undefined)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            size="extrasmall"
                                            intent="secondary"
                                            className="w-full py-1.5"
                                            onClick={createProject}
                                            disabled={tempProjectTitle.length === 0}
                                        >
                                            Create
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
