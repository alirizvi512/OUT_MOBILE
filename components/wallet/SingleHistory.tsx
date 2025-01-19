import useSolanaTransaction from "@/callbacks/useSolanaTransaction";
import { IGCCActivity } from "@/types/IGCCActivity";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import moment from "moment";

interface SingleHistoryProps {
    activity: IGCCActivity
}

export default function SingleHistory({ activity }: SingleHistoryProps) {
    const { fromLamports } = useSolanaTransaction();
    return (
        <View style={styles.listingContainer}>
            <View style={styles.listingInnerDiv}>
                <Image
                    source={{ uri: activity.subject.profilePic }}
                    resizeMode="contain"
                    style={styles.pfpImage}
                />
                <View style={styles.userInfo}>
                    <Text style={styles.username} numberOfLines={1} ellipsizeMode="middle">{activity.subject.displayName}</Text>
                    <Text style={styles.chipsAmount}>{fromLamports(activity.tokenAmount)}{" "}
                        {fromLamports(activity.tokenAmount) > 1 ? "Chips" : "Chip"}</Text>
                </View>
            </View>
            <View style={styles.listingInnerDiv}>
                <View style={styles.userInfo}>
                    <View style={styles.amountDivContainer}>
                        <Image
                            source={require('./../../assets/images/white-solana.png')}
                            resizeMode="contain"
                            style={styles.solanaImage}
                        />
                        <Text style={styles.username}>{fromLamports(activity.solPaid).toFixed(3)}</Text>
                    </View>
                    <Text style={styles.chipsAmount}>{moment(activity.timestamp * 1000).format("MMM D, YYYY")}</Text>
                </View>
                <View style={styles.chipsAmountParentDiv}>
                    {
                        activity.isBuy
                            ?
                            <TouchableOpacity style={styles.activitySuccess}>
                                <Image
                                    source={require('./../../assets/images/plus.png')}
                                    resizeMode="contain"
                                    style={{ width: 24, height: 24 }}
                                />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.failureSuccess}>
                                <Image
                                    source={require('./../../assets/images/minus.png')}
                                    resizeMode="contain"
                                    style={{ width: 24, height: 24 }}
                                />
                            </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    amountDivContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    solanaImage: {
        width: 16,
        height: 16
    },
    listingInnerDiv: {
        flexDirection: 'row',
        gap: 12
    },
    activitySuccess: {
        display: 'flex',
        padding: 3,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        borderRadius: 999999,
        backgroundColor: '#00B207',
        width: 39,
        height: 39
    },
    failureSuccess: {
        display: 'flex',
        padding: 3,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        borderRadius: 999999,
        backgroundColor: '#FF4646',
        width: 39,
        height: 39
    },
    chipsAmountParentDiv: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    chipsAmount: {
        color: '#7B7B7B',
        textAlign: 'right',
        fontFamily: 'Inter',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: 22,
    },
    handle: {
        color: '#7B7B7B',
        fontFamily: 'Inter',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: 22
    },
    username: {
        color: '#FFF',
        fontFamily: 'Inter',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 700,
        textAlign: 'center'
    },
    userInfo: {
        flexDirection: 'column',
        gap: 4,
        maxWidth: 120
    },
    pfpImage: {
        borderRadius: 48,
        width: 48,
        height: 48,
    },
    listingContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 24,
        paddingTop: 0,
        gap: 12
    },
});