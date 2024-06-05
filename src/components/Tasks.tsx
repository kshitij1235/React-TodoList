import React, { useEffect, useState } from "react";
import Toggle from "./Toggle";

const TaskView: React.FC = () => {


  return (
    <div className="container mx-auto px-4 py-3">
      <h1 className="text-center">Tasks</h1>

      <Toggle priority={1} color={"yellow"} label={"Default"} />
      <Toggle priority={2} color={"yellow"} label={"Low"} />
      <Toggle priority={3} color={"yellow"} label={"High"} />
      <Toggle priority={4} color={"yellow"} label={"Imeddiate"} />



    </div>

  );
};

export default TaskView;
