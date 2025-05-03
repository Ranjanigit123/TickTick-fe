//recurrencePreview.js
import { addDays, isBefore, setMonth, setYear, addMonths, addYears } from "date-fns";

export function getNextRecurrenceDates(rule, count = 5, startDate = new Date()) {
  const occurrences = [];
  let current = new Date(rule.startDate);

  // Check if the start date is before the end date
  const endDate = new Date(rule.endDate);
  if (isBefore(current, endDate)) {
  for (let i = 0; i < count; i++) {
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
    // Stop if we've reached the end date
    if (isBefore(current, endDate)) {
        occurrences.push(new Date(current));
      } else {
        break;
      }
    }
  }

  return occurrences;
}