"use client";

import { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  DropResult,
  DragStart,
  DragUpdate,
} from "@hello-pangea/dnd";
import { tasks as initialTasks, TaskColumn } from "../constants/data";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import TaskCard from "./task-card";
import CubeWidget from "./cube-widget";
import { useTheme } from "@/contexts/theme-manager";

export const TaskBoard = () => {
  const [columns, setColumns] = useState<TaskColumn[]>([]);
  const [draggedTask, setDraggedTask] = useState<{
    id: string;
    sourceColumn: string;
    destinationColumn?: string;
  } | null>(null);

  const { theme } = useTheme();
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("taskBoardData");
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        setColumns(parsedTasks);
      } catch (error) {
        console.error("Error parsing saved tasks:", error);
        setColumns(initialTasks);
      }
    } else {
      setColumns(initialTasks);
    }
  }, []);

  // Save tasks to localStorage whenever columns change
  useEffect(() => {
    if (columns.length > 0) {
      localStorage.setItem("taskBoardData", JSON.stringify(columns));
    }
  }, [columns]);

  const onDragStart = (start: DragStart) => {
    const sourceColumn = columns.find(
      (col) => col.id.toString() === start.source.droppableId
    );
    if (sourceColumn) {
      setDraggedTask({
        id: start.draggableId,
        sourceColumn: sourceColumn.name,
      });
    }
  };

  const onDragUpdate = (update: DragUpdate) => {
    if (update.destination) {
      const destinationColumn = columns.find(
        (col) => col.id.toString() === update.destination?.droppableId
      );
      if (destinationColumn && draggedTask) {
        setDraggedTask({
          ...draggedTask,
          destinationColumn: destinationColumn.name,
        });
      }
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      setDraggedTask(null);
      return;
    }

    const { source, destination } = result;
    const updatedColumns = [...columns];

    const sourceCol = updatedColumns.find(
      (col) => col.id.toString() === source.droppableId
    );
    const destCol = updatedColumns.find(
      (col) => col.id.toString() === destination.droppableId
    );

    if (!sourceCol || !destCol) {
      setDraggedTask(null);
      return;
    }

    const [movedTask] = sourceCol.tasks.splice(source.index, 1);

    // If moving to "Done" column, update progress to 100%
    if (destCol.name === "Done") {
      movedTask.progress.completed = movedTask.progress.total;
    }

    destCol.tasks.splice(destination.index, 0, movedTask);

    setColumns(updatedColumns);
    setDraggedTask(null);
  };

  return (
    <div className="relative">
      <DragDropContext
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        <section
          className="grid grid-cols-3 gap-3.5 mt-5 pb-5"
          aria-label="Task board"
        >
          {columns.map((taskColumn) => (
            <Droppable
              key={taskColumn.id}
              droppableId={taskColumn.id.toString()}
            >
              {(provided) => (
                <article
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`px-4 pb-4 pt-5 rounded-[12px] border-2 border-dashed bg-white dark:bg-[#24262C] h-fit transition-all duration-300 ${
                    draggedTask?.destinationColumn === taskColumn.name &&
                    taskColumn.name === "Done"
                      ? "border-green-500/50 bg-green-50/30"
                      : "border-sidebar-bg/8 dark:border-none"
                  }`}
                >
                  {/* Column Header */}
                  <header className="flex items-center justify-between">
                    <h2 className="text-sidebar-bg/50 dark:text-white/50 text-sm font-semibold">
                      {taskColumn.name} ({taskColumn.tasks.length})
                    </h2>
                    <Button
                      variant="ghost"
                      className="text-sidebar-bg/50 dark:text-white font-semibold flex items-center gap-2"
                    >
                      <div className="w-[18px] h-[18px] rounded-full bg-sidebar-bg/8 dark:bg-white/8 flex items-center justify-center">
                        <Plus
                          size={12}
                          className="text-sidebar-bg/40 dark:text-white/40"
                        />
                      </div>
                      <span>Add view</span>
                    </Button>
                  </header>

                  {/* Task Cards */}
                  <div className="mt-[18px] flex flex-col gap-3.5 min-h-[200px]">
                    {taskColumn.tasks.map((task, index) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        index={index}
                        columnName={taskColumn.name}
                        draggedToDone={
                          draggedTask?.id === task.id.toString() &&
                          taskColumn.name === "Done"
                        }
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                </article>
              )}
            </Droppable>
          ))}
        </section>
      </DragDropContext>

      {/* Interactive 3D Cube Widget */}
      <CubeWidget draggedTask={draggedTask} isDark={isDark} />
    </div>
  );
};
