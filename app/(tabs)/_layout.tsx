import React from "react";
import { Tabs } from "expo-router";
import { Platform, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import FeedIcon from '@/assets/icons/feed.svg';
import WalletIcon from '../../assets/icons/wallet.svg';
import CultsIcon from '../../assets/icons/cults.svg';
import MarketplaceIcon from '../../assets/icons/marketplace.svg';
import FeedFilledIcon from '../../assets/icons/feed-filled.svg';
import WalletFilledIcon from '../../assets/icons/wallet-filled.svg';
import CultsFilledIcon from '../../assets/icons/cults-filled.svg';
import MarketplaceFilledIcon from '../../assets/icons/marketplace-filled.svg';
import DropTakeIcon from '../../assets/icons/drop-take.svg';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: "#888",
        headerShown: false,
        tabBarStyle: {
          position: "relative",
          height: 106,
          backgroundColor: "#171717",
          paddingTop: 20,
          paddingBottom: Platform.OS === "ios" ? 10 : 0,
          borderTopWidth: 2,
          borderColor: '#1e1e1e',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Feed",
          tabBarLabelStyle: {
            fontWeight: "700"
          },
          tabBarIcon: ({ color, focused }) => (
            focused
              ?
              <FeedFilledIcon size={28} name="flash-outline" fill={color} />
              :
              <FeedIcon size={28} name="flash-outline" fill={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Cults",
          tabBarLabelStyle: {
            fontWeight: "700"
          },
          tabBarIcon: ({ color, focused }) => (
            focused
              ?
              <CultsFilledIcon size={28} name="flash-outline" fill={color} />
              :
              <CultsIcon size={28} name="flash-outline" fill={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="drop-take"
        options={{
          title: "Drop Take",
          tabBarLabelStyle: {
            color: "#fff",
            fontWeight: "700"
          },
          tabBarIcon: ({ color }) => (
            <View style={{ position: "absolute", bottom: 10 }}>
              <DropTakeIcon height={36} name="flash-outline" fill="#000" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="marketplace"
        options={{
          title: "Marketplace",
          tabBarLabelStyle: {
            fontWeight: "700"
          },
          tabBarIcon: ({ color, focused }) => (
            focused
              ?
              <MarketplaceFilledIcon size={28} name="flash-outline" fill={color} />
              :
              <MarketplaceIcon size={28} name="flash-outline" fill={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarLabelStyle: {
            fontWeight: "700"
          },
          tabBarIcon: ({ color, focused }) => (
            focused
              ?
              <WalletFilledIcon size={28} name="flash-outline" fill={color} />
              :
              <WalletIcon size={28} name="flash-outline" fill={color} />
          ),
        }}
      />
    </Tabs>
  );
}
