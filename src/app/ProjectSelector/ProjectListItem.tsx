import { Pencil, Trash } from 'lucide-react';
import type { Project } from '../../model/types/Project';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { cn } from '../../helpers/cn';
import { Input } from '../../components/Input';
import Button from '../../components/Button';

interface ProjectListItemProps {
    project: Project;
    onDelete: () => void;
    onEdit: (editedProject: Project) => void;
}

export const ProjectListItem = ({ project, onDelete, onEdit }: ProjectListItemProps) => {
    const [hovered, setHovered] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [tempProject, setTempProject] = useState<Project>(project);

    const navigate = useNavigate();

    const goto = () => {
        if (!isEditing) {
            navigate(project.id);
        }
    };

    return (
        <div
            className={cn(
                'bg-zinc-800/50 rounded-lg flex items-center justify-between gap-2 text-zinc-100 font-semibold outline outline-transparent cursor-pointer hover-within:hover:outline-primary',
                hovered && !isEditing && 'outline-primary'
            )}
        >
            <div
                onClick={goto}
                className={cn('grow rounded p-4 flex group gap-4 items-center')}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {!isEditing ? (
                    <span>{project.title}</span>
                ) : (
                    <Input
                        className="font-normal"
                        placeholder="Project title.."
                        value={tempProject.title}
                        onChange={(e) => setTempProject({ ...tempProject, title: e.target.value })}
                    />
                )}
            </div>

            <div className="flex items-center gap-1 px-4">
                {!isEditing ? (
                    <>
                        <button
                            className="text-zinc-100/30 hover:text-zinc-100 hover:bg-zinc-800 p-1 rounded"
                            onClick={() => setIsEditing(true)}
                        >
                            <Pencil size={16} />
                        </button>
                        <button
                            className="text-zinc-100/30 hover:text-rose-400 hover:bg-zinc-800 p-1 rounded"
                            onClick={onDelete}
                        >
                            <Trash size={16} />
                        </button>
                    </>
                ) : (
                    <div className="flex gap-2">
                        <Button
                            size="extrasmall"
                            intent="tertiary"
                            onClick={() => {
                                setTempProject(project);
                                setIsEditing(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            size="extrasmall"
                            intent="secondary"
                            disabled={tempProject.title.length === 0}
                            onClick={() => {
                                onEdit(tempProject);
                                setIsEditing(false);
                            }}
                        >
                            Confirm
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
