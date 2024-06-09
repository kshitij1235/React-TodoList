import axios from "axios";
import { useState, useEffect } from "react";
import PriorityModel from "../Interfaces/Priority";
import GetPriority from "../GetterSetter/GetPriority";
import SubmitTask from "../GetterSetter/SubmitTask";

function AddButton(props: { color: any }) {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        task: '',
        endDate: '',
        priority: ''
    });
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        SubmitTask(formData);
    };

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
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Task</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleFormControlInput1"
                                        placeholder="Do some work.."
                                        value={formData.task}
                                        onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">End Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="exampleFormControlInput1"
                                        placeholder="End date"
                                        value={formData.endDate}
                                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="prioritySelect" className="form-label">Priority</label>
                                    <select
                                        className="form-select"
                                        id="prioritySelect"
                                        value={formData.priority}
                                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                    >
                                        <option value="">Select priority</option>
                                        {GetPriority().map((item) => (
                                            <option key={item.p_id} value={item.p_id}>{item.priority}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary">Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default AddButton;
