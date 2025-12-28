import type { PropsWithChildren } from 'react';
import {
    MenuArrow,
    MenuBackdrop,
    MenuGroup,
    MenuGroupLabel,
    MenuItem,
    MenuPopup,
    MenuPortal,
    MenuPositioner,
    MenuRoot,
    MenuSubmenuRoot,
    MenuSubmenuTrigger,
    MenuTrigger,
} from '../../../components/Menu';

export const ToolbarMenu = (props: PropsWithChildren) => {
    return (
        <MenuRoot>
            <MenuTrigger>{props.children}</MenuTrigger>
            <MenuPortal>
                <MenuBackdrop />
                <MenuPositioner>
                    <MenuPopup>
                        <MenuArrow />

                        <MenuGroup>
                            <MenuGroupLabel>Instruments</MenuGroupLabel>
                            <MenuItem>Synth</MenuItem>
                            <MenuItem>AM Synth</MenuItem>
                            <MenuItem>FM Synth</MenuItem>
                            <MenuItem>Duo Synth</MenuItem>
                            <MenuItem>Membrane Synth</MenuItem>
                            <MenuItem>Metal Synth</MenuItem>
                            <MenuItem>Mono Synth</MenuItem>
                            <MenuItem>Noise Synth</MenuItem>
                            <MenuItem>Pluck Synth</MenuItem>
                            <MenuItem>Poly Synth</MenuItem>
                        </MenuGroup>

                        <MenuSubmenuRoot>
                            <MenuSubmenuTrigger />
                        </MenuSubmenuRoot>
                    </MenuPopup>
                </MenuPositioner>
            </MenuPortal>
        </MenuRoot>
    );
};
