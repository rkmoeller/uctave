import {
    ContextMenu,
    type MenuItemProps,
    type MenuPopupProps,
} from '@base-ui-components/react';
import { cn } from '../helpers/cn';

export const ContextMenuItem = (props: MenuItemProps) => {
    return (
        <ContextMenu.Item
            {...props}
            className={cn(
                'text-neutral-100 hover:bg-neutral-700/50 px-3 py-2 rounded-md cursor-pointer text-sm flex items-center gap-2',
                props.className
            )}
        />
    );
};

export const ContextMenuPopup = (props: MenuPopupProps) => {
    return (
        <ContextMenu.Popup
            {...props}
            className="bg-neutral-800 border border-neutral-700/50 p-1 rounded-lg shadow-md"
        />
    );
};
