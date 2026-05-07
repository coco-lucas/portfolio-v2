import { ColumnMetaTypes } from "@/types/tanstack-table";
import { formatCurrency } from "./formatters";
import { capitalize } from "./capitalize";

export const EMPTY_VALUE = "-";

export function valueOrFallback(
  value: unknown,
  type: ColumnMetaTypes = "general",
): string {
  if (value === null || value === undefined) return EMPTY_VALUE;

  const str = (
    typeof value === "number" ? String(value) : capitalize(String(value))
  ).trim();
  if (!str) return EMPTY_VALUE;

  if (type === "currency") {
    const num = parseFloat(str.replace(",", "."));
    return isNaN(num) ? str : formatCurrency(num);
  }
  if (type === "percent") return `${str}%`;
  return str;
}
