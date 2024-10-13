import React, { useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import AppText from './AppText';
import colors from '../config/colors';

const DayPicker = ({ numbers }) => {
    const [selectedNumber, setSelectedNumber] = useState(null); // State to track the selected number

    // Render each item in the FlatList
    const renderItem = ({ item }) => (
        <TouchableOpacity 
            style={[styles.block, selectedNumber === item && styles.selectedBlock]} // Apply selected style
            activeOpacity={1}
            onPress={() => setSelectedNumber(item)} // Update selected number on press
        >
            <AppText 
                style={[styles.blockText, selectedNumber === item && styles.selectedText]} // Apply selected text style
            >
                {item}
            </AppText>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={numbers}
            renderItem={renderItem}
            keyExtractor={(item) => item.toString()} // Key for each item
            horizontal // Set horizontal scrolling
            showsHorizontalScrollIndicator={false} // Hide scroll indicator
            contentContainerStyle={styles.scrollContainer} // Style for FlatList content
        />
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        height: 100,
        paddingVertical: 10, // Add vertical padding for better aesthetics
    },
    block: {
        borderRadius: 10, // Rounded corners
        width: 80,
        height: 80,
        marginHorizontal: 10, // Margin between blocks
        alignItems: 'center', // Center the text inside the block
        justifyContent: 'center', // Center the text vertically
    },
    blockText: {
        color: '#fff', // Text color
        fontSize: 34, // Text size
    },
    selectedBlock: {
        backgroundColor: colors.secondary, // Background color for the selected block
    },
    selectedText: {
        fontWeight: '700', // Bold text for the selected block
    },
});

export default DayPicker;
