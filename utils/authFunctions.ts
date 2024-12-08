import { AUTH0_AUDIENCE, AUTH0_CLIENT_ID, AUTH0_DOMAIN, REDIRECT_URI } from '@/constants/Auth';
import { IProfile } from '@/types/IProfile';
import * as Crypto from 'expo-crypto';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';

export const toBase64Url = (base64: string) => {
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

// Generate Code Verifier
export const generateCodeVerifier = () => {
    const randomBytes = Crypto.getRandomBytes(32);
    const base64String = btoa(String.fromCharCode(...randomBytes));
    return toBase64Url(base64String);
};

// Generate Code Challenge
export const generateCodeChallenge = async (codeVerifier: string) => {
    const digest = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        codeVerifier,
        { encoding: Crypto.CryptoEncoding.BASE64 }
    );
    return toBase64Url(digest);
};

export const getAuthorizationURL = async (connection: string) => {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    // Step 2: Construct the Authorization URL
    const authorizationUrl = `https://${AUTH0_DOMAIN}/authorize?` +
        `response_type=code&` +
        `client_id=${AUTH0_CLIENT_ID}&` +
        `redirect_uri=${REDIRECT_URI}&` +
        `scope=openid profile email offline_access follows.read update:current_user_identities&` +
        `audience=${AUTH0_AUDIENCE}&` +
        `connection=${connection}&` +
        `code_challenge=${codeChallenge}&` +
        `code_challenge_method=S256&`;
    return { authorizationUrl, codeVerifier };
}

export const getAuthToken = async (url: string, codeVerifier: string) => {
    const parsedUrl = Linking.parse(url);
    const authorizationCode = parsedUrl.queryParams?.code;

    if (authorizationCode) {
        // Step 5: Exchange Authorization Code for Tokens
        const tokenResponse = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                grant_type: 'authorization_code',
                client_id: AUTH0_CLIENT_ID,
                code: authorizationCode,
                redirect_uri: REDIRECT_URI, // Must match the one in the authorization URL
                code_verifier: codeVerifier,
                scope: "openid profile email offline_access follows.read",
            }),
        });

        const tokenResult = await tokenResponse.json();
        return tokenResult;
    }
}

export const getNewAccessTokenFromRefreshToken = async (refreshToken: string) => {
    const tokenResponse = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            grant_type: 'refresh_token',
            client_id: AUTH0_CLIENT_ID,
            refresh_token: refreshToken
        }),
    });

    const tokenResult = await tokenResponse.json();
    return tokenResult;
}

export const requestMagicLink = async (email: string) => {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const response = await fetch(`https://${AUTH0_DOMAIN}/passwordless/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            client_id: AUTH0_CLIENT_ID,
            connection: 'email',
            email,
            send: 'code',
            authParams: {
                code_challenge: codeChallenge,
                code_challenge_method: 'S256',
                scope: "openid profile email offline_access follows.read",
                response_type: 'code',
                redirect_uri: REDIRECT_URI,
            },
        }),
    });
    return { response: response.json(), codeVerifier };
};

export const verifyOTP = async (email: string, otpCode: string, codeVerifier: string) => {
    const response = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            grant_type: 'http://auth0.com/oauth/grant-type/passwordless/otp',
            client_id: AUTH0_CLIENT_ID,
            realm: 'email',
            username: email,
            otp: otpCode,
            scope: "openid profile email offline_access follows.read",
            code_verifier: codeVerifier,
            redirect_uri: REDIRECT_URI,
        }),
    });

    const tokens = await response.json();
    if (response.ok) {
        return tokens;
    } else {
        // Handle errors
        console.error('Error:', tokens);
        throw new Error(tokens.error_description || 'OTP verification failed');
    }
};

export const userNavigator = async (user: IProfile) => {
    if (user.userState === 2) {
        router.push("/referral-code");
    } else if (user.twitterConnectionFound === 0) {
        router.push("/link-twitter");
    } else if (user.iAmBotBlocked === 1) {
        // router.push("/blocked");
    } else if (user.userState === 2) {
        router.push("/referral-code");
    } else if (user.userState === 4) {
        // router.push("/disclaimer");
    } else {
        router.push("/(tabs)");
    }
}