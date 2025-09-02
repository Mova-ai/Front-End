import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTheme } from 'react-native-paper';
import ThemeToggleButton from "../../../theme/ThemeToggleButton";
import {routesPrivate} from "../../../routes/routes";


type RootStackParamList = {
    Home: undefined;
    Profile: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeTopBar() {
    const navigation = useNavigation<NavigationProp>();
    const theme = useTheme();
    const profile: String = routesPrivate.profile.name;
    return (
        <View style={[styles.container, { backgroundColor: theme.colors.onSurface}]}>

            <TouchableOpacity onPress={() => navigation.navigate(profile)} style={styles.left}>
                <Icon name="person" size={24} color={theme.colors.surface} />
            </TouchableOpacity>


            <Text style={[styles.title, { color: theme.colors.surface }]}>Inicio</Text>

            <View style={styles.right}>
                <ThemeToggleButton />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 56,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
    },
    left: {
        flex: 1,
        alignItems: "flex-start",
    },
    title: {
        flex: 1,
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
    },
    right: {
        flex: 1,
        alignItems: "flex-end",
    },
});

