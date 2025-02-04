import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import AppHeader from '../components/AppHeader';
import Screen from '../components/Screen';
import colors from '../config/colors';
import { useFocusEffect } from '@react-navigation/native';
import getProducts from '../utils/getProducts';

function ChooseProductScreen() {
    useFocusEffect(
        useCallback(() => {
            getProducts()
            .then(products => {
                console.log(products); // Will log [] if the Product table doesn't exist
              })
              .catch(error => {
                console.error('Error fetching products on screen:', error);
              });
        }, [])
    )
    return (
        <View style={{flex: 1, backgroundColor: colors.background}}>
            <Screen style={styles.screen}>
                <AppHeader title="Choose food" />
            </Screen>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.background
    }
})

export default ChooseProductScreen;