import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import Screen from '../components/Screen';
import colors from '../config/colors';
import DayPicker from '../components/DayPicker';
import AppText from '../components/AppText';

function HomeScreen(props) {
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [days, setDays] = useState([]);

    const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];
    const years = ["2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034", "2035", "2036", "2037", "2038", "2039", "2040"];

    // Utility function to get the number of days in a month
    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate(); // Get last day of the month
    };

    // Update the days when month or year changes
    useEffect(() => {
        if (selectedMonth !== null && selectedYear !== null) {
            const monthIndex = months.indexOf(selectedMonth);
            const yearValue = parseInt(selectedYear, 10);
            const numberOfDays = getDaysInMonth(monthIndex, yearValue);
            setDays(Array.from({ length: numberOfDays }, (_, i) => i + 1));
        }
    }, [selectedMonth, selectedYear]);

    // Fetch today's date and set it as the default selected values
    useEffect(() => {
        const today = new Date();
        const day = today.getDate();
        const month = months[today.getMonth()];  // Get the month name
        const year = today.getFullYear().toString();
        
        setSelectedDay(day);
        setSelectedMonth(month);
        setSelectedYear(year);
    }, []);

    const handleButtonPress = () => {
        // Handle button press action here
        console.log(`Selected Date: ${selectedYear} ${selectedMonth} ${selectedDay}`);
    };

    return (
        <Screen style={styles.screen}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <DayPicker 
                    days={days}
                    months={months}
                    years={years}
                    selectedDay={selectedDay} 
                    setSelectedDay={setSelectedDay} 
                    selectedMonth={selectedMonth} 
                    setSelectedMonth={setSelectedMonth} 
                    selectedYear={selectedYear}
                    setSelectedYear={setSelectedYear}
                />
                <View style={styles.content}>
                    <View style={styles.contentProductSection}>
                        <View style={styles.chooseProductButton}></View>
                        <View style={styles.contentProductSectionRight}>
                            <AppText style={styles.quantityText}>- 1 +</AppText>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                <AppText style={styles.buttonText}>Check In!</AppText>
            </TouchableOpacity>
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.backgroundSecondary,
        paddingVertical: 10,
        flex: 1,
    },
    scrollContainer: {
        paddingBottom: 90, // Add padding to prevent content from being covered by the button
    },
    content: {
        backgroundColor: colors.primary,
        marginHorizontal: '5%',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginVertical: 20
    },
    contentProductSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    contentProductSectionRight: {
        flex: 1,
        alignItems: 'center'
    },
    chooseProductButton: {
        backgroundColor: colors.background,
        height: 100,
        width: 100,
        borderRadius: 10
    },
    quantityText: {
        fontSize: 28,
        color: colors.background
    },
    button: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        height: 70,
        backgroundColor: colors.secondary,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 24,
    },
});

export default HomeScreen;
