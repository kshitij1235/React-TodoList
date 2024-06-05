import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import TaskModel from "../Interfaces/Task";

import AddTaskForm from "./AddTaskForm";

function AddButton(props: { color: any }) {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return (
        <>
            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                <button
                    type="button"
                    onClick={openModal}
                    style={{ backgroundColor: props.color, color: '#000000' }}
                    className="btn btn-primary w-100 bg-yellow"
                >
                    Add
                </button>
            </li>

            <div className={`modal ${showModal ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Task</h5>
                            <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* Add your form here */}
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Task</label>
                                    <input type="task" className="form-control" id="exampleFormControlInput1" placeholder="Do some work.." />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Task</label>
                                    <input type="date" className="form-control" id="exampleFormControlInput1" placeholder="End date" />
                                </div>
                                priority
                                <select className="form-select" aria-label="Default select example" >
                                        <option selected>default</option>
                                          <option value="1">One</option>
                                          <option value="2">Two</option>
                                          <option value="3">Three</option>
                                </select>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


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
                            {data.length>0 ?
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {data.length}
                                <span className="visually-hidden">unread messages</span>
                            </span>
                             : <p></p>}
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
                                                        { new Date(item.createDate).toLocaleDateString()}
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

                                <AddButton color={props.color}/>
                            </ul>
                                
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Toggle;
