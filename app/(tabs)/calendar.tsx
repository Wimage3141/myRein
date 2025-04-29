import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const CalendarTab = () => {
  const openDayTasks = (date: string) => {
    router.push({
      pathname: '/daytasks',
      params: { date: date },
    });
  };

  // Generate dates (April 28 to June 30, hardcoded for now)
  const generateDates = () => {
    const dates: string[] = [];
    const startDate = new Date("2025-04-28");
    const endDate = new Date("2025-06-30");

    let current = new Date(startDate);

    while (current <= endDate) {
      dates.push(current.toISOString().split('T')[0]);
      current.setDate(current.getDate() + 1);
    }

    return dates;
  };

  const dates = generateDates();

  return (
    <View className="flex-1 p-6 bg-white">
      <Text className="text-2xl font-bold mb-6">Select a Day</Text>

      <FlatList
        data={dates}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="p-4 mb-2 bg-gray-200 rounded-lg"
            onPress={() => openDayTasks(item)}
          >
            <Text className="text-lg text-center">{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CalendarTab;
