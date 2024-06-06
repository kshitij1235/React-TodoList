import { useEffect, useState } from "react";
import axios from "axios";
import TaskModel from "../Interfaces/Task";
import AddButton from "./AddTaskForm";
import UpdateStatus from "../helper/UpdateStatus";

function Toggle(props: { priority: any, color: any, label: any }) {
    const [data, setData] = useState<TaskModel[]>([]);
    const [isCollapsed, setIsCollapsed] = useState(true); // State to track collapse status

    useEffect(() => {
        fetchTasks();
    }, [props.priority]);

    const fetchTasks = () => {
        axios
            .get<TaskModel[]>(`http://localhost:3001/api/tasks/${props.priority}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            });
    };

    const handleStatusToggle = (taskId:any) => {
        UpdateStatus(taskId)
            .then(() => {
                setData(prevData =>
                    prevData.map(task =>
                        task.t_id === taskId ? { ...task, status: !task.status } : task
                    )
                );
            })
            .catch((error) => {
                console.error("There was an error updating the task status!", error);
            });
    };

    return (
        <div className="col">
            <div className="accordion py-2" id={`accordionPanelsStayOpenExample-${props.priority}`}>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button position-relative"
                            style={{ backgroundColor: isCollapsed ? props.color : 'initial' }} 
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#panelsStayOpen-collapse${props.priority}`}
                            aria-expanded="true"
                            aria-controls={`panelsStayOpen-collapse${props.priority}`}
                            onClick={() => setIsCollapsed(!isCollapsed)}
                        >
                            <span>{props.label}</span>
                            {data.length > 0 ? (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {data.length}
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                            ) : (
                                <p></p>
                            )}
                        </button>
                    </h2>
                    <div id={`panelsStayOpen-collapse${props.priority}`} className="accordion-collapse collapse show">
                        <div className="accordion-body">
                            <ul className="list-group">
                                {data.length > 0 ? (
                                    data.map((item, index) => (
                                        <li
                                            className="list-group-item d-flex justify-content-between align-items-center"
                                            key={item.t_id}
                                        >
                                            <label
                                                htmlFor={`task-${item.t_id}`}
                                                className="w-100 d-flex align-items-center"
                                            >
                                                <input
                                                    className="form-check-input me-2"
                                                    type="checkbox"
                                                    value=""
                                                    id={`task-${item.t_id}`}
                                                    checked={item.status}
                                                    onChange={() => handleStatusToggle(item.t_id)}
                                                />
                                                <span className="flex-grow-1">{item.task}</span>
                                                <span className="px-3">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary"
                                                        style={{ backgroundColor: props.color, color: '#000000' }} 
                                                    >
                                                        {new Date(item.current_data).toLocaleDateString()}
                                                    </button>
                                                </span>
                                            </label>
                                        </li>
                                    ))
                                ) : (
                                    <li className="list-group-item">
                                        <h3 className="text-center">No tasks here</h3>
                                    </li>
                                )}
                                <AddButton color={props.color}></AddButton>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Toggle;
