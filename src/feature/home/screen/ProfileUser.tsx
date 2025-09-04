import {View, Text, Image, StyleSheet, TouchableOpacity} from "react-native";
import {useTheme} from "react-native-paper";
import {useAuth} from "../../auth/context/AuthContext";
import {useEffect, useState} from "react";
import {UserProfileDTO} from "../../auth/UserState";
import {getUserProfile} from "../../auth/context/Api";
import { useNavigation } from "@react-navigation/native";
import {routesPrivate} from "../../../routes/routes";






const ProfileUser = () => {
    const theme = useTheme();

    const { token } = useAuth();
    const [profile, setProfile] = useState<UserProfileDTO | null>(null);
    const navigation = useNavigation();



    useEffect(() => {
        const fetchProfile = async () => {
            if (!token) return;

            try {
                const data = await getUserProfile(token);
                console.log(data);
                setProfile(data);
            } catch (error) {
                console.error('Error al obtener perfil:', error);
            }
        };

        fetchProfile();
    }, [token]);

    if (!profile) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.colors.background,
                paddingHorizontal: 16,
            }}>
                <Text
                    variant="headlineMedium"
                    style={{
                        marginBottom: 24,
                        color: theme.colors.onBackground,
                        textAlign: 'center',
                    }}
                >Cargando perfil...</Text>
            </View>
        );
    }



    const styles = StyleSheet.create({


        label: {
            fontWeight: "bold",
            fontSize: 16,
            marginTop: 25,
            color: theme.colors.primary,
        },
        value: {
            fontSize: 16,
            marginBottom: 5,
            color: theme.colors.inverseSurface,
        },
        centered: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
    });



    return (
        <View style={{flex: 1,
            alignItems: "center",
            backgroundColor: theme.colors.background,}}>


            <View style={{
                marginTop: 40,
                marginBottom: 20,
                alignItems: "center",
                backgroundColor:theme.colors.surface,
                width: "100%",
                paddingVertical: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                borderTopStartRadius: 10,
                borderTopEndRadius: 10,
                }}>
                <Image
                    source={{
                        uri:
                            profile.avatarUrl ||
                            "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
                    }}
                    style={{
                        width: 120,
                        height: 120,
                        borderRadius: 60,
                        borderWidth: 3,
                        borderColor: theme.colors.background,
                    }}
                />
            </View>


            <View style={{
                width: "100%",
                paddingHorizontal: 20,}}>

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <View>
                        <Text style={styles.label}>Email:</Text>
                        <Text style={styles.value}>{profile.email}</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => {navigation.navigate(routesPrivate.editProfile.name,{profile})}}
                        style={{
                            backgroundColor: theme.colors.outline,
                            paddingVertical: 6,
                            paddingHorizontal: 12,
                            borderRadius: 6,
                        }}
                    >
                        <Text style={{ color: "white" }}>Editar</Text>
                    </TouchableOpacity>

                </View>

                <Text style={styles.label}>Nombre:</Text>
                <Text style={styles.value}>{profile.firstName || "Sin nombre"}</Text>

                <Text style={styles.label}>Apellido:</Text>
                <Text style={styles.value}>{profile.lastName || "Sin apellido"}</Text>

                <Text style={styles.label}>Teléfono:</Text>
                <Text style={styles.value}>{profile.phone || "No registrado"}</Text>

                <Text style={styles.label}>Bio:</Text>
                <Text style={styles.value}>{profile.bio || "Sin descripción"}</Text>
            </View>
        </View>
    );
};

export default ProfileUser;






