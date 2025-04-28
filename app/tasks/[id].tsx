import { View, Text, Button } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';

const TaskDetail = () => {
  const { id } = useLocalSearchParams(); // get id from URL
  const [timeStarted, setTimeStarted] = useState<string | null>(null);
  const [timeEnded, setTimeEnded] = useState<string | null>(null);

  const handleStart = () => {
    setTimeStarted(new Date().toISOString());
  };

  const handleEnd = () => {
    setTimeEnded(new Date().toISOString());
  };

  return (
    <View className="flex-1 p-6 bg-white justify-center items-center">
      <Text className="text-2xl font-bold mb-4">Task Detail</Text>

      <Text className="text-lg mb-2">Task ID: {id}</Text>

      <Text className="text-md mb-2">
        Started: {timeStarted ? timeStarted : "Not started yet"}
      </Text>

      <Text className="text-md mb-4">
        Ended: {timeEnded ? timeEnded : "Not ended yet"}
      </Text>

      {timeStarted === null && (
        <Button title="START" onPress={handleStart} />
      )}

      {timeStarted !== null && timeEnded === null && (
        <Button title="END" onPress={handleEnd} />
      )}

      <View className="mt-8">
        <Button title="Back" onPress={() => router.back()} />
      </View>
    </View>
  );
};

export default TaskDetail;
