import {
    MD3LightTheme as DefaultLightTheme,
    MD3DarkTheme as DefaultDarkTheme,
    configureFonts,
} from 'react-native-paper';

const customFontConfig = {
    displayLarge: {
        fontFamily: 'Helvetica',
        fontWeight: '400',
        fontSize: 57,
        lineHeight: 64,
        letterSpacing: -0.25,
    },
    headlineMedium: {
        fontFamily: 'Helvetica-Bold',
        fontWeight: '500',
        fontSize: 28,
        lineHeight: 36,
        letterSpacing: 0,
    },
    bodyMedium: {
        fontFamily: 'Helvetica',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.15,
    },
    labelSmall: {
        fontFamily: 'Helvetica-Light',
        fontWeight: '300',
        fontSize: 11,
        lineHeight: 16,
        letterSpacing: 0.5,
    },
};

const fonts = configureFonts({ default: customFontConfig });

export const lightTheme = {
    ...DefaultLightTheme,
    dark: false,
    fonts,
    colors: {
        ...DefaultLightTheme.colors,
        primary: '#FF3B30',
        secondary: '#FFA600',
        background: '#FFFFFF',
        surface: '#F7F7F7',
        surfaceVariant: '#EFEFEF',
        onSurface: '#1C1C1E',
        onPrimary: '#FFFFFF',
        onSecondary: '#000000',
        outline: '#D1D1D6',
        error: '#B00020',
        inverseOnSurface: '#FFFFFF',
        inverseSurface: '#1C1C1E',
        success: '#4CAF50',
        onSuccess: '#FFFFFF',
        elevation: {
            level0: 'transparent',
            level1: '#F2F2F2',
            level2: '#E6E6E6',
            level3: '#D9D9D9',
            level4: '#CCCCCC',
            level5: '#BFBFBF',
        },
    },
};

export const darkTheme = {
    ...DefaultDarkTheme,
    dark: true,
    fonts,
    colors: {
        ...DefaultDarkTheme.colors,
        primary: '#FF453A',
        secondary: '#FFD166',
        background: '#121212',
        surface: '#1C1C1E',
        surfaceVariant: '#2C2C2E',
        onSurface: '#FFFFFF',
        onPrimary: '#FFFFFF',
        onSecondary: '#000000',
        outline: '#3A3A3C',
        error: '#CF6679',
        inverseOnSurface: '#000000',
        inverseSurface: '#E6E6E6',
        success: '#81C784',
        onSuccess: '#000000',
        elevation: {
            level0: 'transparent',
            level1: '#1F1F1F',
            level2: '#2C2C2C',
            level3: '#383838',
            level4: '#444444',
            level5: '#555555',
        },
    },
};
