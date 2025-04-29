import { Button, Text, TextInput, View } from "react-native";
import '../globals.css';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import { useTasks } from "../TaskContext";

export default function Index() {
  const { addTask } = useTasks();
  
  const [taskDesc, setTaskDesc] = useState('');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  
  const handleAddTask = () => {
    if (!startTime || !endTime) return; // safety

    const newTask = {
      id: Date.now().toString(),
      taskDesc: taskDesc,
      date: new Date().toISOString().split('T')[0],
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      timeStarted: null,
      timeEnded: null,
    };

    addTask(newTask);
    setTaskDesc('');
    setStartTime(null);
    setEndTime(null);
  }

  return (
    <View className="flex-1 p-6 bg-white">
      <Text className="text-2xl font-bold mb-4">Add a Task!</Text>

      <Button title="Pick start and end times" onPress={() => setShowStartPicker(true)} />

      {showStartPicker && (
        <DateTimePicker
          value={startTime ?? new Date()}
          mode="time"
          onChange={(event, selectedDate) => {
            setShowStartPicker(false);
            if (selectedDate) {
              setStartTime(selectedDate);
              setShowEndPicker(true);
            }
          }}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          value={endTime ?? new Date()}
          mode="time"
          onChange={(event, selectedDate) => {
            setShowEndPicker(false);
            if (selectedDate) setEndTime(selectedDate);
          }}
        />
      )}

      <View className="my-2"></View>

      <TextInput
        placeholder="Enter task description"
        value={taskDesc}
        onChangeText={setTaskDesc}
        className="border border-gray-300 rounded p-2 mb-4 mt-4"
      />

      <View className="my-6"></View>

      <Button
        title="Add Task"
        onPress={handleAddTask}
        disabled={!taskDesc || !startTime || !endTime}
      />
    </View>
  );
}
