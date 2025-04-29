import { View, Text, TextInput, TouchableOpacity } from "react-native";
import "../globals.css";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { useTasks } from "../TaskContext";

export default function Index() {
  const { addTask } = useTasks();

  const [taskDesc, setTaskDesc] = useState("");
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleAddTask = () => {
    if (!startTime || !endTime) return;
    const newTask = {
      id: Date.now().toString(),
      taskDesc,
      date: new Date().toISOString().split("T")[0],
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      timeStarted: null,
      timeEnded: null,
    };
    addTask(newTask);
    setTaskDesc("");
    setStartTime(null);
    setEndTime(null);
  };

  const canAdd = taskDesc && startTime && endTime;

  return (
    <View className="flex-1 px-6 pt-8 bg-white items-center">
      <Text className="text-2xl font-bold mb-8 text-center">
        Add a Task!
      </Text>

      <TouchableOpacity
        onPress={() => setShowStartPicker(true)}
        className="w-full bg-pink-200 py-3 rounded-xl items-center mb-4"
      >
        <Text className="font-semibold text-pink-800">
          Pick start & end times
        </Text>
      </TouchableOpacity>

      {showStartPicker && (
        <View className="w-full mb-4">
          <DateTimePicker
            value={startTime ?? new Date()}
            mode="time"
            display="default"
            onChange={(_, date) => {
              setShowStartPicker(false);
              if (date) {
                setStartTime(date);
                setShowEndPicker(true);
              }
            }}
          />
        </View>
      )}

      {showEndPicker && (
        <View className="w-full mb-6">
          <DateTimePicker
            value={endTime ?? new Date()}
            mode="time"
            display="default"
            onChange={(_, date) => {
              setShowEndPicker(false);
              if (date) setEndTime(date);
            }}
          />
        </View>
      )}

      <TextInput
        placeholder="Enter task description"
        value={taskDesc}
        onChangeText={setTaskDesc}
        className="w-full bg-gray-100 border border-gray-300 rounded-xl p-4 mb-6"
      />

      <TouchableOpacity
        onPress={handleAddTask}
        disabled={!canAdd}
        className={`w-full py-3 rounded-xl items-center ${
          canAdd ? "bg-pink-200" : "bg-gray-300"
        }`}
      >
        <Text
          className={`font-semibold ${
            canAdd ? "text-pink-800" : "text-gray-600"
          }`}
        >
          Add Task
        </Text>
      </TouchableOpacity>
    </View>
  );
}
