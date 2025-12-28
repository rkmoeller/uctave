import { Select } from '@base-ui/react/select';
import * as React from 'react';

export function SelectRoot<Value, Multiple extends boolean | undefined = false>(
    props: Select.Root.Props<Value, Multiple>
): React.JSX.Element {
    return <Select.Root {...props} />;
}

export function SelectTrigger(props: Select.Trigger.Props): React.JSX.Element {
    return <Select.Trigger {...props} />;
}

export function SelectValue(props: Select.Value.Props): React.JSX.Element {
    return <Select.Value {...props} />;
}

export function SelectIcon(props: Select.Icon.Props): React.JSX.Element {
    return <Select.Icon {...props} />;
}

export function SelectPortal(props: Select.Portal.Props): React.JSX.Element {
    return <Select.Portal {...props} />;
}

export function SelectBackdrop(props: Select.Backdrop.Props): React.JSX.Element {
    return <Select.Backdrop {...props} />;
}

export function SelectPositioner(props: Select.Positioner.Props): React.JSX.Element {
    return <Select.Positioner {...props} />;
}

export function SelectScrollUpArrow(props: Select.ScrollUpArrow.Props): React.JSX.Element {
    return <Select.ScrollUpArrow {...props} />;
}

export function SelectScrollDownArrow(props: Select.ScrollDownArrow.Props): React.JSX.Element {
    return <Select.ScrollDownArrow {...props} />;
}

export function SelectPopup(props: Select.Popup.Props): React.JSX.Element {
    return <Select.Popup {...props} className="bg- p-2 rounded-md" />;
}

export function SelectArrow(props: Select.Arrow.Props): React.JSX.Element {
    return <Select.Arrow {...props} />;
}

export function SelectList(props: Select.List.Props): React.JSX.Element {
    return <Select.List {...props} />;
}

export function SelectItem(props: Select.Item.Props): React.JSX.Element {
    return <Select.Item {...props} className="flex items-center" />;
}

export function SelectItemText(props: Select.ItemText.Props): React.JSX.Element {
    return <Select.ItemText {...props} className="text-white" />;
}

export function SelectItemIndicator(props: Select.ItemIndicator.Props): React.JSX.Element {
    return <Select.ItemIndicator {...props} className="text-white1" />;
}

export function SelectSeperator(props: Select.Separator.Props): React.JSX.Element {
    return <Select.Separator {...props} />;
}

export function SelectGroup(props: Select.Group.Props): React.JSX.Element {
    return <Select.Group {...props} />;
}

export function SelectGroupLabel(props: Select.GroupLabel.Props): React.JSX.Element {
    return <Select.Group {...props} />;
}
