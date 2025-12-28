import { Menu } from '@base-ui/react/menu';

export const MenuRoot = (props: Menu.Root.Props) => {
    return <Menu.Root {...props} />;
};

export const MenuTrigger = (props: Menu.Trigger.Props) => {
    return <Menu.Trigger {...props} />;
};

export const MenuPortal = (props: Menu.Portal.Props) => {
    return <Menu.Portal {...props} />;
};

export const MenuBackdrop = (props: Menu.Backdrop.Props) => {
    return <Menu.Backdrop {...props} />;
};

export const MenuPositioner = (props: Menu.Positioner.Props) => {
    return <Menu.Positioner {...props} />;
};

export const MenuPopup = (props: Menu.Popup.Props) => {
    return <Menu.Popup {...props} className="bg-zinc-900 border border-zinc-800 p-1.5 rounded-md min-w-32" />;
};

export const MenuArrow = (props: Menu.Arrow.Props) => {
    return <Menu.Arrow {...props} />;
};

export const MenuItem = (props: Menu.Item.Props) => {
    return (
        <Menu.Item
            {...props}
            className="px-2 py-1.5 text-sm rounded-sm text-white/60 hover:text-white cursor-pointer hover:bg-white/5"
        />
    );
};

export const MenuSeparator = (props: Menu.Separator.Props) => {
    return <Menu.Separator {...props} />;
};

export const MenuGroup = (props: Menu.Group.Props) => {
    return <Menu.Group {...props} />;
};

export const MenuGroupLabel = (props: Menu.GroupLabel.Props) => {
    return <Menu.GroupLabel {...props} className="text-white/40 text-xs px-2 py-1 font-bold" />;
};

export const MenuRadioGroup = (props: Menu.RadioGroup.Props) => {
    return <Menu.RadioGroup {...props} />;
};

export const MenuRadioItem = (props: Menu.RadioItem.Props) => {
    return <Menu.RadioItem {...props} />;
};

export const MenuCheckboxItem = (props: Menu.CheckboxItem.Props) => {
    return <Menu.CheckboxItem {...props} />;
};

export const MenuSubmenuRoot = (props: Menu.SubmenuRoot.Props) => {
    return <Menu.SubmenuRoot {...props} />;
};

export const MenuSubmenuTrigger = (props: Menu.SubmenuTrigger.Props) => {
    return <Menu.SubmenuTrigger {...props} />;
};
