import axios from "axios";

const DeleteTask = async (taskId: any, fetchTasks: () => void) => {
    try {
        await axios.delete(`http://localhost:3001/api/delete/task/${taskId}`);
        fetchTasks();
    } catch (error) {
        console.error("There was an error deleting the task!", error);
    }
};

export default DeleteTask;
