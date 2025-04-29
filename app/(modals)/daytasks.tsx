import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { useTasks } from '../TaskContext';

export default function DayTasks() {
  const { date } = useLocalSearchParams<{ date: string }>();
  const { tasks, deleteTask } = useTasks();

  const tasksForDate = tasks.filter(task => task.date === date);

  const handleTaskPress = (taskId: string) => {
    router.push(`/tasks/${taskId}`);
  };

  return (
    <>
      {/* hide the auto-header */}
      <Stack.Screen options={{ headerShown: false }} />

      <View className="flex-1 bg-white p-4">
        <Text className="text-2xl font-bold mb-6 text-center">
          Tasks for {date}
        </Text>

        <FlatList
          data={tasksForDate}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View className="flex-row items-center justify-between bg-gray-100 rounded-lg px-4 py-3 mb-4">
              <TouchableOpacity
                onPress={() => handleTaskPress(item.id)}
                className="flex-1"
              >
                <Text className="text-lg font-bold">
                  {item.taskDesc || 'No Description'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteTask(item.id)}
                className="w-10 h-10 bg-pink-200 rounded-full items-center justify-center ml-4"
              >
                <Text className="text-pink-800 font-bold">D</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text className="text-center text-gray-500 mt-8">
              No tasks for this date.
            </Text>
          }
        />

        <View className="items-center mt-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="px-6 py-3 bg-pink-200 rounded-full"
          >
            <Text className="text-pink-800 font-semibold">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
