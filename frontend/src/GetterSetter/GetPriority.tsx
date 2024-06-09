import { useEffect, useState } from "react";
import PriorityModel from "../Interfaces/Priority";
import axios from "axios";

function GetPriority(){
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

  return data;
}

export default GetPriority;