import Toggle from "./Toggle";
import GetPriority from "../GetterSetter/GetPriority";

const TaskView: React.FC = () => {
  
  return (
    <div className="containe-fluid mx-auto px-4 py-3">
      <h1 className="text-center">TASKS</h1>

      <div className="row">
        {GetPriority().map((item) => (
          <div key={item.p_id} className="col-md-3">
            <Toggle
              priority={item.p_id}
              color={item.color}
              label={item.priority}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskView;
