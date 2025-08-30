/* eslint-disable @typescript-eslint/no-explicit-any */
import { Draggable } from "@hello-pangea/dnd";
import { Ellipsis, List } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  getDateBackgroundClasses,
  getDateBackgroundColor,
  getProgressBarClasses,
  getProgressBarColor,
} from "@/lib/utils";
import { ChatIcon } from "../icons/chat";
import { LinkIcon } from "../icons/link";

const calculateProgressPercentage = (
  completed: number,
  total: number
): number => (completed / total) * 100;

const renderAssignedUsers = (count: number) => {
  if (count === 0) return null;
  return (
    <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
      <Avatar>
        <AvatarImage src="/images/user-a.png" alt="User A" />
        <AvatarFallback>U1</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="/images/user-b.png" alt="User B" />
        <AvatarFallback>U2</AvatarFallback>
      </Avatar>
      {count > 2 && (
        <div className="w-[30px] h-[30px] rounded-full bg-white dark:bg-white/6 border-2 border-sidebar-bg/12 dark:border-white/12 flex items-center justify-center text-xs font-bold text-sidebar-bg dark:text-white z-10">
          +{count - 2}
        </div>
      )}
    </div>
  );
};

const renderMetadata = (comments: number, attachments: number) => (
  <div className="flex items-center gap-3">
    <div className="flex items-center gap-1 cursor-pointer">
      <ChatIcon />
      <p className="text-sidebar-bg/50 dark:text-white/50 text-sm font-semibold">{comments}</p>
    </div>
    <div className="flex items-center gap-1 cursor-pointer">
      <LinkIcon />
      <p className="text-sidebar-bg/50 dark:text-white/50 text-sm font-semibold">{attachments}</p>
    </div>
  </div>
);

interface TaskCardProps {
  task: any;
  index: number;
  columnName: string;
  draggedToDone?: boolean;
}

const TaskCard = ({
  task,
  index,
  columnName,
  draggedToDone = false,
}: TaskCardProps) => (
  <Draggable draggableId={task.id.toString()} index={index}>
    {(provided, snapshot) => (
      <article
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={`w-full h-fit rounded-[12px] border-2 p-5 bg-white dark:bg-[#292B31] transition-all duration-300 ${
          snapshot.isDragging
            ? "shadow-xl border-sidebar-bg/30 transform rotate-2 scale-105"
            : draggedToDone
            ? "border-green-500/50 shadow-lg"
            : "border-sidebar-bg/6 dark:border-white/6"
        }`}
      >
        <header className="flex items-center justify-between">
          <h3 className="text-sidebar-bg dark:text-white font-bold">{task.title}</h3>
          <Button
            variant="ghost"
            size="icon"
            className="w-[26px] h-[26px] rounded-full border-2 border-sidebar-bg/10 dark:border-white/10 bg-transparent text-sidebar-bg dark:text-white hover:bg-sidebar-bg dark:hover:bg-white hover:text-white dark:hover:text-black"
          >
            <Ellipsis />
          </Button>
        </header>

        <p className="text-sidebar-bg/50 dark:text-white/50 text-sm font-medium">
          {task.projectName}
        </p>

        <div className="mt-[22px] flex items-center justify-between">
          <div className="flex items-center gap-1">
            <List size={16} className="text-sidebar-bg/50 dark:text-white/50" />
            <span className="text-sm font-semibold text-sidebar-bg/50 dark:text-white/50">
              Progress
            </span>
          </div>
          <span className="text-sidebar-bg dark:text-white text-sm font-semibold">
            {task.progress.completed}/{task.progress.total}
          </span>
        </div>

        <div className="mt-2.5 w-full h-1 rounded-[2px] bg-sidebar-bg/8 dark:bg-white/10">
          <div
            className={`${getProgressBarClasses(
              draggedToDone
                ? "green"
                : getProgressBarColor(
                    task.progress.completed,
                    task.progress.total
                  )
            )} h-full rounded-[2px] transition-all duration-300`}
            style={{
              width: `${calculateProgressPercentage(
                draggedToDone ? task.progress.total : task.progress.completed,
                task.progress.total
              )}%`,
            }}
          />
        </div>

        <footer className="mt-5 flex items-center justify-between">
          <time
            className={`py-2 px-4 ${getDateBackgroundClasses(
              getDateBackgroundColor(columnName, task.id, task.title)
            )} rounded-[17px] text-sm font-semibold`}
          >
            {task.dueDate}
          </time>
          {task.assignedUsersCount > 0
            ? renderAssignedUsers(task.assignedUsersCount)
            : renderMetadata(task.commentsCount, task.attachmentsCount)}
        </footer>
      </article>
    )}
  </Draggable>
);

export default TaskCard;
