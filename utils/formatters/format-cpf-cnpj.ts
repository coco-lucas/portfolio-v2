export const formatCpfCnpj = (
  value: string,
  type: "cpf" | "cnpj" | "both" = "both",
) => {
  const cleanedValue = value.replace(/\D/g, "");

  if (type === "cpf" || (type === "both" && cleanedValue.length <= 11)) {
    // CPF
    return cleanedValue
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  }

  if (type === "cnpj" || (type === "both" && cleanedValue.length > 11)) {
    // CNPJ
    return cleanedValue
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }

  return value; // Retorna o valor original se não atender a nenhuma condição
};
