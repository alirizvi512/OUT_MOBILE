// import GradientText from "@/components/common/GradientText";
// import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Keyboard,
    Image,
    Alert,
    StatusBar,
} from "react-native";
import * as ExpoImagePicker from "expo-image-picker";
import { router } from "expo-router";

export default function DropTakeScreen() {
    const [text, setText] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const selectAndCropImage = async (): Promise<void> => {
        try {
            const permissionResult = await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
                Alert.alert("Permission Denied", "Permission to access media library is required!");
                return;
            }
            const pickerResult = await ExpoImagePicker.launchImageLibraryAsync({
                allowsEditing: false,
                quality: 1, // Full quality
            });

            if (!pickerResult.canceled) {
                setImage(pickerResult.assets[0].uri);
            }
        } catch (error) {
            console.error("Error picking image:", error);
        }
    };

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#171717" />
            <SafeAreaView style={styles.container}>
                {/* Keyboard-Aware Container */}
                <KeyboardAvoidingView
                    style={styles.keyboardAvoidingContainer}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                >
                    {/* Close Icon */}
                    <View style={styles.closeButtonContainer}>
                        <TouchableOpacity>
                            <Text style={styles.closeButton} onPress={() => { router.back() }}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Avatar and Writing Area (Horizontal Layout) */}
                    {image && (
                        <Image source={{ uri: image }} style={styles.imagePreview} />
                    )}

                    <View style={styles.headerContainer}>
                        <Image
                            source={{
                                uri: "https://i.imgur.com/wxqlQkh.png", // Replace with the actual avatar
                            }}
                            style={styles.avatar}
                        />
                        <View style={styles.textInputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="DROP A TAKE"
                                placeholderTextColor="#7B7B7B"
                                maxLength={250}
                                multiline
                                value={text}
                                onChangeText={(value) => setText(value)}
                                onSubmitEditing={Keyboard.dismiss}
                            />
                            <Text style={styles.charCount}>{`${text.length}/250`}</Text>
                        </View>
                    </View>

                    {/* Add Media Button */}

                    {/* <LinearGradient
                    colors={['#22C1C3', '#6EF195']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.addMediaButton]}>
                    <TouchableOpacity style={[styles.innerContainer, styles.innerContainerSupport]}>
                        <GradientText colors={['#22C1C3', '#6EF195']}>
                            <Text style={[styles.addMediaText, styles.voteText]}>Add Media</Text>
                        </GradientText>
                    </TouchableOpacity>
                </LinearGradient> */}

                    {/* <LinearGradient
                    colors={['#FFB628', '#EA6A23']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.linearGradientSupport}
                >
                    <View style={[styles.innerContainer, styles.innerContainerSupport]}>
                        <GradientText colors={['#FFB628', '#EA6A23']}>
                            <Text style={styles.voteText}>Add Media</Text>
                        </GradientText>
                    </View>
                </LinearGradient> */}

                    <TouchableOpacity style={styles.addMediaButton} onPress={selectAndCropImage}>
                        <Text style={styles.addMediaText}>Add Media</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>

                {/* Drop Take Button */}
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    style={styles.dropTakeContainer}
                >
                    <TouchableOpacity style={styles.dropTakeButton} disabled>
                        <Text style={styles.dropTakeText}>DROP TAKE</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    // linearGradientSupport: {
    //     borderTopLeftRadius: 25, // Half of the height for a full curve
    //     borderBottomLeftRadius: 25, // Same as above for the bottom
    //     borderTopRightRadius: 25,
    //     borderBottomRightRadius: 25,
    //     height: 48,
    //     width: 110,
    // },
    // voteText: {
    //     fontSize: 16,
    //     fontWeight: "900",
    //     color: '#fff',
    //     fontFamily: ""
    // },
    // innerContainer: {
    //     width: 108,
    //     flex: 1,
    //     margin: 1, // <-- Border Width
    //     backgroundColor: '#171717',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     // height: 46,
    // },
    // innerContainerSupport: {
    //     borderTopLeftRadius: 25, // Half of the height for a full curve
    //     borderBottomLeftRadius: 25, // Same as above for the bottom
    //     borderTopRightRadius: 25,
    //     borderBottomRightRadius: 25,
    // },
    imagePreview: {
        marginTop: 20,
        width: "100%",
        height: 100,
        borderRadius: 10,
    },
    container: {
        flex: 1,
        backgroundColor: "#171717",
    },
    keyboardAvoidingContainer: {
        flex: 1,
        padding: 16,
    },
    closeButtonContainer: {
        alignSelf: "flex-start",
    },
    closeButton: {
        color: "#fff",
        fontSize: 24,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    textInputContainer: {
        flex: 1,
        backgroundColor: "#171717",
        borderRadius: 10,
        flexDirection: "column",
        justifyContent: "space-between",
    },
    input: {
        color: "#fff",
        fontSize: 14,
        lineHeight: 20,
        textAlignVertical: "top",
        minHeight: 50,
        backgroundColor: "#171717",
        fontWeight: 700,
    },
    charCount: {
        color: "#888",
        fontSize: 12,
        textAlign: "right",
    },
    addMediaButton: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#ff8c00",
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: "center",
        marginTop: 20,
        width: 108, // Fixed width
        alignSelf: "center", // Centers the button horizontally
    },
    addMediaText: {
        color: "#ff8c00",
        fontSize: 16,
        fontWeight: "bold",
    },
    dropTakeContainer: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    dropTakeButton: {
        backgroundColor: "#444",
        borderRadius: 20,
        paddingVertical: 14,
        alignItems: "center",
        marginHorizontal: 16,
        marginBottom: 20,
        width: 115,
        height: 46
    },
    dropTakeText: {
        color: "#888",
        fontSize: 16,
        fontWeight: "bold",
    },
});
