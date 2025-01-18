import { deleteSecureData, getSecureData, saveSecureData } from "@/store";
import { getNewAccessTokenFromRefreshToken } from "@/utils/authFunctions";
import { Stack, router } from "expo-router";
import { Provider } from 'react-redux';
import { useCallback, useEffect, useState } from "react";
import store from '@/redux/store';
import { PrivyProvider } from '@privy-io/expo';
import { PRIVY_APP_ID, PRIVY_CLIENT_ID } from "@/constants/Privy";

export default function RootLayout() {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  async function getAsyncToken() {
    const token = await getSecureData("access_token") || "";
    return token;
  }
  const getCustomToken = useCallback(
    () => getAsyncToken(),
    [],
  );
  useEffect(() => {
    getAccessTokenAndRefreshToken();
  }, [])
  const getAccessTokenAndRefreshToken = async () => {
    try {
      const accessToken = await getSecureData("access_token");
      if (accessToken) {
        const refreshToken = await getSecureData("refresh_token");
        if (refreshToken) {
          const response = await getNewAccessTokenFromRefreshToken(refreshToken);
          if (response) {
            await saveSecureData("access_token", response.access_token);
            await saveSecureData("refresh_token", response.refresh_token);
            router.push("/(tabs)");
          }
        }
      }
    } catch (e) {
      await deleteSecureData("access_token");
      await deleteSecureData("refresh_token");
      router.push("/");
    }
  }
  return (
    <Provider store={store}>
      <PrivyProvider
        // Render the PrivyProvider with your app ID and app client ID
        appId={PRIVY_APP_ID}
        clientId={PRIVY_CLIENT_ID}
        config={{
          embedded: {
            solana: {
              createOnLogin: 'user-without-wallets', // defaults to 'off'
            },
          },
          customAuth: {
            enabled: true,
            isLoading: loading,
            getCustomAccessToken: getCustomToken,
          },
        }}

      >
        <Stack>
          {/* Define the Tabs Layout */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
          <Stack.Screen name="activation-code" options={{ headerShown: false }} />
          <Stack.Screen name="link-twitter" options={{ headerShown: false }} />
          <Stack.Screen name="referral-code" options={{ headerShown: false }} />
          <Stack.Screen name="profile/profile" options={{ headerShown: false }} />
          <Stack.Screen name="profile/followers-followings" options={{ headerShown: false }} />
          <Stack.Screen name="profile/points" options={{ headerShown: false }} />
          <Stack.Screen name="wallet/deposit" options={{ headerShown: false }} />
          <Stack.Screen name="wallet/withdraw" options={{ headerShown: false }} />
          <Stack.Screen name="search" options={{ headerShown: false }} />
        </Stack>
      </PrivyProvider>
    </Provider>
  );
}
