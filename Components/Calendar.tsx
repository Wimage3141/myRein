import { View, Text } from 'react-native'
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

  return (
    <View>
      <Text>Calendar</Text>
    </View>
  )
}

export default Calendar