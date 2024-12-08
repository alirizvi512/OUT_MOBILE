import { router } from 'expo-router';
import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    StatusBar,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { getAuthToken, getAuthorizationURL, userNavigator } from "@/utils/authFunctions";
import { REDIRECT_URI } from '@/constants/Auth';
import { saveSecureData } from '@/store';
import { getMyProfile } from '@/services/getMyProfile';

export default function LinkXScreen() {
    const login = async () => {
        try {
            const { authorizationUrl, codeVerifier } = await getAuthorizationURL('twitter');
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
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#171717" />

            {/* Top Navigation */}
            <View style={styles.navContainer}>
                <TouchableOpacity>
                    <Text style={styles.navText}>Support</Text>
                </TouchableOpacity>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('./../assets/logo.png')} // Replace with your local image path
                        resizeMode="contain"
                        style={styles.logoImage}
                    />
                </View>
                <TouchableOpacity>
                    <Text style={styles.navText} onPress={() => { router.push("/") }}>Sign In</Text>
                </TouchableOpacity>
            </View>

            {/* Sign-In Container */}
            <View style={styles.signInContainer}>
                <Text style={styles.title}>Link <Image style={styles.XImage} source={require('./../assets/images/X.png')} /></Text>
                <Text style={styles.topText}>Link your X account to get started</Text>

                <TouchableOpacity style={styles.continueButton} onPress={login}>
                    <Text style={styles.continueButtonText}>Connect <Image style={styles.XBlackImage} source={require('./../assets/images/XBlack.png')} /></Text>
                </TouchableOpacity>

                {/* Terms and Privacy */}
                <Text style={styles.terms}>
                    By signing in you agree to our{' '}
                    <Text style={styles.link}>Terms</Text> and{' '}
                    <Text style={styles.link}>Privacy Policy</Text>.
                </Text>
            </View>
            <View></View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    topText: {
        color: '#7B7B7B',
        fontSize: 14,
        fontWeight: 400,
        marginBottom: 20,
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#171717',
        justifyContent: 'space-between'
    },
    XImage: {
        width: 20,
        height: 20
    },
    XBlackImage: {
        width: 14,
        height: 14
    },
    logoImage: {
        width: 33,
        height: 33
    },
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 10,
    },
    navText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '700',
        fontFamily: 'Public Sans'
    },
    logoContainer: {
        alignItems: 'center',
    },
    logo: {
        fontSize: 24,
        color: '#fff',
    },
    signInContainer: {
        padding: 24,
        justifyContent: 'center',
        verticalAlign: 'middle',
        borderWidth: 2,
        borderColor: "#373737",
        borderRadius: 16,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    title: {
        fontSize: 21,
        color: '#fff',
        fontWeight: '700',
        marginBottom: 20,
        textAlign: 'left',
        fontFamily: 'inter',
    },
    continueButton: {
        backgroundColor: '#fff',
        borderRadius: 100,
        paddingVertical: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    continueButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 22
    },
    terms: {
        color: '#7B7B7B',
        fontSize: 12,
        textAlign: 'center',
        fontWeight: 700,
    },
    link: {
        textDecorationLine: 'underline',
    },
});
