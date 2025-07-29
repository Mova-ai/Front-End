// src/components/ThemeToggleButton.tsx
import React from 'react';
import { IconButton } from 'react-native-paper';
import { useAppTheme } from '../context/ThemeContext';

const ThemeToggleButton = () => {
    const { toggleTheme, mode } = useAppTheme();

    return (
        <IconButton
            icon={mode === 'dark' ? 'weather-sunny' : 'moon-waning-crescent'}
            onPress={toggleTheme}
            size={24}
            style={{ position: 'absolute', top: 48, right: 0 }}
        />
    );
};

export default ThemeToggleButton;
