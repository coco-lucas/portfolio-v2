type DateStyle = "short" | "medium" | "long" | "full";
type TimeStyle = "short" | "medium" | "long" | "full";

export function formatDateString(
  dateString: string | null | undefined,
  dateStyle: DateStyle | null = "medium",
  timeStyle?: TimeStyle,
  separator: string = " | ",
): string {
  if (!dateString) return "-";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "-";

  if (dateStyle === null) {
    if (!timeStyle) return "-";
    return new Intl.DateTimeFormat("pt-BR", { timeStyle }).format(date);
  }

  const datePart = new Intl.DateTimeFormat("pt-BR", { dateStyle }).format(date);
  if (!timeStyle) return datePart;

  const timePart = new Intl.DateTimeFormat("pt-BR", { timeStyle }).format(date);
  return `${datePart} ${separator} ${timePart}`;
}

// Most used in calendar
export function fmtDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
