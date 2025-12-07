import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Task } from "../c-types/TaskType";
import { useAuth } from "./authContext";

const API_URL = "http://localhost:3000/api";

interface TasksContextType {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  addTask: (task: any) => Promise<void>;
  updateTask: (id: string, updates: any) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  markCompleted: (id: string) => Promise<void>;
  currentFilter: string;
  setCurrentFilter: (filter: string) => void;
  isLoading: boolean;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) throw new Error("useTasks must be used within TasksProvider");
  return context;
};

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const { user, token } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && token) {
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [user, token]);

  const fetchTasks = async () => {
    if (!token) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();
      console.log(data);
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = async (task: any) => {
    if (!token) throw new Error("Must be logged in");

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add task");
      }

      const newTask = await response.json();
      setTasks((prev) => [...prev, newTask]);
    } catch (error: any) {
      throw new Error(error.message || "Failed to add task");
    }
  };

  const updateTask = async (id: string, updates: any) => {
    if (!token) throw new Error("Must be logged in");

    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update task");
      }

      const updatedTask = await response.json();
      setTasks((prev) =>
        prev.map((task) => (task.taskId === id ? updatedTask : task))
      );
    } catch (error: any) {
      throw new Error(error.message || "Failed to update task");
    }
  };

  const deleteTask = async (id: string) => {
    if (!token) throw new Error("Must be logged in");

    try {
      const response = await fetch(`${API_URL}/tasks/${id}/delete`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete task");
      }
      await fetchTasks();
    } catch (error: any) {
      throw new Error(error.message || "Failed to delete task");
    }
  };

  const markCompleted = async (id: string) => {
    if (!token) throw new Error("Must be logged in");

    try {
      const response = await fetch(`${API_URL}/tasks/${id}/complete`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to mark complete");
      }

      const completedTask = await response.json();
      setTasks((prev) =>
        prev.map((task) => (task.taskId === id ? completedTask : task))
      );
    } catch (error: any) {
      throw new Error(error.message || "Failed to mark complete");
    }
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        fetchTasks,
        addTask,
        updateTask,
        deleteTask,
        markCompleted,
        currentFilter,
        setCurrentFilter,
        isLoading,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};