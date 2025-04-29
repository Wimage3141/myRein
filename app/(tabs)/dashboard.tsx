import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useTasks } from '../TaskContext';
import { useState } from 'react';

export default function Dashboard() {
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  const { tasks } = useTasks();

  // Filter completed tasks (those with timeStarted and timeEnded)
  const completedTasks = tasks.filter(task => task.timeStarted && task.timeEnded);

  // Function to calculate efficiency
  const calculateEfficiency = (task) => {
    const scheduledStart = new Date(task.startTime);
    const scheduledEnd = new Date(task.endTime);
    const actualStart = new Date(task.timeStarted);
    const actualEnd = new Date(task.timeEnded);

    const scheduledDuration = (scheduledEnd.getTime() - scheduledStart.getTime()) / (1000 * 60); // in minutes
    const workedDuration = (actualEnd.getTime() - actualStart.getTime()) / (1000 * 60); // in minutes

    if (scheduledDuration <= 0) return 0; // avoid division by 0
    const clampedWorkedDuration = Math.min(workedDuration, scheduledDuration); // you can't work more than scheduled time

    const efficiency = (clampedWorkedDuration / scheduledDuration) * 100;

    return Math.min(efficiency, 100).toFixed(1); // max 100%, 1 decimal place
  };

  const overallEfficiency = completedTasks.length > 0
  ? (
      completedTasks.reduce((sum, task) => {
        const scheduledStart = new Date(task.startTime!);
        const scheduledEnd = new Date(task.endTime!);
        const actualStart = new Date(task.timeStarted!);
        const actualEnd = new Date(task.timeEnded!);

        const scheduledDuration = (scheduledEnd.getTime() - scheduledStart.getTime()) / 60000; // minutes
        const workedDuration = (actualEnd.getTime() - actualStart.getTime()) / 60000;

        const clampedWorked = Math.min(workedDuration, scheduledDuration);
        const efficiency = (clampedWorked / scheduledDuration) * 100;

        return sum + Math.min(efficiency, 100);
      }, 0) / completedTasks.length
    ).toFixed(1)
  : null;


  return (
    <View className="flex-1 p-6 bg-white">
      <Text className="text-2xl font-bold mb-6">Task Efficiency</Text>
  
      {completedTasks.length === 0 ? (
        <Text className="text-center text-gray-500">No completed tasks yet.</Text>
      ) : (
        <View>
          <FlatList
            data={completedTasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const isExpanded = expandedTaskId === item.id;
  
              return (
                <TouchableOpacity
                  className="p-4 mb-4 bg-gray-100 rounded-lg"
                  onPress={() =>
                    setExpandedTaskId(isExpanded ? null : item.id)
                  }
                >
                  {/* Task Title */}
                  <Text className="text-lg font-bold mb-2">{item.taskDesc}</Text>
  
                  {/* Always show Efficiency */}
                  <Text className="text-md font-bold mb-2">
                    Efficiency: {calculateEfficiency(item)}%
                  </Text>
  
                  {/* Expandable section */}
                  {isExpanded && (
                    <>
                      <Text className="text-sm">
                        Scheduled Start:{" "}
                        {new Date(item.startTime!).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Text>
                      <Text className="text-sm">
                        Scheduled End:{" "}
                        {new Date(item.endTime!).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Text>
  
                      <Text className="text-sm mt-2">
                        Actual Start:{" "}
                        {item.timeStarted
                          ? new Date(item.timeStarted).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Not started yet"}
                      </Text>
                      <Text className="text-sm">
                        Actual End:{" "}
                        {item.timeEnded
                          ? new Date(item.timeEnded).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Not ended yet"}
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              );
            }}
          />
  
          {overallEfficiency !== null && (
            <View className="mt-6 items-center">
              <Text className="text-xl font-bold">Overall Efficiency</Text>
              <Text className="text-3xl font-extrabold text-green-600 mt-2">
                {overallEfficiency}%
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
  
}
