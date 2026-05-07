import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export function useUrlParam(key: string, defaultValue?: string) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const value = useMemo(
    () => searchParams.get(key) ?? defaultValue ?? null,
    [searchParams, key, defaultValue],
  );

  const setValue = useCallback(
    (newValue: string) => {
      const params = new URLSearchParams(window.location.search);
      params.set(key, newValue);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [key, pathname, router],
  );

  return [value, setValue] as const;
}
