import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';

function ProductCard() {
    return (
        <View style={styles.card}>
            <View style={styles.icon}></View>
            <View style={styles.titleContainer}>
                <AppText style={styles.title}>Bread s s s s  s s ddsd sdasd asd a a a a a</AppText>
            </View>
            <View style={styles.subTitleContainer}>
                <AppText style={styles.subTitle}>100g</AppText>
                <AppText style={styles.subTitle}>sugar</AppText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        backgroundColor: colors.primary,
        width: '100%',
        height: 100,
        borderRadius: 7,
        flexDirection: 'row',
        alignItems: 'center',
        padding: '3%',
    },
    icon: {
        backgroundColor: colors.background,
        height: 80,
        width: 80,
        borderRadius: 10
    },
    titleContainer: {
        paddingHorizontal: '5%',
        // backgroundColor: 'purple',
        flex: 1,
    },
    title: {
        lineHeight: 20,
        fontSize: 20,
        color: colors.background
    },
    subTitleContainer: {
        paddingHorizontal: '5%',
        // backgroundColor: 'grey',
        height: '100%',
        width: '1'
    },
    subTitle: {
        fontSize: 18,
        color: colors.background
    },
})

export default ProductCard;