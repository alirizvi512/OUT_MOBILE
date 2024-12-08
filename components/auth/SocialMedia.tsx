import { REDIRECT_URI } from "@/constants/Auth";
import * as WebBrowser from 'expo-web-browser';
import { getAuthToken, getAuthorizationURL, userNavigator } from "@/utils/authFunctions";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { saveSecureData } from "@/store";
import { getMyProfile } from "@/services/getMyProfile";

export default function SocialMedia() {
    const login = async (connection: string) => {
        try {
            const { authorizationUrl, codeVerifier } = await getAuthorizationURL(connection);
            const result = await WebBrowser.openAuthSessionAsync(authorizationUrl, REDIRECT_URI);
            if (result.type === 'success' && result.url) {
                const tokenResult = await getAuthToken(result.url, codeVerifier);
                await saveSecureData("access_token", tokenResult.access_token);
                await saveSecureData("refresh_token", tokenResult.refresh_token);
                const data = await getMyProfile();
                await userNavigator(data);
            } else {
                console.error("Authorization Failed or was Canceled:", result);
            }
        } catch (error) {
            console.error("Error in Login Flow:", error);
        }
    }
    return (
        <View style={styles.authButtonsContainer}>
            <TouchableOpacity style={styles.authButton} onPress={() => { login("apple") }}>
                <Image source={require('./../../assets/images/apple.png')} style={styles.socialMediaIcons} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.authButton} onPress={() => { login("google-oauth2") }}>
                <Image source={require('./../../assets/images/google.png')} style={styles.socialMediaIcons} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    authButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    authButton: {
        backgroundColor: '#4A4A4A',
        width: 140.5,
        height: 62,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    authButtonText: {
        fontSize: 28,
        color: '#fff',
    },
    socialMediaIcons: {
        width: 24,
        height: 24
    },
});