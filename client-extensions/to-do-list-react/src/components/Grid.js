import axios from "axios";
import { toast } from "react-toastify";
import { baseURL } from "../Start";
import styled from "styled-components";

const Table = styled.table`
	width: 100%;
	background-color: #fff;
	padding: 20px;
	box-shadow: 0px 0px 5px #ccc;
	border-radius: 5px;
	max-width: 900px;
	margin: 20px auto;
	word-break: break-all;
	border-collapse: separate;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
	text-align: start;
	border-bottom: inset;
	padding-bottom: 5px;

	@media (max-width: 500px) {
		${(props) => props.onlyWeb && "display: none"}
	}
`;

export const Td = styled.td`
	padding-top: 15px;
	text-align: ${(props) => (props.alignCenter ? "center" : "start")};
	width: ${(props) => (props.width ? props.width : "auto")};

	@media (max-width: 500px) {
		${(props) => props.onlyWeb && "display: none"}
	}
`;

const Grid = ({ tasks, setTasks, setOnEdit }) => {
	const handleEdit = (item) => {
		setOnEdit(item);
	};

	const handleDelete = async (id) => {
		axios
			.delete(baseURL + id, {
				headers: { Authorization: "Basic " + btoa("test@liferay.com:test") },
			})
			.then(({ data }) => {
				const newArray = tasks.filter((exam) => exam.id !== id);

				setTasks(newArray);
			})
			.catch(({ data }) => toast.error(data));

		setOnEdit(null);
	};

	return (
		<Table>
			<Thead>
				<Tr>
					<Th>Name</Th>
					<Th>Priority</Th>
					<Th>Status</Th>
				</Tr>
			</Thead>
			<Tbody>
				{tasks.map((task) => (
					<Tr key={task.id}>
						<Td width="20%">{task.taskName}</Td>
						<Td width="20%">{task.taskPriority.name}</Td>
						<Td width="20%">{task.taskStatus.name}</Td>
					</Tr>
				))}
			</Tbody>
		</Table>
	);
};

export default Grid;