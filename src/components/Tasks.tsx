import React, { useEffect, useState } from "react";
import Toggle from "./Toggle";
import axios from "axios";
import PriorityModel from "../Interfaces/Priority";

const TaskView: React.FC = () => {
  const [data, setData] = useState<PriorityModel[]>([]);
  useEffect(() => {
    axios
      .get<PriorityModel[]>(`http://localhost:3001/api/priority`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);
  return (


    <div className="containe-fluid mx-auto px-4 py-3">
      <h1 className="text-center">Tasks</h1>

      <div className="row">
        {data.map((item) => (
          <div key={item.p_id} className="col-md-3">
            <Toggle priority={item.p_id} color={item.color} label={item.priority} />
          </div>
        ))}
      </div>

    </div>

  );
};

export default TaskView;



