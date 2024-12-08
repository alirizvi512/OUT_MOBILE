import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    Modal,
    TouchableOpacity,
} from "react-native";
import { ImageEditor } from "expo-crop-image";

interface CropperProps {
    image: string
}

export default function Cropper({ image }: CropperProps): JSX.Element {
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (image) {
            setModalVisible(true);
        }
    }, [image])

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide" // Options: "none", "slide", "fade"
                transparent={true} // Makes the modal background transparent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)} // Called when the user tries to close the modal
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>This is a Popup Modal</Text>
                        <Text style={styles.modalText}>
                            You can customize this modal to include any content you like.
                        </Text>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                        {/* <ImageEditor
                            imageUri={image}
                            fixedAspectRatio={4 / 1}
                            minimumCropDimensions={{
                                width: 50,
                                height: 50,
                            }}
                            onEditingCancel={() => {
                                console.log("onEditingCancel");
                            }}
                            onEditingComplete={(image) => {
                                console.log(image);
                            }} isVisible={modalVisible}
                        /> */}
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    },
    modalContent: {
        width: "100%",
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, // Adds shadow for Android
        flex: 1,
        justifyContent: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: "#007BFF",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    closeButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});
