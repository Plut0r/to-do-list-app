import { TaskBoard } from "@/components/tasks/task-board";
import { TaskToolbar } from "@/components/tasks/task-toolbar";

export const Home = () => {
  return (
    <>
      <TaskToolbar />
      <TaskBoard />
    </>
  );
};
