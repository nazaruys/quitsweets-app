import React from 'react';
import { StyleSheet } from 'react-native';

import Screen from '../components/Screen';
import colors from '../config/colors';
import DayPicker from '../components/DayPicker';

function HomeScreen(props) {
	const data = Array.from({ length: 30 }, (_, i) => i + 1); // Create an array from 1 to 30

    return (
        <Screen style={styles.screen}>
            <DayPicker numbers={data} />
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.backgroundSecondary
    }
})

export default HomeScreen;