import { valueOrFallback } from "@/utils/value-or-fallback";
import { CellContext } from "@tanstack/react-table";

//Formats the cell of a react-table
//
//Usage example:
//{
//  ...
//  meta: { type: 'general'}
//  cell: TypedCell
//}
export function TypedCell<T>({ getValue, column }: CellContext<T, unknown>) {
  return (
    <span className="text-nowrap">
      {valueOrFallback(getValue(), column.columnDef.meta?.type)}
    </span>
  );
}
