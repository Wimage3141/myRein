import { Button, Text, TextInput, View } from "react-native";
import '../globals.css';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import { useTasks } from "../TaskContext";

export default function Index() {
  const { addTask } = useTasks();
  const [taskDesc, setTaskDesc] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  
  const handleAddTask = () => {
    const newTask = {
      id: Date.now().toString(),
      taskDesc: taskDesc,
      date: startTime.toISOString().split('T')[0],
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      timeStarted: null,
      timeEnded: null,
    };

    addTask(newTask);
    setTaskDesc('');
  }

  const [test, setTest] = useState(false);
  
  return (
    <View  className="flex-1 p-6">
      <Text className="text-2xl font-bold mb-4">Add a task!</Text>
      <Text>Placeholder for datetimepicker</Text>
      <Button title="Pick start time" onPress={() => setShowStartPicker(true)} />
      {showStartPicker && (
        <DateTimePicker
          value={startTime}
          mode="time"
          
        />
      )}
      <TextInput
        placeholder="Enter task description"
        value={taskDesc}
        onChangeText={setTaskDesc}
        className="border border-gray-300 rounded p-2 mb-4 mt-4"
      ></TextInput>
      <Button title="Add Task"></Button>
    </View>
  );
}

