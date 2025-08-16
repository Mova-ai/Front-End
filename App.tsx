import {StyleSheet, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import AppNavigation from "./src/navigation/AppNavigation";
import {AuthProvider} from "./src/feature/auth/context/AuthContext";
import {ThemeProvider} from "./src/context/ThemeContext"
import ThemeToggleButton from "./src/theme/ThemeToggleButton";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SafeAreaView from "./src/utils/SafeAreaView"
import {NavigationContainer} from "@react-navigation/native";


export default function App() {
    const theme = useTheme();

    return (
        <AuthProvider>
            <ThemeProvider>
                <NavigationContainer>
                <View style={{flex: 1, backgroundColor: theme.colors.background}}>
                    <SafeAreaProvider style={[styles.container]}>
                        <SafeAreaView>
                            <AppNavigation/>
                            <ThemeToggleButton/>
                        </SafeAreaView>
                    </SafeAreaProvider>
                </View>
                    </NavigationContainer>

            </ThemeProvider>
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});
