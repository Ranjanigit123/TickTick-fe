// TaskList.js
"use client";
import { useEffect } from "react";
import useTaskStore from "../../store/taskStore";
import TaskItem from "./TaskItem";

function getReadableRecurrence(rule) {
  if (!rule || !rule.frequency) return "No recurrence";

  switch (rule.frequency) {
    case "daily":
      return `Every ${rule.interval} day(s)`;
    case "weekly":
      return `Every ${rule.interval} week(s)`;
    case "monthly":
      return `Every ${rule.interval} month(s)`;
    case "yearly":
      return `Every ${rule.interval} year(s)`;
    default:
      return "Custom recurrence";
  }
}

export default function TaskList() {
  const tasks = useTaskStore((s) => s.tasks);
  const fetchTasks = useTaskStore((s) => s.fetchTasks);

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      {tasks.length === 0 ? (
        <p className="text-gray-400">No tasks yet.</p>
      ) : (
        tasks.map((task) => {
          console.log("Task:", task); // Debugging task details
          return <TaskItem key={task.id} task={task} />;
        })
      )}
    </div>
  );
}