import { View, Text, Button, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Task } from '../types/types';

const Calendar = () => {
  // addTask()
  // startTask()
  // endTask()
  const currDate = new Date().toISOString();
  let timeStarted = null;
  let timeEnded = null;
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "task-1",
      taskDesc: "go to gym",
      date: currDate,
      startTime: "14:00",
      endTime: "15:00",
      timeStarted: null,
      timeEnded: null,
    },
    {
      id: "task-2",
      taskDesc: "complete react native course",
      date: currDate,
      startTime: "15:30",
      endTime: "17:30",
      timeStarted: null,
      timeEnded: null,
    }
  ]);
  
  
  const addTask = (id: string, taskDesc:string, date: string, startTime: string, endTime: string) => {
    const newTask:Task = {
      id: id,
      taskDesc: taskDesc,
      date: date,
      startTime: startTime,
      endTime: endTime,
      timeStarted: null,
      timeEnded: null,
    }
    setTasks(prevTasks => [ ...prevTasks, newTask ]);
  }

  const startTask = (id:string) => {
    setTasks(prevTask => prevTask.map(task => 
      task.id === id
      ? { ...task, timeStarted: new Date().toISOString() }
      : task
    ));
  }

  const endTask = (id:string) => {
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === id
      ? { ...task, timeEnded: new Date().toISOString() }
      : task
    ));
  }

  const renderTask = ({ item }: { item:Task }) => (
    <View>
      <Text>{item.taskDesc}</Text>
      <Text>Scheduled: {item.startTime} -> {item.endTime}</Text>
      <Text>Started at: {item.timeStarted || "Not started yet"}</Text>
      <Text>Ended at: {item.endTime || "Not ended yet"}</Text>

      {item.timeStarted && (
        <Button title='START' onPress={() => startTask(item.id)} />
      )}

      {item.timeEnded && (
        <Button title='END' onPress={() => endTask(item.id)} />
      )}
    </View>
  )

  return (
    <View>
      <Text>Calendar Task</Text>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderTask}
      />
    </View>
  )
}

export default Calendar