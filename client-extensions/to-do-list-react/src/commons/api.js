import axios from "axios";
import { toast } from "react-toastify";
import { userEmail, userPassword } from "./utils";

export const baseURL = "http://localhost:8080/o/c/tasks/";

const getAuthHeaders = () => ({
  Authorization: "Basic " + btoa(`${userEmail()}:${userPassword()}`),
});

export const getTasks = async () => {
  try {
    const res = await axios.get(baseURL, {
      headers: getAuthHeaders(),
    });
    return res.data.items;
  } catch (error) {
    toast.error("Error loading tasks");
    return [];
  }
};

export const addTask = async (task) => {
  try {
    const res = await axios.post(
      baseURL,
      {
        taskName: task.taskName,
        taskDescription: task.taskDescription,
        taskPriority: {
          key: task.taskPriority,
        },
      },
      {
        headers: getAuthHeaders(),
      }
    );
    return res.data;
  } catch (error) {
    toast.error("Error creating task");
    return false;
  }
};

export const updateTask = async (task) => {
  try {
    const res = await axios.put(
      task.actions.update.href,
      {
        taskName: task.taskName,
        taskDescription: task.taskDescription,
        taskPriority: task.taskPriority.key,
      },
      {
        headers: getAuthHeaders(),
      }
    );
    return res.data;
  } catch (error) {
    toast.error("Error updating task");
    return false;
  }
};

export const deleteTask = async (id) => {
  try {
    await axios.delete(baseURL + id, {
      headers: getAuthHeaders(),
    });
    return true;
  } catch (error) {
    toast.error("Error deleting task");
    return false;
  }
};
