import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

type BottomSheetComponentProps = {
    selectedWallet: string;
    setSelectedWallet: (val: string) => void;
    children?: React.ReactNode; // Added children as an optional prop
};

const BottomSheetComponent = ({ selectedWallet, setSelectedWallet, children }: BottomSheetComponentProps) => {
    // hooks
    const sheetRef = useRef<BottomSheet>(null);

    // variables
    const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

    // callbacks
    const handleSheetChange = useCallback((index: number) => {
        console.log("handleSheetChange", index);
    }, []);
    const handleSnapPress = useCallback((index: number) => {
        sheetRef.current?.snapToIndex(index);
    }, []);
    const handleClosePress = useCallback(() => {
        sheetRef.current?.close();
    }, []);

    return (
        <GestureHandlerRootView>
            {/* <Button title="Close" onPress={() => handleClosePress()} /> */}
            <BottomSheet
                ref={sheetRef}
                index={1}
                snapPoints={snapPoints}
                enableDynamicSizing={false}
                onChange={handleSheetChange}
            >
                <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
                    {children}
                </BottomSheetScrollView>
            </BottomSheet>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        // paddingTop: 200,
    },
    contentContainer: {
        backgroundColor: "white",
    },
});

export default BottomSheetComponent;
