// src/app/components/RecurrencePreview.js
"use client";
import { useState, useEffect } from "react";
import { addDays, format, isSameDay, parseISO } from "date-fns";

export default function RecurrencePreview({ rule }) {
  const [dates, setDates] = useState([]);
  const today = new Date();

  useEffect(() => {
    const generated = generateRecurrenceDates(rule);
    setDates(generated);
  }, [rule]);

  function generateRecurrenceDates(rule) {
    const occurrences = [];
    const maxCount = 30;

    if (!rule || !rule.frequency) return occurrences;

    let current = rule.startDate ? parseISO(rule.startDate) : today;
    const endDate = rule.endDate ? parseISO(rule.endDate) : null;

    for (let i = 0; i < maxCount; i++) {
      if (endDate && current > endDate) break;

      occurrences.push(new Date(current));

      switch (rule.frequency) {
        case "daily":
          current = addDays(current, rule.interval || 1);
          break;
        case "weekly":
          current = addDays(current, 7 * (rule.interval || 1));
          break;
        case "monthly":
          current.setMonth(current.getMonth() + (rule.interval || 1));
          break;
        case "yearly":
          current.setFullYear(current.getFullYear() + (rule.interval || 1));
          break;
        default:
          break;
      }
    }

    return occurrences;
  }

  return (
    <div className="p-4 border rounded shadow-md mt-4 bg-black max-w-sm">
      <h3 className="font-bold text-lg mb-2">Recurrence Preview</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 text-center text-sm">
        {dates.map((date, i) => (
          <div
            key={i}
            className="p-2 bg-blue-500 text-white font-semibold rounded"
          >
            {format(date, "MMM dd")}
          </div>
        ))}
      </div>
    </div>
  );
}