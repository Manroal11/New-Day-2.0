export function formatContentDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date to be confirmed";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatContentDateRange(start: string, end: string | null): string {
  const formattedStart = formatContentDate(start);
  if (!end || new Date(start).toDateString() === new Date(end).toDateString()) return formattedStart;
  return `${formattedStart} – ${formatContentDate(end)}`;
}
