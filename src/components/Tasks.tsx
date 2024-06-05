import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskModel from "../Interfaces/Task";

const TaskView: React.FC = () => {
  const [data, setData] = useState<TaskModel[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get<TaskModel[]>("http://localhost:3001/api/data")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-3">
      <h1 className="text-center">Tasks</h1>
      <div className="accordion" id="accordionPanelsStayOpenExample">
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
        Default
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
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
                <button type="button" className="btn btn-primary">
                  {new Date(item.current_date).toLocaleDateString()}
                </button>
                </span>
              </label>
            </li>
          ))
        ) : (
          <h3 className="text-center">No tasks here</h3>
        )}
      </ul>
      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
    <button type="button" className="btn btn-primary w-100">
        Add
    </button>
</li>

      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
        Imediate
      </button>
    </h2>
    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
      <div className="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>


  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
        hard
      </button>
    </h2>
    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
      <div className="accordion-body">
        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
</div>




      
    </div>
  );
};

export default TaskView;
