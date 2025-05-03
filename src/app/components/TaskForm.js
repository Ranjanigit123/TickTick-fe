// TaskForm.js
"use client";
import { useState } from "react";
import useTaskStore from "../../store/taskStore";
import RecurrencePicker from "./RecurrencePicker";
import RecurrencePreview from "./RecurrencePreview";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [recurrenceRule, setRecurrenceRule] = useState({
    frequency: "",
    interval: 1,
    startDate: "",
    endDate: ""
  });

  const addTask = useTaskStore((s) => s.addTask);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ title, description, recurrence: recurrenceRule });

    // Reset fields
    setTitle("");
    setDescription("");
    setRecurrenceRule({
      frequency: "",
      interval: 1,
      startDate: "",
      endDate: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4 text-[#0a2540]">
        🎯 TO - DO List ( TickTick Clone )
      </h1>

      <input
        type="text"
        className="border p-2 mr-2 rounded w-full mb-2 bg-black text-white"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="text"
        className="border p-2 mr-2 rounded w-full mb-2 bg-black text-white"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* This is the only place recurrence UI should exist */}
      <RecurrencePicker rule={recurrenceRule} onChange={setRecurrenceRule} />

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full mt-2"
        type="submit"
      >
        Add Task
      </button>

      {/* Replace the list with the recurrence preview calendar */}
      {recurrenceRule.frequency && (
        <div className="mt-6">
          <RecurrencePreview rule={recurrenceRule} />
        </div>
      )}
    </form>
  );
}
