import { toast } from "sonner";

export const toastSuccess = (msg: string) =>
  toast.success(msg, {
    style: {
      backgroundColor: "var(--success)",
      color: "var(--foreground-dark)",
    },
  });

export const toastError = (msg: string) =>
  toast.error(msg, {
    style: {
      backgroundColor: "var(--destructive)",
      color: "var(--foreground-dark)",
    },
  });

export const toastWarning = (msg: string) =>
  toast.warning(msg, {
    style: {
      backgroundColor: "var(--warning)",
      color: "var(--foreground-light)",
    },
  });

type ToastPromiseMessages<T> = {
  loading: string;
  success: string | ((data: T) => string);
  error: string | ((error: unknown) => string);
};

export const toastPromise = <T>(
  promise: Promise<T> | (() => Promise<T>),
  messages: ToastPromiseMessages<T>,
) => {
  toast.promise(promise, {
    loading: messages.loading,
    success: (data: T) => ({
      message:
        typeof messages.success === "function"
          ? messages.success(data)
          : messages.success,
      style: {
        backgroundColor: "var(--success)",
        color: "var(--foreground-dark)",
      },
    }),
    error: (err: unknown) => ({
      message:
        typeof messages.error === "function"
          ? messages.error(err)
          : messages.error,
      style: {
        backgroundColor: "var(--destructive)",
        color: "var(--foreground-dark)",
      },
    }),
  });

  return typeof promise === "function" ? promise() : promise;
};

// Exemplo de uso;
//   import { toastSuccess, toastError, toastWarning, toastPromise } from '@/utils/toast';

// <Button onClick={() => toastSuccess('Tudo certo!')}>Sucesso</Button>
// <Button onClick={() => toastError('Algo deu errado!')}>Erro</Button>
// <Button onClick={() => toastWarning('Cuidado!')}>Aviso</Button>
// <Button
//   onClick={() =>
//     toastPromise(saveData(), {
//       loading: 'Salvando...',
//       success: 'Salvo com sucesso!',
//       error: (e) => `Falhou: ${String(e)}`,
//     })
//   }
// >
//   Salvar
// </Button>
