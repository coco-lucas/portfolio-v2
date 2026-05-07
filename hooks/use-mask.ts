import { MaskType } from "@/types/form";

export const maskPatterns: Record<MaskType, string> = {
  cpf: "999.999.999-99",
  cnpj: "99.999.999/9999-99",
  phone: "(99) 99999-9999",
  cep: "99999-999",
  date: "99/99/9999",
  currency: "R$ 999.999.999,99",
  cel: "(99) 99999-9999",
};

export const useMask = () => {
  const applyMask = (value: string, maskType: MaskType): string => {
    if (!value) return "";

    const cleanValue = value.replace(/\D/g, "");

    switch (maskType) {
      case "cpf":
        return cleanValue
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d{1,2})/, "$1-$2")
          .replace(/(-\d{2})\d+?$/, "$1");

      case "cnpj":
        return cleanValue
          .replace(/(\d{2})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1/$2")
          .replace(/(\d{4})(\d{1,2})/, "$1-$2")
          .replace(/(-\d{2})\d+?$/, "$1");

      case "phone":
      case "cel":
        if (cleanValue.length <= 10) {
          return cleanValue
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{4})(\d)/, "$1-$2")
            .replace(/(-\d{4})\d+?$/, "$1");
        }
        return cleanValue
          .replace(/(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{5})(\d)/, "$1-$2")
          .replace(/(-\d{4})\d+?$/, "$1");

      case "cep":
        return cleanValue
          .replace(/(\d{5})(\d)/, "$1-$2")
          .replace(/(-\d{3})\d+?$/, "$1");

      case "date":
        return cleanValue
          .replace(/(\d{2})(\d)/, "$1/$2")
          .replace(/(\d{2})(\d)/, "$1/$2")
          .replace(/(\d{4})\d+?$/, "$1");

      case "currency":
        if (!cleanValue) return "";
        const numberValue = parseInt(cleanValue) / 100;
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(numberValue);

      default:
        return value;
    }
  };

  const removeMask = (value: string, maskType?: MaskType): string => {
    if (!value) return "";

    if (maskType === "currency") {
      const cleanValue = value.replace(/\D/g, "");
      return cleanValue ? (parseInt(cleanValue) / 100).toString() : "";
    }

    return value.replace(/\D/g, "");
  };

  const getMaxLength = (maskType: MaskType): number => {
    switch (maskType) {
      case "cpf":
        return 14;
      case "cnpj":
        return 18;
      case "phone":
        return 15;
      case "cel":
        return 15;
      case "cep":
        return 9;
      case "date":
        return 10;
      case "currency":
        return 15;
      default:
        return 999;
    }
  };

  const validateMask = (value: string, maskType: MaskType): boolean => {
    const cleanValue = removeMask(value, maskType);

    switch (maskType) {
      case "cpf":
        return cleanValue.length === 11 && isValidCPF(cleanValue);
      case "cnpj":
        return cleanValue.length === 14 && isValidCNPJ(cleanValue);
      case "phone":
        return cleanValue.length >= 10 && cleanValue.length <= 11;
      case "cel":
        return cleanValue.length === 11;
      case "cep":
        return cleanValue.length === 8;
      case "date":
        return cleanValue.length === 8 && isValidDate(cleanValue);
      default:
        return true;
    }
  };

  return { applyMask, removeMask, getMaxLength, validateMask, maskPatterns };
};

// Validation helpers
const isValidCPF = (cpf: string): boolean => {
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let checkDigit = 11 - (sum % 11);
  if (checkDigit === 10 || checkDigit === 11) checkDigit = 0;
  if (checkDigit !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  checkDigit = 11 - (sum % 11);
  if (checkDigit === 10 || checkDigit === 11) checkDigit = 0;
  if (checkDigit !== parseInt(cpf.charAt(10))) return false;

  return true;
};

const isValidCNPJ = (cnpj: string): boolean => {
  if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnpj.charAt(i)) * weights1[i];
  }
  let checkDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (checkDigit !== parseInt(cnpj.charAt(12))) return false;

  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cnpj.charAt(i)) * weights2[i];
  }
  checkDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (checkDigit !== parseInt(cnpj.charAt(13))) return false;

  return true;
};

const isValidDate = (date: string): boolean => {
  if (date.length !== 8) return false;

  const day = parseInt(date.substring(0, 2));
  const month = parseInt(date.substring(2, 4));
  const year = parseInt(date.substring(4, 8));

  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  if (year < 1900 || year > new Date().getFullYear()) return false;

  const dateObj = new Date(year, month - 1, day);
  return (
    dateObj.getFullYear() === year &&
    dateObj.getMonth() === month - 1 &&
    dateObj.getDate() === day
  );
};
