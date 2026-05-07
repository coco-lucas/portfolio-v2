import "@tanstack/react-table";

export type ColumnMetaTypes = "general" | "currency" | "percent";

declare module "@tanstack/react-table" {
  // TData and TValue must match TanStack's original signature
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    type?: ColumnMetaTypes;
  }
}
