import { deleteTask, updateTask } from "../commons/api";
import { toast } from "react-toastify";
import { useState } from "react";

const Grid = ({ tasks, priorities, setTasks }) => {
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingData, setEditingData] = useState({
        taskName: "",
        taskDescription: "",
        taskPriority: "low",
    });

    const handleDelete = async (id) => {
        const deletedTask = await deleteTask(id);

        if (deletedTask) {
            const newArray = tasks.filter((task) => task.id !== id);
            setTasks(newArray);
            toast.success("Task deleted");
        }
    };

    const handleCheckTask = async (task) => {
        const updatedTask = { ...task, status: "completed" };
        const taskUpdated = await updateTask(updatedTask);

        if (taskUpdated) {
            const newTasks = tasks.filter((t) => t.id !== task.id);
            setTasks(newTasks);
            toast.success("Task marked as completed and removed");
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditSubmit = async (task) => {
        const updatedTask = {
            ...task,
            taskName: editingData.taskName,
            taskDescription: editingData.taskDescription,
            taskPriority: { key: editingData.taskPriority },
        };

        const taskUpdated = await updateTask(updatedTask);

        if (taskUpdated) {
            const updatedTasks = tasks.map((t) =>
                t.id === task.id ? { ...t, ...taskUpdated } : t
            );
            setTasks(updatedTasks);
            setEditingTaskId(null);
            toast.success("Task updated successfully");
        }
    };

    const handleEditClick = (task) => {
        setEditingTaskId(task.id);
        setEditingData({
            taskName: task.taskName,
            taskDescription: task.taskDescription,
            taskPriority: task.taskPriority.key,
        });
    };

    return (
        <div className="max-w-4xl w-full p-5 bg-white rounded-lg m-auto mt-5 overflow-x-auto">
            <table className="w-full table-fixed border-collapse">
                <thead>
                    <tr className="border-b">
                        <th className="text-left pb-1">Name</th>
                        <th className="text-left pb-1 w-3/6">
                            Description
                        </th>{" "}
                        <th className="text-left pb-1">Priority</th>
                        <th className="pb-1 text-center">Check</th>
                        <th className="pb-1 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id} className="border-t">
                            <td className="py-4 w-1/6 truncate">
                                {editingTaskId === task.id ? (
                                    <input
                                        name="taskName"
                                        value={editingData.taskName}
                                        onChange={handleEditChange}
                                        className="border border-gray-300 rounded-lg h-10 px-2"
                                    />
                                ) : (
                                    task.taskName
                                )}
                            </td>
                            <td className="py-4 w-3/6 truncate">
                                {editingTaskId === task.id ? (
                                    <textarea
                                        name="taskDescription"
                                        value={editingData.taskDescription}
                                        onChange={handleEditChange}
                                        className="border border-gray-300 rounded-lg px-2 h-20" // Adicionando textarea
                                    />
                                ) : (
                                    task.taskDescription
                                )}
                            </td>
                            <td className="py-4 w-1/6 truncate">
                                {editingTaskId === task.id ? (
                                    <select
                                        name="taskPriority"
                                        value={editingData.taskPriority}
                                        onChange={handleEditChange}
                                        className="border border-gray-300 rounded-lg h-10 px-2 bg-white"
                                    >
                                        {priorities.map((priority) => (
                                            <option value={priority.key}>
                                                {priority.name}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    task.taskPriority.name
                                )}
                            </td>
                            <td className="py-4 w-1/6 text-center">
                                <input
                                    type="checkbox"
                                    onChange={() => handleCheckTask(task)}
                                />
                            </td>
                            <td className="py-4 w-1/6 text-center">
                                {editingTaskId === task.id ? (
                                    <>
                                        <button
                                            onClick={() =>
                                                handleEditSubmit(task)
                                            }
                                            className="text-green-500 hover:text-green-700 font-bold"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() =>
                                                setEditingTaskId(null)
                                            }
                                            className="text-gray-500 hover:text-gray-700 font-bold ml-2"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() =>
                                                handleEditClick(task)
                                            }
                                            className="text-blue-500 hover:text-blue-700 font-bold"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(task.id)
                                            }
                                            className="text-red-500 hover:text-red-700 font-bold ml-2"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Grid;
