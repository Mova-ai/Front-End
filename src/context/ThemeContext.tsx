import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import merge from 'deepmerge';
import { lightTheme, darkTheme } from '../theme/Theme'; // Tu theme base

const CombinedDarkTheme = merge(MD3DarkTheme, darkTheme);
const CombinedLightTheme = merge(MD3LightTheme, lightTheme);

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
    mode: ThemeMode;
    toggleTheme: () => void;
    theme: typeof CombinedDarkTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = useState<ThemeMode>('light');

    const toggleTheme = () => setMode(prev => (prev === 'light' ? 'dark' : 'light'));

    const theme = mode === 'dark' ? CombinedDarkTheme : CombinedLightTheme;

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme, theme }}>
            <PaperProvider theme={theme}>
                {children}
            </PaperProvider>
        </ThemeContext.Provider>
    );
};

export const useAppTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useAppTheme debe usarse dentro de ThemeProvider');
    return context;
};
