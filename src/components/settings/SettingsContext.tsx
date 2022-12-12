import React, {createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState,} from 'react';
//
import {defaultSettings} from './config';
import {defaultPreset, getPresets, presetsOption} from './presets';
import {SettingsContextProps, ThemeColorPresetsValue, ThemeContrastValue, ThemeModeValue,} from './types';

// ----------------------------------------------------------------------

const initialState: SettingsContextProps = {
    ...defaultSettings,
    // Mode
    onToggleMode: () => {
    },
    onChangeMode: () => {
    },
    // Contrast
    onToggleContrast: () => {
    },
    onChangeContrast: () => {
    },
    // Color
    onChangeColorPresets: () => {
    },
    presetsColor: defaultPreset,
    presetsOption: [],
    // Reset
    onResetSetting: () => {
    },
};

// ----------------------------------------------------------------------

export const SettingsContext = createContext(initialState);

export const useSettingsContext = () => {
    const context = useContext(SettingsContext);

    if (!context) throw new Error('useSettingsContext must be use inside SettingsProvider');

    return context;
};

// ----------------------------------------------------------------------

type SettingsProviderProps = {
    children: ReactNode;
};

export const SettingsProvider = ({children}: SettingsProviderProps) => {
    const [themeMode, setThemeMode] = useState(defaultSettings.themeMode);
    const [themeContrast, setThemeContrast] = useState(defaultSettings.themeContrast);
    const [themeColorPresets, setThemeColorPresets] = useState(defaultSettings.themeColorPresets);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const mode = getCookie('themeMode') || defaultSettings.themeMode;
            const contrast = getCookie('themeContrast') || defaultSettings.themeContrast;
            const colorPresets = getCookie('themeColorPresets') || defaultSettings.themeColorPresets;

            setThemeMode(mode as ThemeModeValue);
            setThemeContrast(contrast as ThemeContrastValue);
            setThemeColorPresets(colorPresets as ThemeColorPresetsValue);
        }
    }, []);

    // Mode

    const onToggleMode = useCallback(() => {
        const value = themeMode === 'light' ? 'dark' : 'light';
        setThemeMode(value);
        setCookie('themeMode', value);
    }, [themeMode]);

    const onChangeMode = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value as ThemeModeValue;
        setThemeMode(value);
        setCookie('themeMode', value);
    }, []);

    const onToggleContrast = useCallback(() => {
        const value = themeContrast === 'default' ? 'bold' : 'default';
        setThemeContrast(value);
        setCookie('themeContrast', value);
    }, [themeContrast]);

    const onChangeContrast = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value as ThemeContrastValue;
        setThemeContrast(value);
        setCookie('themeContrast', value);
    }, []);

    // Color
    const onChangeColorPresets = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value as ThemeColorPresetsValue;
        setThemeColorPresets(value);
        setCookie('themeColorPresets', value);
    }, []);

    // Reset
    const onResetSetting = useCallback(() => {
        setThemeMode(defaultSettings.themeMode);
        setThemeContrast(defaultSettings.themeContrast);
        setThemeColorPresets(defaultSettings.themeColorPresets);
        removeCookie('themeMode');
        removeCookie('themeContrast');
        removeCookie('themeColorPresets');
    }, []);

    const value = useMemo(
        () => ({
            // Mode
            themeMode,
            onToggleMode,
            onChangeMode,
            // Contrast
            themeContrast,
            onChangeContrast,
            onToggleContrast,
            // Color
            themeColorPresets,
            onChangeColorPresets,
            presetsOption,
            presetsColor: getPresets(themeColorPresets),
            // Reset
            onResetSetting,
        }),
        [
            onChangeColorPresets,
            onChangeContrast,
            onChangeMode,
            onResetSetting,
            onToggleContrast,
            onToggleMode,
            themeColorPresets,
            themeContrast,
            themeMode,
        ]
    );

    return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

// ----------------------------------------------------------------------

function getCookie(name: string) {
    if (typeof document === 'undefined') {
        throw new Error(
            'getCookie() is not supported on the server. Fallback to a different value when rendering on the server.'
        );
    }

    const value = `; ${document.cookie}`;

    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
        return parts[1].split(';').shift();
    }

    return undefined;
}

function setCookie(name: string, value: string, exdays = 3) {
    const date = new Date();
    date.setTime(date.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + date.toUTCString();
    document.cookie = name + '=' + value + ';' + expires + ';path=/';
}

function removeCookie(name: string) {
    document.cookie = `${name}=;path=/;max-age=0`;
}
