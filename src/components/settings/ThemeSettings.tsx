import React from "react";
import ThemeContrast from './ThemeContrast';
import ThemeColorPresets from './ThemeColorPresets';

// ----------------------------------------------------------------------

type Props = {
    children: React.ReactNode;
};

const ThemeSettings = ({children}: Props) => (
    <ThemeColorPresets>
        <ThemeContrast>
            {children}
        </ThemeContrast>
    </ThemeColorPresets>
);
export default ThemeSettings
