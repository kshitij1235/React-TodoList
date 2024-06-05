import React, { useEffect, useState } from "react";
import Toggle from "./Toggle";

const TaskView: React.FC = () => {


  return (
    <div className="container mx-auto px-4 py-3">
      <h1 className="text-center">Tasks</h1>

      <Toggle priority={1} color={"#D2E3C9"} label={"default"} />
      <Toggle priority={2} color={"#B5DDE0"} label={"low"} />
      <Toggle priority={3} color={"#F6D5B5"} label={"High"} />
      <Toggle priority={4} color={"#FBD4CE"} label={"Imeddiate"} />



    </div>

  );
};

export default TaskView;
