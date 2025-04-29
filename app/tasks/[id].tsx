import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { useTasks } from '../TaskContext';

export default function TaskDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tasks, startTask, endTask } = useTasks();

  const task = tasks.find(t => t.id === id);

  // helper to format ISO → "07:24 AM"
  const fmt = (iso: string) =>
    new Date(iso).toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });

  if (!task) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View className="flex-1 justify-center items-center bg-white p-6">
          <Text className="text-lg font-bold mb-6">Task not found.</Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-[#E40078] rounded-full px-6 py-3"
          >
            <Text className="text-white font-semibold">Back</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 p-6 bg-white justify-center items-center">
        <Text className="text-2xl font-bold mb-6 text-center">
          {task.taskDesc}
        </Text>

        <Text className="text-lg mb-4">Start: {fmt(task.startTime)}</Text>
        <Text className="text-lg mb-6">End: {fmt(task.endTime)}</Text>

        {!task.timeStarted && (
          <TouchableOpacity
            onPress={() => startTask(task.id)}
            className="bg-[#E40078] rounded-full px-6 py-3 mb-4"
          >
            <Text className="text-white font-semibold">START</Text>
          </TouchableOpacity>
        )}
        {task.timeStarted && !task.timeEnded && (
          <TouchableOpacity
            onPress={() => endTask(task.id)}
            className="bg-[#E40078] rounded-full px-6 py-3 mb-4"
          >
            <Text className="text-white font-semibold">END</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-[#E40078] rounded-full px-6 py-3"
        >
          <Text className="text-white font-semibold">Back</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
