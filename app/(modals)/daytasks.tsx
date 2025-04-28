import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { useLocalSearchParams, router } from 'expo-router';

const DayTasks = () => {
  const { date } = useLocalSearchParams(); // Grab the selected date

  // 🔥 Fake tasks for demo
  const tasksForDate = [
    { id: 'task-1', title: 'Go to Gym' },
    { id: 'task-2', title: 'Finish React Native course' },
  ];

  const handleTaskPress = (taskId: string) => {
    router.push(`/tasks/${taskId}`);
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">Tasks for {date}</Text>

      <FlatList
        data={tasksForDate}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="p-4 mb-4 bg-gray-100 rounded-lg"
            onPress={() => handleTaskPress(item.id)}
          >
            <Text className="text-lg font-bold">{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Close modal button */}
      <Button title="Close" onPress={() => router.back()} />
    </View>
  );
};

export default DayTasks;
