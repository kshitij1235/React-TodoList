interface TaskModel{
    [x: string]: string | number | Date;
    t_id: number;
    task: string;
    current_data: Date;
    end_data: Date;
    status : boolean;
}

export default TaskModel;