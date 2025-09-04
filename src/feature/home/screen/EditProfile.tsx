
import {TextInput, useTheme} from "react-native-paper";
import { Image, ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import {Controller, useForm} from "react-hook-form";
import {updateUserProfile} from "../../auth/context/Api";
import {useAuth} from "../../auth/context/AuthContext";


const EditProfile = ({ navigation, route }) => {

    const { profile } = route.params;
    const theme = useTheme();
    const { token } = useAuth();

    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: profile.email || "",
            firstName: profile.firstName || "",
            lastName: profile.lastName || "",
            phone: profile.phone || "",
            bio: profile.bio || "",
            avatarUrl: profile.avatarUrl || "",
        },
    });

    const onSubmit = async (data: UserProfileDTO) => {
        try {
            const updatedProfile = await updateUserProfile(token!, data);
            console.log("Perfil actualizado:", updatedProfile);
            navigation.goBack();
        } catch (error) {
            console.error("Error al actualizar perfil:", error);
        }
    };



    const styles = StyleSheet.create({
        header: {
            alignItems: "center",
            marginTop: 30,
            marginBottom: 20,
        },
        avatar: {
            width: 120,
            height: 120,
            borderRadius: 60,
            borderWidth: 3,
            borderColor: "white",
        },
        title: {
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 10,
            color: theme.colors.primary,
        },
        container: {
            paddingHorizontal: 20,
        },
        label: {
            fontWeight: "bold",
            fontSize: 16,
            marginTop: 20,
            marginBottom: 5,
            color: theme.colors.primary,
        },
        input: {
            borderWidth: 1,
            borderColor: theme.colors.outline,
            borderRadius: 8,
            padding: 10,
            fontSize: 16,
            color: theme.colors.inverseSurface,
            backgroundColor: theme.colors.surface,
        },
        button: {
            marginTop: 30,
            marginBottom: 70,
            backgroundColor: theme.colors.primary,
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: "center",
        },
        buttonText: {
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
        },
    });

    return (
        <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <View style={styles.header}>
                <Image
                    source={{
                        uri:
                            profile.avatarUrl ||
                            "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
                    }}
                    style={styles.avatar}
                />
                <Text style={styles.title}>Editar Perfil</Text>
            </View>

            <View style={styles.container}>


                {/* Email */}
                <Text style={styles.label}>Email</Text>
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            value={value}
                            onChangeText={onChange}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    )}
                />

                {/* Nombre */}
                <Text style={styles.label}>Nombre</Text>
                <Controller
                    control={control}
                    name="firstName"
                    render={({ field: { onChange, value } }) => (
                        <TextInput style={styles.input} value={value} onChangeText={onChange} />
                    )}
                />


                {/* Apellido */}
                <Text style={styles.label}>Apellido</Text>
                <Controller
                    control={control}
                    name="lastName"
                    render={({ field: { onChange, value } }) => (
                        <TextInput style={styles.input} value={value} onChangeText={onChange} />
                    )}
                />


                {/* Teléfono */}
                <Text style={styles.label}>Teléfono</Text>
                <Controller
                    control={control}
                    name="phone"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            value={value}
                            onChangeText={onChange}
                            keyboardType="phone-pad"
                        />
                    )}
                />


                {/* Bio */}
                <Text style={styles.label}>Bio</Text>
                <Controller
                    control={control}
                    name="bio"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[styles.input, { height: 80, textAlignVertical: "top" }]}
                            value={value}
                            onChangeText={onChange}
                            multiline
                        />
                    )}
                />


                {/* Botón Guardar */}
                <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.buttonText}>Guardar Cambios</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};


export default EditProfile;