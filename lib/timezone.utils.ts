/**
 * Timezone utility functions to handle consistent date operations
 * across client and server, accounting for user's local timezone
 */

/**
 * Get the start of today in the user's local timezone
 * Returns a Date object representing midnight (00:00:00) local time
 */
export function getLocalStartOfDay(date: Date = new Date()): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Get the end of today in the user's local timezone
 * Returns a Date object representing 23:59:59.999 local time
 */
export function getLocalEndOfDay(date: Date = new Date()): Date {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * Convert a local date to ISO string (YYYY-MM-DD) based on local timezone
 * This ensures consistent date keys across the app
 */
export function toLocalISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Check if two dates fall on the same day in the user's local timezone
 */
export function isSameLocalDay(date1: Date, date2: Date): boolean {
  return toLocalISODate(date1) === toLocalISODate(date2);
}

/**
 * Get the ISO date range for a time period in local timezone
 * Useful for queries
 */
export function getLocalDateRange(
  startDate: Date,
  endDate: Date
): { start: Date; end: Date } {
  return {
    start: getLocalStartOfDay(startDate),
    end: getLocalEndOfDay(endDate),
  };
}
