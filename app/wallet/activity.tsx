import SingleHistory from "@/components/wallet/SingleHistory";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function Activity() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <SingleHistory success={true} />
                <SingleHistory success={true} />
                <SingleHistory success={false} />
                <SingleHistory success={true} />
                <SingleHistory success={true} />
                <SingleHistory success={true} />
                <SingleHistory success={true} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
})