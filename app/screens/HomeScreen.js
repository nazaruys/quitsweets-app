import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, TextInput } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

import Screen from '../components/Screen';
import colors from '../config/colors';
import DayPicker from '../components/DayPicker';
import AppText from '../components/AppText';
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';

function HomeScreen() {
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [days, setDays] = useState([]);
    const [quantity, setQuantity] = useState("1"); // State to manage the product quantity
    const [note, setNote] = useState("");

    const navigation = useNavigation();

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
        console.log(`Selected Date: ${selectedYear} ${selectedMonth} ${selectedDay}`);
    };

    const handleIncrement = () => {
        const steps = ["1", "0.75", "0.50", "0.25", "0.20", "0.15", "0.10", "0.05", "0.03"];
        setQuantity(prevQuantity => {
            if (prevQuantity === "") {
                return "1"
            }
            const currentIndex = steps.indexOf(prevQuantity);
        
            // If the current quantity is found in the steps array and not "1", move to the previous step
            if (currentIndex > 0) {
                return steps[currentIndex - 1]; // Move to the previous step
            }
        
            // If the quantity is "1" or greater, increment by 1 but not greater than 999
            const numericQuantity = parseFloat(prevQuantity);
            if (numericQuantity >= 1) {
                const incrementedValue = numericQuantity + 1;
                // Ensure the incremented value does not exceed 999
                return incrementedValue <= 999 ? incrementedValue.toString() : '999';
            }
        
            return prevQuantity; // If it doesn't match, keep the value unchanged
        });
    };
    
    

    const handleDecrement = () => {
        const steps = ["1", "0.75", "0.50", "0.25", "0.20", "0.15", "0.10", "0.05", "0.03"];
        setQuantity(prevQuantity => {
            const numericQuantity = parseFloat(prevQuantity);
    
            // If the current quantity is greater than 1, decrement by 1
            if (numericQuantity > 1) {
                return (numericQuantity - 1).toString().substring(0, 4); // Return first 4 characters
            }
    
            const currentIndex = steps.indexOf(prevQuantity);
    
            // If the current quantity is not the last one in steps, decrement it
            if (currentIndex >= 0 && currentIndex < steps.length - 1) {
                return steps[currentIndex + 1].substring(0, 4); // Move to the next step and return first 4 characters
            }
    
            // If at the last step, keep the quantity unchanged
            return prevQuantity.substring(0, 4); // Return first 4 characters
        });
    };
    

    const handleQuantityChange = (text) => {
        // Replace commas with dots
        let newText = text.replace(',', '.');
    
        // Allow only numbers and a single dot
        if (/^\d*\.?\d*$/.test(newText)) {
            // Ensure the number is less than 999
            if (parseFloat(newText) < 999 || newText === '') {
                setQuantity(newText);
            }
        }
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
                <View style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.contentProductSection}>
                            <TouchableOpacity style={styles.chooseProductButton} onPress={() => navigation.navigate('ChooseProduct')}></TouchableOpacity>
                            <View style={styles.contentProductSectionRight}>
                                <View style={styles.quantityContainer}>
                                    <TouchableOpacity style={styles.quantityButton} onPress={handleDecrement}>
                                        <AntDesign name="minus" size={24} color="white" />
                                    </TouchableOpacity>
                                    <TextInput
                                        style={styles.quantityText}
                                        value={quantity}
                                        onChangeText={handleQuantityChange}
                                        keyboardType="numeric"
                                    />
                                    <TouchableOpacity style={styles.quantityButton} onPress={handleIncrement}>
                                        <AntDesign name="plus" size={24} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        {/* TextInput for note */}
                        <TextInput
                            style={styles.noteInput}
                            placeholder="Enter a note"
                            placeholderTextColor="rgba(255, 255, 255, 0.7)" // White text with some opacity for the placeholder
                            maxLength={255}
                            value={note}
                            onChangeText={setNote}
                            multiline={false} // Ensures it's a single line
                        />
                        {/* New smaller button */}
                        <TouchableOpacity style={styles.smallButton} onPress={handleButtonPress}>
                            <AppText style={styles.smallButtonText}>Add Sweet</AppText>
                        </TouchableOpacity>
                    </View>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
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
        flex: 1,
    },
    scrollContainer: {
        paddingBottom: 90, // Add padding to prevent content from being covered by the button
    },
    content: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginVertical: 20
    },
    container: {
        paddingHorizontal: '5%'
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
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 40,
        backgroundColor: colors.secondary,
        borderRadius: 5,
    },
    quantityText: {
        fontSize: 28,
        color: colors.background,
        marginHorizontal: 20, // Spacing between the buttons
    },
    noteInput: {
        backgroundColor: colors.backgroundTertiary,
        color: 'white', // White text for the input
        borderRadius: 10,
        padding: 10,
        marginTop: 20, // Add some margin below the quantity section
        fontSize: 16, // Adjust font size as needed
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
    smallButton: {
        backgroundColor: colors.tertiary,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30, // Adjust margin to position the button
    },
    smallButtonText: {
        color: '#fff',
        fontSize: 18,  // Smaller font size for the button
    },
});


export default HomeScreen;
