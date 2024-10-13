import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

function Screen({ children, style }) {
    return (
        <SafeAreaView style={[styles.screen, {backgroundColor: style.backgroundColor}]}>
            <StatusBar style="light" />
            <View style={[styles.screen, style]}>
                {children}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    }
})

export default Screen;