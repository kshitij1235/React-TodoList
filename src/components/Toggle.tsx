import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import TaskModel from "../Interfaces/Task";

function Toggle(props: { priority: any, color: any, label: any }) {
    const [data, setData] = useState<TaskModel[]>([]);
    const [isCollapsed, setIsCollapsed] = useState(true); // State to track collapse status

    useEffect(() => {
        axios
            .get<TaskModel[]>(`http://localhost:3001/api/tasks/${props.priority}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            });
    }, [props.priority]);

    return (
        <Fragment>
            <div className="accordion py-2" id={`accordionPanelsStayOpenExample-${props.priority}`}>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button"
                            style={{ backgroundColor: isCollapsed ? props.color : 'initial' }} // Apply color only when collapsed
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#panelsStayOpen-collapse${props.priority}`}
                            aria-expanded="true"
                            aria-controls={`panelsStayOpen-collapse${props.priority}`}
                            onClick={() => setIsCollapsed(!isCollapsed)}
                        >
                            {props.label}
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
                                                />
                                                <span className="flex-grow-1">{item.task}</span>
                                                <span className="px-3">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary"
                                                        style={{ backgroundColor: props.color , color: '#000000'}} 
                                                    >
                                                        {new Date(item.current_date).toLocaleDateString()}
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
                            </ul>
                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                <button type="button"  style={{ backgroundColor: props.color , color: '#000000'}} className="btn btn-primary w-100 bg-yellow">
                                    Add
                                </button>
                            </li>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Toggle;
