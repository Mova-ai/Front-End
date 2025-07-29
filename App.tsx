import {StyleSheet, useColorScheme, View} from 'react-native';
import { useTheme } from 'react-native-paper';
import AppNavigation from "./src/navigation/AppNavigation";
import {AuthProvider} from "./src/feature/auth/context/AuthContext";
import {ThemeProvider} from "./src/context/ThemeContext"
import ThemeToggleButton from "./src/theme/ThemeToggleButton";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SafeAreaView from "./src/utils/SafeAreaView"


export default function App() {
    // const scheme = useColorScheme();
    const theme = useTheme();

    return (
        <ThemeProvider>
            <AuthProvider>
                <View style={{flex: 1, backgroundColor: theme.colors.background}}>
                <SafeAreaProvider style={[styles.container]}>
                    <SafeAreaView>
                        <AppNavigation/>
                        <ThemeToggleButton/>
                    </SafeAreaView>
                </SafeAreaProvider>
                </View>
            </AuthProvider>
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});
