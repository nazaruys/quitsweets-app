import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, View } from 'react-native';
import AppText from './AppText';
import colors from '../config/colors';

const DayPicker = ({ days, months, years, selectedDay, setSelectedDay, selectedMonth, setSelectedMonth, selectedYear, setSelectedYear }) => {
    const dayFlatListRef = useRef(null);
    const monthFlatListRef = useRef(null);
    const yearFlatListRef = useRef(null);

    useEffect(() => {
        const dayIndex = days.indexOf(selectedDay);
        const monthIndex = months.indexOf(selectedMonth);
        const yearIndex = years.indexOf(selectedYear);
    
        // Delay the scrolling to ensure the layout is complete
        const timeoutId = setTimeout(() => {
            if (dayIndex !== -1) {
                dayFlatListRef.current?.scrollToIndex({
                    index: dayIndex,
                    animated: true,
                    viewPosition: 0.1,
                });
            }
    
            if (monthIndex !== -1) {
                monthFlatListRef.current?.scrollToIndex({
                    index: monthIndex,
                    animated: true,
                    viewPosition: 0.05,
                });
            }
    
            if (yearIndex !== -1) {
                yearFlatListRef.current?.scrollToIndex({
                    index: yearIndex,
                    animated: true,
                    viewPosition: 0.05,
                });
            }
        }, 300); // Adjust the delay as needed
    
        // Cleanup timeout on component unmount or when any selected value changes
        return () => clearTimeout(timeoutId);
    }, [selectedDay, selectedMonth, selectedYear, days, months, years]);
    

    const handleSelectDay = (item, index) => {
        setSelectedDay(item);
        dayFlatListRef.current?.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0.1,
        });
    };

    const handleSelectMonth = (item, index) => {
        setSelectedMonth(item);
        monthFlatListRef.current?.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0.05,
        });
    };

    const handleSelectYear = (item, index) => {
        setSelectedYear(item);
        yearFlatListRef.current?.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0.05,
        });
    };

    const renderDayItem = ({ item, index }) => (
        <TouchableOpacity 
            style={[styles.block, selectedDay === item && styles.selectedBlock]}
            activeOpacity={1}
            onPress={() => handleSelectDay(item, index)}
        >
            <AppText style={[styles.blockText, selectedDay === item && styles.selectedText]}>
                {item}
            </AppText>
        </TouchableOpacity>
    );

    const renderMonthItem = ({ item, index }) => (
        <TouchableOpacity 
            style={[styles.monthBlock, selectedMonth === item && styles.selectedMonthBlock]} 
            activeOpacity={1}
            onPress={() => handleSelectMonth(item, index)}
        >
            <AppText style={[styles.monthText, selectedMonth === item && styles.selectedMonthText]}>
                {item}
            </AppText>
        </TouchableOpacity>
    );

    const renderYearItem = ({ item, index }) => (
        <TouchableOpacity 
            style={[styles.yearBlock, selectedYear === item && styles.selectedYearBlock]} 
            activeOpacity={1}
            onPress={() => handleSelectYear(item, index)}
        >
            <AppText style={[styles.yearText, selectedYear === item && styles.selectedYearText]}>
                {item}
            </AppText>
        </TouchableOpacity>
    );

    return (
        <View>
            <FlatList
                ref={yearFlatListRef}
                data={years}
                renderItem={renderYearItem}
                keyExtractor={(item) => item.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.yearScrollContainer}
            />
            <FlatList
                ref={monthFlatListRef}
                data={months}
                renderItem={renderMonthItem}
                keyExtractor={(item) => item.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            />
            <FlatList
                ref={dayFlatListRef}
                data={days}
                renderItem={renderDayItem}
                keyExtractor={(item) => item.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
                getItemLayout={(data, index) => (
                    { length: 76, offset: 76 * index, index }
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        paddingVertical: 5,
    },
    yearScrollContainer: {
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    block: {
        borderRadius: 10,
        width: 70,
        height: 70,
        marginHorizontal: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    blockText: {
        color: '#fff',
        fontSize: 24,
    },
    selectedBlock: {
        backgroundColor: colors.secondary,
    },
    selectedText: {
        fontWeight: '700',
    },
    monthBlock: {
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    monthText: {
        fontSize: 18,
        color: colors.primary,
    },
    selectedMonthText: {
        color: colors.secondary,
    },
    yearBlock: {
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    yearText: {
        fontSize: 20,
        color: colors.primary,
    },
    selectedYearText: {
        color: colors.secondary,
    },
});

export default DayPicker;
