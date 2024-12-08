import { deleteSecureData, getSecureData, saveSecureData } from "@/store";
import { getNewAccessTokenFromRefreshToken } from "@/utils/authFunctions";
import { Stack, router } from "expo-router";
import { Provider } from 'react-redux';
import { useEffect } from "react";
import store from '@/redux/store';

export default function RootLayout() {
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
        <Stack.Screen name="search" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
