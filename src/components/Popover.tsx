import { Popover } from '@base-ui/react/popover';
import { cn } from '../helpers/cn';

export const PopoverRoot = (props: Popover.Root.Props) => {
    return <Popover.Root {...props} />;
};

export const PopoverTrigger = (props: Popover.Trigger.Props) => {
    return <Popover.Trigger {...props} />;
};

export const PopoverPortal = (props: Popover.Portal.Props) => {
    return <Popover.Portal {...props} />;
};

export const PopoverBackdrop = (props: Popover.Backdrop.Props) => {
    return <Popover.Backdrop {...props} />;
};

export const PopoverPositioner = (props: Popover.Positioner.Props) => {
    return <Popover.Positioner {...props} />;
};

export const PopoverPopup = (props: Popover.Popup.Props) => {
    return (
        <Popover.Popup
            {...props}
            className={cn('bg-zinc-900 border border-zinc-800 p-3 rounded-md min-w-32 shadow-lg', props.className)}
        />
    );
};

export const PopoverArrow = (props: Popover.Arrow.Props) => {
    return <Popover.Arrow {...props} />;
};

export const PopoverViewport = (props: Popover.Viewport.Props) => {
    return <Popover.Viewport {...props} />;
};

export const PopoverTitle = (props: Popover.Title.Props) => {
    return <Popover.Title {...props} className={cn('text-white font-medium text-sm', props.className)} />;
};

export const PopoverDescription = (props: Popover.Description.Props) => {
    return <Popover.Description {...props} className={cn('text-white ', props.className)} />;
};

export const PopoverClose = (props: Popover.Close.Props) => {
    return <Popover.Close {...props} />;
};
