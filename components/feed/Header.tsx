import React from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function Header() {
    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <TouchableOpacity style={styles.searchContainer} onPress={() => { router.push("/search") }}>
                <Ionicons name="search" size={20} color="#888" />
                <TextInput
                    placeholder="Explore"
                    placeholderTextColor="#888"
                    style={styles.searchInput}
                />
            </TouchableOpacity>

            {/* Notification and Profile */}
            <View style={styles.rightIcons}>
                {/* Notification Icon */}
                <TouchableOpacity style={styles.notificationIcon}>
                    <Ionicons name="notifications-outline" size={24} color="#fff" />
                    <View style={styles.notificationBadge} />
                </TouchableOpacity>
                {/* Profile Image */}
                <TouchableOpacity onPress={() => router.push("/profile/profile")}>
                    <Image
                        source={{ uri: 'https://www.artnews.com/wp-content/uploads/2021/12/unnamed-1.png' }} // Replace with actual image URL
                        style={styles.profileImage}
                    />
                </TouchableOpacity>
            </View>
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
});
