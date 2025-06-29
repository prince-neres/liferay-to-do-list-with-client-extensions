import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Form from "./components/Form";
import Grid from "./components/Grid";
import { getTasks } from "./commons/api";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    };

    fetchTasks();
  }, []);

  return (
    <div className="App">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-5">
        <h2 className="text-2xl font-bold">My Tasks</h2>
        <Form tasks={tasks} setTasks={setTasks} />
        <Grid tasks={tasks} setTasks={setTasks} />
      </div>
      <ToastContainer autoClose={3000} position="top-center" />
    </div>
  );
}

export default App;
