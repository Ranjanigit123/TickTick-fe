//RecurrencePicker.js
import React from "react";

export default function RecurrencePicker({ rule, onChange }) {
  const handleChange = (key, value) => {
    onChange({ ...rule, [key]: value });
  };

  return (
    <div className="grid gap-2 mb-2">
      <label className="text-sm font-medium text-gray-700">
        Frequency
        <select
          value={rule.frequency}
          onChange={(e) => handleChange("frequency", e.target.value)}
          className="border p-2 rounded w-full bg-white"
        >
          <option value="">None</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </label>

      <label className="text-sm font-medium text-gray-700">
        Interval
        <input
          type="number"
          min="1"
          value={rule.interval || 1}
          onChange={(e) => handleChange("interval", parseInt(e.target.value))}
          className="border p-2 rounded w-full"
        />
      </label>

      <label className="text-sm font-medium text-gray-700">
        Start Date
        <input
          type="date"
          value={rule.startDate || ""}
          onChange={(e) => handleChange("startDate", e.target.value)}
          className="border p-2 rounded w-full bg-white text-gray-800"
        />
      </label>

      <label className="text-sm font-medium text-gray-700">
        End Date
        <input
          type="date"
          value={rule.endDate || ""}
          onChange={(e) => handleChange("endDate", e.target.value)}
          className="border p-2 rounded w-full bg-white text-gray-800"
        />
      </label>
    </div>
  );
}
