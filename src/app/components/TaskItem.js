//TaskItem.js
"use client";
import { useState } from "react";
import useTaskStore from "../../store/taskStore";
import RecurrencePreview from "./RecurrencePreview";
import RecurrencePicker from "./RecurrencePicker";
import { getNextRecurrenceDates } from "../../utils/recurrencePreview";

export default function TaskItem({ task }) {
  const deleteTask = useTaskStore((s) => s.deleteTask);
  const updateTask = useTaskStore((s) => s.updateTask);

  const [editing, setEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const nextDate =
    editedTask.recurrence?.frequency &&
    getNextRecurrenceDates(
      editedTask.recurrence,
      1,
      new Date(editedTask.recurrence?.startDate || new Date())
    )[0];

  const handleSave = () => {
    updateTask(editedTask);
    setEditing(false);
  };

  return (
    <div className="border p-3 mb-2 rounded shadow-sm bg-white">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {editing ? (
            <>
              <input
                className="border p-1 rounded w-full mb-1 bg-black"
                value={editedTask.title}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, title: e.target.value })
                }
              />
              <input
                className="border p-1 rounded w-full mb-1 bg-black" 
                value={editedTask.description}
                onChange={(e) =>
                  setEditedTask({
                    ...editedTask,
                    description: e.target.value,
                  })
                }
              />

              <RecurrencePicker
                rule={editedTask.recurrence}
                onChange={(rule) =>
                  setEditedTask({ ...editedTask, recurrence: rule })
                }
              />

              <div className="mt-2 flex gap-2">
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="text-gray-500 text-sm"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h3 className="font-semibold text-gray-600">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>

              {nextDate && (
                <p className="text-sm text-green-600">
                  Next Date: {nextDate.toDateString()}
                </p>
              )}

              {task.recurrence?.frequency && (
                <div className="mt-2">
                  <p className="text-xs text-blue-600">
                    Repeats: {task.recurrence.frequency} every{" "}
                    {task.recurrence.interval}{" "}
                    {task.recurrence.frequency === "daily"
                      ? "day(s)"
                      : task.recurrence.frequency === "weekly"
                      ? "week(s)"
                      : task.recurrence.frequency === "monthly"
                      ? "month(s)"
                      : "year(s)"}
                  </p>
                  {task.recurrence.startDate && (
                    <p className="text-xs text-gray-500">
                      Start: {new Date(task.recurrence.startDate).toDateString()}
                    </p>
                  )}
                  {task.recurrence.endDate && (
                    <p className="text-xs text-gray-500">
                      End: {new Date(task.recurrence.endDate).toDateString()}
                    </p>
                  )}
                  <RecurrencePreview rule={task.recurrence} />
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex flex-col items-end">
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="text-blue-500 hover:text-blue-700 text-sm mb-1"
            >
              ✎ Edit
            </button>
          )}
          <button
            onClick={() => deleteTask(task.id)}
            className="text-red-500 hover:text-red-700 text-lg"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
