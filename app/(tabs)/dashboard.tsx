import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useTasks } from '../TaskContext';
import { useState } from 'react';

export default function Dashboard() {
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const { tasks } = useTasks();

  // only those with both start/end
  const completedTasks = tasks.filter(
    (t) => t.timeStarted && t.timeEnded
  );

  // your existing per-task function
  const calculateEfficiency = (task) => {
    const scheduledStart = new Date(task.startTime);
    const scheduledEnd = new Date(task.endTime);
    const actualStart = new Date(task.timeStarted);
    const actualEnd = new Date(task.timeEnded);

    const scheduledDuration =
      (scheduledEnd.getTime() - scheduledStart.getTime()) /
      (1000 * 60);
    const workedDuration =
      (actualEnd.getTime() - actualStart.getTime()) /
      (1000 * 60);

    if (scheduledDuration <= 0) return '0.0';    // avoid zero
    const clampedWorked = Math.min(workedDuration, scheduledDuration);
    const eff = (clampedWorked / scheduledDuration) * 100;
    return Math.min(eff, 100).toFixed(1);
  };

  // map to numbers and filter out anything that parsed NaN
  const efficiencies = completedTasks
    .map((t) => parseFloat(calculateEfficiency(t)))
    .filter((n) => !isNaN(n));

  // average those numbers
  const overallEfficiency =
    efficiencies.length > 0
      ? (efficiencies.reduce((a, b) => a + b, 0) / efficiencies.length).toFixed(1)
      : null;

  return (
    <View className="flex-1 p-6 bg-white">
      <Text className="text-2xl font-bold mb-6">Task Efficiency</Text>

      {completedTasks.length === 0 ? (
        <Text className="text-center text-gray-500">
          No completed tasks yet.
        </Text>
      ) : (
        <>
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
                  <Text className="text-lg font-bold mb-2">
                    {item.taskDesc}
                  </Text>
                  <Text className="text-md font-bold mb-2">
                    Efficiency: {calculateEfficiency(item)}%
                  </Text>

                  {isExpanded && (
                    <>
                      <Text className="text-sm">
                        Scheduled Start:{' '}
                        {new Date(item.startTime).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Text>
                      <Text className="text-sm">
                        Scheduled End:{' '}
                        {new Date(item.endTime).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Text>
                      <Text className="text-sm mt-2">
                        Actual Start:{' '}
                        {new Date(item.timeStarted).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Text>
                      <Text className="text-sm">
                        Actual End:{' '}
                        {new Date(item.timeEnded).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
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
        </>
      )}
    </View>
  );
}
