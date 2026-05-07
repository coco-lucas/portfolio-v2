import { isAxiosError } from "axios";

export const onError = (
  error: unknown,
): {
  variant: "destructive";
  description: string;
} => {
  if (isAxiosError(error)) {
    return {
      variant: "destructive",
      description:
        error.response?.data.message ||
        error.response?.data.error ||
        "Ocorreu um erro inesperado",
    };
  }

  return {
    variant: "destructive",
    description: "Ocorreu um erro inesperado",
  };
};
