import React from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

type WalletHeaderProps = {
    from: string;
}

export default function WalletHeader({ from }: WalletHeaderProps) {
    return (
        <View style={styles.container}>
            {
                from !== "index"
                    ?
                    <TouchableOpacity
                        onPress={() => {
                            router.back();
                        }}
                    >
                        <Image
                            source={require('./../../assets/images/return.png')}
                            resizeMode="contain"
                            style={{ height: 24, width: 24 }}
                        />
                    </TouchableOpacity>
                    :
                    <></>
            }
            <TouchableOpacity style={styles.searchContainer} onPress={() => { router.push("/wallet/search") }}>
                <Ionicons name="search" size={20} color="#888" />
                <TextInput
                    placeholder="Search"
                    placeholderTextColor="#888"
                    style={styles.searchInput}
                />
            </TouchableOpacity>
            {
                from === "index"
                    ?
                    <TouchableOpacity style={styles.addWalletBtn}>
                        <Text style={styles.addWalletBtnText}>+</Text>
                    </TouchableOpacity>
                    :
                    <></>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 2,
        borderColor: '#1e1e1e',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#171717', // Background color of the top bar
        paddingHorizontal: 15,
        paddingVertical: 10,
        justifyContent: 'space-between',
        gap: 16
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#1e1e1e', // Dark background for the search bar
        borderRadius: 20, // Rounded edges for the search bar
        paddingHorizontal: 15,
        height: 40,
        marginRight: 15, // Space between the search bar and icons
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        color: '#fff', // Text color for the search input
        fontSize: 16,
    },
    rightIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    notificationIcon: {
        position: 'relative',
        marginRight: 15, // Space between the notification icon and profile
    },
    notificationBadge: {
        position: 'absolute',
        top: 2,
        right: 2,
        width: 8,
        height: 8,
        backgroundColor: 'red', // Red badge color
        borderRadius: 4,
    },
    profileImage: {
        width: 32,
        height: 32,
        borderRadius: 16, // Circular profile image
    },
    addWalletBtn: {
        width: 40,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addWalletBtnText: {
        fontSize: 36,
        lineHeight: 40,
    },
});
