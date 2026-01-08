import { Dialog } from '@base-ui/react/dialog';
import type { JSX } from 'react';

export function DialogRoot(props: Dialog.Root.Props): JSX.Element {
    return <Dialog.Root {...props} />;
}

export function DialogTrigger(props: Dialog.Trigger.Props): JSX.Element {
    return <Dialog.Trigger {...props} />;
}

export function DialogPortal(props: Dialog.Portal.Props): JSX.Element {
    return <Dialog.Portal {...props} />;
}

export function DialogBackdrop(props: Dialog.Backdrop.Props): JSX.Element {
    return <Dialog.Backdrop {...props} className="inset-0 fixed bg-black/70 p-4" />;
}

export function DialogViewport(props: Dialog.Viewport.Props): JSX.Element {
    return <Dialog.Viewport {...props} />;
}

export function DialogPopup(props: Dialog.Popup.Props): JSX.Element {
    return (
        <Dialog.Popup
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 border border-zinc-800 px-6 py-5 rounded-xl w-[calc(100%-2rem)] max-w-lg"
            {...props}
        />
    );
}

export function DialogTitle(props: Dialog.Title.Props): JSX.Element {
    return <Dialog.Title className="text-zinc-100 font-semibold" {...props} />;
}

export function DialogDescription(props: Dialog.Description.Props): JSX.Element {
    return <Dialog.Description className="text-zinc-500 text-sm font-medium" {...props} />;
}

export function DialogClose(props: Dialog.Close.Props): JSX.Element {
    return <Dialog.Close {...props} />;
}
