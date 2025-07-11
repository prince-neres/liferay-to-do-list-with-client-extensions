import { toast } from "react-toastify";

export const domain = "http://localhost:8080";
export const baseURL = domain + "/o/c/tasks/";

const getHeaders = () => {
    return {
        Accept: "application/json",
        "Accept-Language": Liferay.ThemeDisplay.getBCP47LanguageId(),
        "Content-Type": "application/json",
        "x-csrf-token": Liferay.authToken,
    };
};

export const getPriorityList = async () => {
    try {
        const res = await Liferay.Util.fetch(domain + "/o/headless-admin-list-type/v1.0/list-type-definitions/by-external-reference-code/TASK_PRIORITY");
        const data = await res.json();
        return data.listTypeEntries;
    } catch (error) {
        toast.error("Error loading task priorities");
        return [];
    }
};

export const getTasks = async () => {
    try {
        const res = await Liferay.Util.fetch(baseURL);
        const data = await res.json();
        return data.items;
    } catch (error) {
        toast.error("Error loading tasks");
        return [];
    }
};

export const addTask = async (task) => {
    try {
        const res = await Liferay.Util.fetch(baseURL, {
            body: JSON.stringify({
                taskName: task.taskName,
                taskDescription: task.taskDescription,
                taskPriority: {
                    key: task.taskPriority,
                },
            }),
            method: "POST",
            headers: getHeaders(),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        toast.error("Error creating task");
        return false;
    }
};

export const updateTask = async (task) => {
    try {
        const res = await Liferay.Util.fetch(task.actions.update.href, {
            body: JSON.stringify({
                taskName: task.taskName,
                taskDescription: task.taskDescription,
                taskPriority: task.taskPriority.key,
            }),
            method: "PUT",
            headers: getHeaders(),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        toast.error("Error updating task");
        return false;
    }
};

export const deleteTask = async (id) => {
    try {
        await Liferay.Util.fetch(baseURL + id, { method: "DELETE" });
        return true;
    } catch (error) {
        toast.error("Error deleting task");
        return false;
    }
};
