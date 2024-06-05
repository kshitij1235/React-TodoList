import React, { useState } from "react";

function AddTaskForm( show:any, onClose:any ) {
    const [taskName, setTaskName] = useState("");

    const handleSubmit = (e :any) => {
        e.preventDefault();
        // Handle form submission, e.g., submit the task data to the server
        // Then close the modal
        onClose();
    };

    return (
        <div className={`modal ${show ? "show" : ""}`} style={{ display: show ? "block" : "none" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Task</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="taskName" className="form-label">Task Name</label>
                                <input type="text" className="form-control" id="taskName" value={taskName} onChange={(e) => setTaskName(e.target.value)} required />
                            </div>
                            <button type="submit" className="btn btn-primary">Add Task</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTaskForm;
