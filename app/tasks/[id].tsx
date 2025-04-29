import { View, Text, Button } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { useTasks } from '../TaskContext';

const TaskDetail = () => {
    const { id } = useLocalSearchParams(); // get task ID from URL, this can be done with [id].tsx, no need params object
    const { tasks, startTask, endTask } = useTasks(); // get tasks and control functions
  
    const task = tasks.find(task => task.id === id);
  
    if (!task) {
      return (
        <View className="flex-1 justify-center items-center bg-white">
          <Text className="text-lg font-bold">Task not found.</Text>
          <Button title="Back" onPress={() => router.back()} />
        </View>
      );
    }
  
    return (
      <View className="flex-1 p-6 bg-white justify-center items-center">
        <Text className="text-2xl font-bold mb-4">{task.taskDesc}</Text>
  
        <Text className="text-lg mb-2">Task ID: {task.id}</Text>

        <Text>Start Time: {task.startTime}</Text>

        <Text>Start Time: {task.endTime}</Text>
  
        <Text className="text-md mb-2">
          Started: {task.timeStarted ? new Date(task.timeStarted).toLocaleTimeString() : "Not started yet"}
        </Text>
  
        <Text className="text-md mb-4">
          Ended: {task.timeEnded ? new Date(task.timeEnded).toLocaleTimeString() : "Not ended yet"}
        </Text>
  
        {/* Show START button if not started */}
        {!task.timeStarted && (
          <Button title="START" onPress={() => startTask(task.id)} />
        )}
  
        {/* Show END button if started but not ended */}
        {task.timeStarted && !task.timeEnded && (
          <Button title="END" onPress={() => endTask(task.id)} />
        )}
  
        <View className="mt-8">
          <Button title="Back" onPress={() => router.back()} />
        </View>
      </View>
    );
  };
  
  export default TaskDetail;