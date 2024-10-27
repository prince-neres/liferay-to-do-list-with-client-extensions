import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { baseURL } from "../Start";

const FormContainer = styled.form`
	align-items: flex-end;
	background-color: #fff;
	border-radius: 5px;
	box-shadow: 0px 0px 5px #ccc;
	display: flex;
	flex-wrap: wrap;
	gap: 60px;
	max-width: 900px;
	padding: 20px;
	width: 100%;
	justify-content: space-between;
`;

const InputArea = styled.div`
	display: flex;
	flex-direction: column;
	width: 200px;
`;

const Input = styled.input`
	border-radius: 5px;
	border: 1px solid #bbb;
	height: 40px;
	padding: 0 10px;
`;

const Select = styled.select`
	background-color: white;
	border-radius: 5px;
	border: 1px solid #bbb;
	height: 40px;
	padding: 0 10px;
`;

const Label = styled.label``;

const Button = styled.button`
	background-color: #2c73d2;
	border-radius: 5px;
	border: none;
	color: white;
	cursor: pointer;
	height: 42px;
	padding: 10px;
`;

const Form = ({ getTasks, onEdit, setOnEdit }) => {
	const ref = useRef();

	useEffect(() => {
		if (onEdit) {
			const task = ref.current;

			task.task.value = onEdit.task;
			task.id.value = onEdit.id;
		}
	}, [onEdit]);

	const handleSubmit = async (item) => {
		item.preventDefault();

		const task = ref.current;

		if (!task.taskName.value) {
			return toast.warn("Fill up all fields");
		}

		await axios
			.post(
				baseURL,
				{
					taskName: {
						key: task.taskName.value,
					},
					taskPriority: {
						key: task.taskPriority.value,
					},
					taskStatus: {
						key: task.taskStatus.value,
					},
				},
				{
					headers: { Authorization: "Basic " + btoa("test@liferay.com:test") },
				},
			)
			.catch(({ data }) => toast.success("Task created"));

		task.taskName.value = "";
		task.taskPriority.value = "";
		task.taskStatus.value = "";

		setOnEdit(null);
		getTasks();
	};

	return (
		<FormContainer ref={ref} onSubmit={handleSubmit}>
			<InputArea>
				<Label>Name</Label>
				<Input name="taskName" />
			</InputArea>

			<InputArea>
				<Label>Priority</Label>
				<Select name="taskPriority">
					<option key="1" value="low">
						Low
					</option>
					<option key="2" value="medium">
						Medium
					</option>
					<option key="3" value="high">
						High
					</option>
				</Select>
			</InputArea>

			<InputArea>
				<Label>Status</Label>
				<Select name="taskStatus">
					<option key="1" value="pending">
						Pending
					</option>
					<option key="2" value="inProgress">
						In Progress
					</option>
					<option key="3" value="completed">
						Completed
					</option>
				</Select>
			</InputArea>

			<Button type="submit">Save</Button>
		</FormContainer>
	);
};

export default Form;