import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GradientText from '../common/GradientText';
import { LinearGradient } from 'expo-linear-gradient';
import { ITake } from '@/types/Itake';
import { getTimeAgo } from '@/utils/generalFunctions';

interface CardProps {
    take: ITake;
}

export default function Card({ take }: CardProps) {
    const calculatePercentage = (votesA: number, votesB: number, returnFor: string) => {
        const totalVotes = votesA + votesB;
        if (totalVotes === 0) return 0;
        if (returnFor === 'A') {
            return (Number(((votesA / totalVotes) * 100).toFixed(1)));
        } else {
            return (Number(((votesB / totalVotes) * 100).toFixed(1)));
        }
    }
    return (
        take
            ?
            <View style={styles.card}>
                {/* Time and Icon */}
                <View style={styles.header}>
                    <Text style={styles.timeText}>{getTimeAgo(take.timestamp * 1000)}</Text>
                    <Ionicons name="flame-outline" size={20} color="#888" />
                </View>
                {
                    take.mediaImage && take.mediaImage.length > 0
                        ?
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: take.mediaImage }}
                                style={styles.cardImage}
                            />
                        </View>
                        :
                        <></>
                }
                {
                    take.poster
                        ?
                        <>
                            <View style={styles.avatarContainer}>
                                <Image
                                    source={{ uri: take.poster.profilePic }} // Replace with actual avatar URL
                                    style={styles.avatar}
                                />
                            </View>
                            <View style={styles.avatarContainer}>
                                <Text style={styles.avatarTitle}>{take.poster.handle}</Text>
                            </View>
                        </>
                        :
                        <></>
                }

                <Text style={styles.contentText}>
                    {take.content}
                </Text>
                {
                    take.myAnswer === 0
                        ?
                        <View style={styles.votingContainer}>
                            <TouchableOpacity style={[styles.voteButton, styles.supportButton]}>
                                <GradientText colors={['#22C1C3', '#6EF195']}>
                                    <Text style={styles.voteText}>SUPPORT</Text>
                                </GradientText>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.voteButton, styles.attackButton]}>
                                <GradientText colors={['#F40752', '#F65770', '#F9AB8F']}>
                                    <Text style={styles.voteText}>ATTACK</Text>
                                </GradientText>
                            </TouchableOpacity>
                        </View>
                        :
                        take.myAnswer === 2
                            ?
                            <View style={styles.votingContainerResult}>
                                <LinearGradient
                                    colors={['#4A4A4A', '#4A4A4A']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.linearGradientSupport}>
                                    <View style={[styles.innerContainer, styles.innerContainerSupport]}>
                                        <GradientText colors={['#22C1C3', '#6EF195']}>
                                            <Text style={styles.voteText}>{calculatePercentage(take.answer1, take.answer2, 'A')}%</Text>
                                        </GradientText>
                                    </View>
                                </LinearGradient>
                                <LinearGradient
                                    colors={['#F40752', '#F65770', '#F9AB8F']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.linearGradientAttack}>
                                    <View style={[styles.innerContainer, styles.innerContainerAttack]}>
                                        <GradientText colors={['#F40752', '#F65770', '#F9AB8F']}>
                                            <Text style={styles.voteText}>{calculatePercentage(take.answer1, take.answer2, 'B')}%</Text>
                                        </GradientText>
                                    </View>
                                </LinearGradient>
                            </View>
                            :
                            <View style={styles.votingContainerResult}>
                                <LinearGradient
                                    colors={['#22C1C3', '#6EF195']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.linearGradientSupport}>
                                    <View style={[styles.innerContainer, styles.innerContainerSupport]}>
                                        <GradientText colors={['#22C1C3', '#6EF195']}>
                                            <Text style={styles.voteText}>{calculatePercentage(take.answer1, take.answer2, 'A')}%</Text>
                                        </GradientText>
                                    </View>
                                </LinearGradient>
                                <LinearGradient
                                    colors={['#4A4A4A', '#4A4A4A', '#4A4A4A']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.linearGradientAttack}>
                                    <View style={[styles.innerContainer, styles.innerContainerAttack]}>
                                        <GradientText colors={['#F40752', '#F65770', '#F9AB8F']}>
                                            <Text style={styles.voteText}>{calculatePercentage(take.answer1, take.answer2, 'B')}%</Text>
                                        </GradientText>
                                    </View>
                                </LinearGradient>
                            </View>
                }

                <View style={styles.footer}>
                    <View style={styles.footerLeft}>
                        <Ionicons name="chatbubble-outline" size={20} color="#888" />
                        <Text style={styles.footerText}>{take.commentsAmount}</Text>
                    </View>
                    <Text style={styles.footerText}>Leave a support comment</Text>
                </View>
            </View>
            :
            <></>
    );
}

const styles = StyleSheet.create({
    linearGradientSupport: {
        borderTopLeftRadius: 25, // Half of the height for a full curve
        borderBottomLeftRadius: 25, // Same as above for the bottom
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    linearGradientAttack: {
        borderTopRightRadius: 25, // Half of the height for a full curve
        borderBottomRightRadius: 25, // Same as above for the bottom
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
    },
    innerContainer: {
        width: 173,
        flex: 1,
        margin: 3, // <-- Border Width
        backgroundColor: '#4A4A4A',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    innerContainerSupport: {
        borderTopLeftRadius: 25, // Half of the height for a full curve
        borderBottomLeftRadius: 25, // Same as above for the bottom
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    innerContainerAttack: {
        borderTopRightRadius: 25, // Half of the height for a full curve
        borderBottomRightRadius: 25, // Same as above for the bottom
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
    },
    card: {
        padding: 15,
        backgroundColor: "#171717",
        borderBottomWidth: 2,
        borderBottomColor: "#1e1e1e"
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    timeText: {
        color: '#888',
        fontSize: 14,
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        marginBottom: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    cardImage: {
        height: 150,
        borderRadius: 10,
    },
    imageContainer: {
        marginBottom: 10,
    },
    avatarTitle: {
        color: '#7B7B7B',
        fontSize: 14,
        fontWeight: 500,
    },
    contentText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 700,
        textAlign: 'center',
        marginBottom: 15,
    },
    votingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    votingContainerResult: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    voteButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 5,
        marginHorizontal: 2,
        backgroundColor: '#4A4A4A'
    },
    supportButton: {
        borderTopLeftRadius: 25, // Half of the height for a full curve
        borderBottomLeftRadius: 25, // Same as above for the bottom
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    attackButton: {
        // borderWidth: 3,
        borderTopRightRadius: 25, // Half of the height for a full curve
        borderBottomRightRadius: 25, // Same as above for the bottom
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
    voteText: {
        fontSize: 16,
        fontWeight: "900",
        color: '#fff',
        fontFamily: ""
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerText: {
        color: '#888',
        fontSize: 14,
        marginLeft: 5,
    },
});
