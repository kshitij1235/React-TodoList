import { useEffect, useState } from "react";
import axios from "axios";
import TaskModel from "../Interfaces/Task";
import AddButton from "./AddTaskForm";
import UpdateStatus from "../helper/UpdateStatus";
import DeleteTask from "../helper/DeleteTask";
import moment from "moment";
function Toggle(props: { priority: any; color: any; label: any }) {
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

  const handleStatusToggle = (taskId: any) => {
    UpdateStatus(taskId)
      .then(() => {
        setData((prevData) =>
          prevData.map((task) =>
            task.t_id === taskId ? { ...task, status: !task.status } : task
          )
        );
      })
      .catch((error) => {
        console.error("There was an error updating the task status!", error);
      });
  };

  const handleDeleteTask = async (taskId: any) => {
    await DeleteTask(taskId, fetchTasks);
  };

  return (
<div className="col">
  <div className="accordion py-2" id={`accordionPanelsStayOpenExample-${props.priority}`}>
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button position-relative"
          style={{ backgroundColor: isCollapsed ? props.color : "initial" }}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#panelsStayOpen-collapse${props.priority}`}
          aria-expanded="true"
          aria-controls={`panelsStayOpen-collapse${props.priority}`}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <span className="me-2">{props.label}</span>
          {data.length > 0 && (
            <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
              {data.length}
              <span className="visually-hidden">unread messages</span>
            </span>
          )}
        </button>
      </h2>
      <div className={`accordion-collapse collapse ${isCollapsed ? 'show' : ''}`} id={`panelsStayOpen-collapse${props.priority}`}>
        <div className="accordion-body">
          <ul className="list-group">
            {data.length > 0 ? (
              data.map((item) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={item.t_id}
                >
                  <div className="d-flex align-items-center flex-grow-1">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id={`task-${item.t_id}`}
                      checked={item.status}
                      onChange={() => handleStatusToggle(item.t_id)}
                    />
                    <span>{item.task}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="text-muted me-3">
                    {moment(item.current_data).format("MM/DD/YYYY")}
                    </span>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => handleDeleteTask(item.t_id)}
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="list-group-item">
                <h3 className="text-center">No tasks here</h3>
              </li>
            )}
            <AddButton color={props.color} />
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>



  );
}

export default Toggle;
