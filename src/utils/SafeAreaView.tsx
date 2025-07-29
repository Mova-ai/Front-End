import {useSafeAreaInsets} from "react-native-safe-area-context";
import {View} from "react-native";
import {ReactNode} from "react";
import {useTheme} from "react-native-paper";

const SafeAreaView = ({children}: { children: ReactNode }) => {
    const insets = useSafeAreaInsets();
    const theme = useTheme();

    return (
        <View style={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: 16,
            paddingRight: 16,
            flex: 1,
            backgroundColor: theme.colors.background
        }}>
            {children}
        </View>
    )
}

export default SafeAreaView;