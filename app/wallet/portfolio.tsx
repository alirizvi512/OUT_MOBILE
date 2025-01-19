import SinglePortfolio from "@/components/wallet/SinglePotfolio";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function Portfolio() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <SinglePortfolio />
                <SinglePortfolio />
                <SinglePortfolio />
                <SinglePortfolio />
                <SinglePortfolio />
                <SinglePortfolio />
                <SinglePortfolio />
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