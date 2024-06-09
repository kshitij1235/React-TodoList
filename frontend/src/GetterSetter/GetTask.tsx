import { useState } from "react";
import TaskModel from "../Interfaces/Task";
import axios from "axios";

function GetTaskBasedOnPriority(priority:any){
    const [data, setData] = useState<TaskModel[]>([]);
    axios
            .get<TaskModel[]>(`http://localhost:3001/api/tasks/${priority}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            });
    return data
}

export default GetTaskBasedOnPriority ;