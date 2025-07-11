import React, { useState } from "react";
import { addTask } from "../commons/api";
import { toast } from "react-toastify";

const Form = ({ tasks, priorities, setTasks }) => {
    const [formData, setFormData] = useState({
        taskName: "",
        taskDescription: "",
        taskPriority: "low",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.taskName ||
            !formData.taskDescription ||
            !formData.taskPriority
        ) {
            return toast.warn("Fill up all fields");
        }

        const createdTask = await addTask(formData);

        if (createdTask) {
            toast.success("Task created");
            setTasks([...tasks, createdTask]);
            clearFields();
        }
    };

    const clearFields = () => {
        setFormData({
            taskName: "",
            taskDescription: "",
            taskPriority: "low",
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-wrap items-start justify-between max-w-4xl w-full pt-5 px-5 bg-white rounded-lg gap-6"
        >
            <div className="flex flex-col w-48">
                <label className="mb-1">
                    {Liferay.Language.get("name")}
                </label>
                <input
                    name="taskName"
                    value={formData.taskName}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg h-10 px-2"
                />
            </div>

            <div className="flex flex-col w-48">
                <label className="mb-1">
                    {Liferay.Language.get("description")}
                </label>
                <textarea
                    name="taskDescription"
                    value={formData.taskDescription}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg h-10 px-2"
                />
            </div>

            <div className="flex flex-col w-48">
                <label className="mb-1">
                    {Liferay.Language.get("priority")}
                </label>
                <select
                    name="taskPriority"
                    value={formData.taskPriority}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg h-10 px-2 bg-white"
                >
                    {priorities.map((priority) => (
                        <option value={priority.key}>{priority.name}</option>
                    ))}
                </select>
            </div>

            <div className="flex mt-4">
                <button
                    type="submit"
                    className="bg-green-600 text-white rounded-lg h-10 px-4 hover:bg-green-700 font-bold"
                >
                    {Liferay.Language.get("add")}
                </button>
            </div>
        </form>
    );
};

export default Form;
