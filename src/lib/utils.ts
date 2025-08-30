import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Color system types
export type ProgressBarColor = "orange" | "pink" | "green";
export type DateBackgroundColor = "gray" | "orange" | "pink";

// Generate a truly random color that changes on page reload
function getRandomColor(): DateBackgroundColor {
  const colors: DateBackgroundColor[] = ["gray", "orange", "pink"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

// Utility function to get progress bar color based on completion
export function getProgressBarColor(
  completed: number,
  total: number
): ProgressBarColor {
  // If task is completed (100%), return green
  if (completed === total) {
    return "green";
  }

  // If more than half is completed, return orange
  if (completed > total / 2) {
    return "orange";
  }

  // If half or less is completed, return pink
  return "pink";
}

// Utility function to get date background color with true randomization
export function getDateBackgroundColor(
  columnName: string,
  taskId: number,
  taskTitle: string
): DateBackgroundColor {
  // All done tasks have gray background
  if (columnName === "Done") {
    return "gray";
  }

  // For "To do" and "In progress" tasks, use truly random colors
  return getRandomColor();
}

// Helper function to get Tailwind CSS classes for colors
export function getProgressBarClasses(color: ProgressBarColor): string {
  switch (color) {
    case "orange":
      return "bg-orange";
    case "pink":
      return "bg-pink";
    case "green":
      return "bg-green";
    default:
      return "bg-green";
  }
}

export function getDateBackgroundClasses(color: DateBackgroundColor): string {
  switch (color) {
    case "orange":
      return "bg-orange/10 text-orange";
    case "pink":
      return "bg-pink/10 text-pink";
    case "gray":
      return "bg-gray/10 dark:bg-white/6 text-gray dark:text-dark-gray";
    default:
      return "bg-gray/10 dark:bg-white/6 text-gray dark:text-dark-gray";
  }
}
