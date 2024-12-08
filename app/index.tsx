import SocialMedia from '@/components/auth/SocialMedia';
import { saveSecureData } from '@/store';
import { requestMagicLink } from '@/utils/authFunctions';
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

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const login = async () => {
        try {
            const { codeVerifier } = await requestMagicLink(email);
            await saveSecureData("codeVerifier", codeVerifier);
            await saveSecureData("email", email);
            router.push("/activation-code");
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
                <TouchableOpacity onPress={() => { router.push("/register") }}>
                    <Text style={styles.navText}>Sign up</Text>
                </TouchableOpacity>
            </View>

            {/* Sign-In Container */}
            <View style={styles.signInContainer}>
                <Text style={styles.title}>Sign in</Text>

                {/* Email Input */}
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Your email address"
                    placeholderTextColor="#555"
                    value={email}
                    autoCapitalize='none'
                    onChangeText={(text) => setEmail(text)}
                />

                {/* Continue Button */}
                <TouchableOpacity style={[styles.continueButton, { backgroundColor: isValidEmail(email) ? '#fff' : '#444' }]} disabled={!email} onPress={login}>
                    <Text style={[
                        styles.continueButtonText,
                        { color: isValidEmail(email) ? '#000' : '#888' }
                    ]}>Continue</Text>
                </TouchableOpacity>

                {/* OR Separator */}
                <View style={styles.orContainer}>
                    <View style={styles.line} />
                    <Text style={styles.orText}>OR</Text>
                    <View style={styles.line} />
                </View>

                {/* Apple and Google Buttons */}
                <SocialMedia />

                {/* Terms and Privacy */}
                <Text style={styles.terms}>
                    By signing in you agree to our{' '}
                    <Text style={styles.link}>Terms</Text> and{' '}
                    <Text style={styles.link}>Privacy Policy</Text>.
                </Text>
            </View>

            {/* Bottom Image */}
            <View style={styles.bottomImageContainer}>
                <Image
                    source={require('./../assets/bottom-illustration.png')} // Replace with your local image path
                    style={styles.bottomImage}
                    resizeMode="contain"
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#171717',
        justifyContent: 'center',
        verticalAlign: 'middle',
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
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        verticalAlign: 'middle',
        borderWidth: 2,
        borderColor: "#373737",
        borderRadius: 16,
        marginVertical: 100,
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
        backgroundColor: '#1A1A1A',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#fff',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#333',
    },
    continueButton: {
        borderRadius: 100,
        paddingVertical: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    continueButtonText: {
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
    bottomImageContainer: {
        alignItems: 'center',
    },
    bottomImage: {
        width: '100%',
        height: 77,
    },
})