import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { useTasks } from '../TaskContext'; // <-- NEW: import your custom hook

const DayTasks = () => {
  const { date } = useLocalSearchParams(); // grab the selected date
  const { tasks } = useTasks(); // you can grab one of the many objects returned by the hook by their name

  console.log("All tasks: ", tasks);
  console.log("Number of tasks: ", tasks.length);

  // Filter real tasks for the selected date
  const tasksForDate = tasks.filter(task => task.date === date);

  const handleTaskPress = (taskId: string) => {
    router.push(`/tasks/${taskId}`);
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">Tasks for {date}</Text>

      <FlatList
        data={tasksForDate}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="p-4 mb-4 bg-gray-100 rounded-lg"
            onPress={() => handleTaskPress(item.id)}
          >
            <Text className="text-lg font-bold">{item.taskDesc || "No Description"}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Close modal button */}
      <Button title="Close" onPress={() => router.back()} />
    </View>
  );
};

export default DayTasks;
