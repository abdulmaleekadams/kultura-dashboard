import TasksList from '@/app/components/ui/Tasks/TasksList';
import { getTaskStages, getTasks } from '@/app/server/actions';

const TasksPage = async () => {
  const taskStages = await getTaskStages();
  const tasks = await getTasks();

  return (
    <div>
      <TasksList tasks={tasks} taskStages={taskStages} />
    </div>
  );
};

export default TasksPage;
