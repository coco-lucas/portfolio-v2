export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function parseCurrency(value: string): number {
  if (typeof value !== "string") {
    return 0;
  }
  return parseFloat(value.replace(/[R$\s.]/g, "").replace(",", ".")) || 0;
}
