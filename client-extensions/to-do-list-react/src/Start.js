import GlobalStyle from "./styles/global";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import Form from "./components/Form";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
	width: 100%;
	max-width: 900px;
	margin-top: 20px;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	gap: 20px;
`;

export const baseURL = "http://localhost:8080/o/c/tasks/";

const Title = styled.h2`
	margin-top: 25px;
`;

function Start() {
	const [tasks, setTasks] = useState([]);
	const [onEdit, setOnEdit] = useState(null);

	const getTasks = async () => {
		try {
			const res = await axios.get(baseURL, {
				headers: { Authorization: "Basic " + btoa("test@liferay.com:test") },
			});
			console.log(res);
			setTasks(res.data.items);
		} catch (error) {
			toast.error(error);
		}
	};

	useEffect(() => {
		getTasks();
	}, [setTasks]);

	return (
		<div className="App">
			<Container>
				<Title>My Tasks</Title>
				<Form onEdit={onEdit} setOnEdit={setOnEdit} getTasks={getTasks} />
				<Grid setOnEdit={setOnEdit} tasks={tasks} setTasks={setTasks} />
			</Container>
			<ToastContainer autoClose={3000} position={"top-center"} />
		</div>
	);
}

export default Start;