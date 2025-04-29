import { createContext, useContext, useState } from "react";

export type Task = {
  id: string,
  taskDesc: string,
  date: string,
  startTime: string | null,
  endTime: string | null,
  timeStarted: string | null,
  timeEnded: string | null,
};

export type TaskContextType = {
  tasks: Task[],
  addTask: (task:Task) => void,
  startTask: (id:string) => void,
  endTask: (id:string) => void,
  deleteTask: (id:string) => void,
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Provider component
export const TaskContextProvider = ({ children }:{ children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "task-1",
      taskDesc: "Go to Gym",
      date: "2025-04-28",
      startTime: "14:00",
      endTime: "15:00",
      timeStarted: null,
      timeEnded: null,
    },

    {
      id: "task-2",
      taskDesc: "Finish React Native Course",
      date: "2025-04-28",
      startTime: "15:30",
      endTime: "17:30",
      timeStarted: null,
      timeEnded: null,
    },

    {
      id: "task-3",
      taskDesc: "Buy Groceries",
      date: "2025-04-29",
      startTime: "18:00",
      endTime: "18:30",
      timeStarted: null,
      timeEnded: null,
    },
  ]);

  const addTask = (task: Task) => {
    setTasks(prevTasks => [...prevTasks, task]);
  };

  const startTask = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? {...task, timeStarted: new Date().toISOString()}
          : task
      )
    );
  }

  const endTask = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
        ? {...task, timeEnded: new Date().toISOString()}
        : task
      )
    );
  }

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };
  

  return (
    <TaskContext.Provider value={{ tasks, addTask, startTask, endTask, deleteTask }}>
      { children }
    </TaskContext.Provider>
  );
};


// creating custom hook
export const useTasks = () => {
  const context = useContext(TaskContext);
  if(!context)
    throw new Error('useTasks must be used within a TaskProvider');
  return context;
};