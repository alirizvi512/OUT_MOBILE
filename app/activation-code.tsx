import { getMyProfile } from '@/services/getMyProfile';
import { getSecureData, saveSecureData } from '@/store';
import { authenticate, getAuthTokenFromCodeVerification, userNavigator, verifyOTP } from '@/utils/authFunctions';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    StatusBar,
} from 'react-native';

export default function ActivationCodeScreen() {
    const [code, setCode] = useState('');

    const proceed = async () => {
        try {
            // const codeVerifier = await getSecureData("codeVerifier") || "";
            const email = await getSecureData("email") || "";
            const tokenResult = await verifyOTP(email, code);
            console.log(tokenResult);
            await saveSecureData("access_token", tokenResult.access_token);
            await saveSecureData("refresh_token", tokenResult.refresh_token);
            const data = await getMyProfile();
            console.log("Data", data);
            // await userNavigator(data);
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
                <Text style={styles.title}>Activation Code</Text>

                {/* Email Input */}
                <Text style={styles.label}>Code</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your code"
                    placeholderTextColor="#555"
                    value={code}
                    onChangeText={(text) => setCode(text)}
                />
                <View style={styles.codeSentTextContainer}>
                    <Text style={styles.codeSentText}>We sent a code to your email</Text>
                    <Text style={styles.codeSentText}>00:59</Text>
                </View>

                {/* Continue Button */}
                <TouchableOpacity style={[styles.continueButton, { backgroundColor: code ? '#fff' : '#444' }]} disabled={!code} onPress={() => { proceed(); }}>
                    <Text style={[
                        styles.continueButtonText,
                        { color: code ? '#000' : '#888' }
                    ]}>Continue</Text>
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
    safeArea: {
        flex: 1,
        backgroundColor: '#171717',
        justifyContent: 'space-between'
    },
    logoImage: {
        width: 33,
        height: 33
    },
    codeSentTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    codeSentText: {
        color: '#7B7B7B',
        fontSize: 14,
        fontWeight: 400,
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
    label: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 8,
    },
    input: {
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#fff',
        marginBottom: 2,
        borderWidth: 1,
        borderColor: '#333',
    },
    continueButton: {
        backgroundColor: '#444',
        borderRadius: 100,
        paddingVertical: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    continueButtonText: {
        color: '#888',
        fontSize: 16,
        fontWeight: '600',
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#444',
    },
    orText: {
        color: '#fff',
        marginHorizontal: 10,
        fontSize: 14,
        fontWeight: 500,
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
