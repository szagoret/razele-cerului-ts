import React, {useMemo} from "react";
import {createTheme, ThemeOptions, ThemeProvider as MUIThemeProvider} from '@mui/material/styles';
import palette from "src/theme/palette";
import shadows from "src/theme/shadows";
import {CssBaseline} from "@mui/material";
import customShadows from "src/theme/customShadows";
import GlobalStyles from "src/theme/globalStyles";
import typography from "src/theme/typography";
import componentsOverride from './overrides';
import {useSettingsContext} from "src/components/settings";


type Props = {
    children: React.ReactNode;
};

const ThemeProvider = ({children}: Props) => {
    const {themeMode} = useSettingsContext();
    const themeOptions: ThemeOptions = useMemo(
        () => ({
            palette: palette(themeMode),
            typography,
            shape: {borderRadius: 8},
            direction: 'ltr',
            shadows: shadows(themeMode),
            customShadows: customShadows(themeMode),
        }),
        [themeMode]
    );

    const theme = createTheme(themeOptions);

    theme.components = componentsOverride(theme);

    return (
        <MUIThemeProvider theme={theme}>
            <CssBaseline/>
            <GlobalStyles/>
            {children}
        </MUIThemeProvider>
    );
};
export default ThemeProvider