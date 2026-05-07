import { useUrlParam } from "@/hooks/use-url-param";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface UsePaginationOptions {
  defaultPageSize?: number;
}

export function usePagination(options: UsePaginationOptions = {}) {
  const { defaultPageSize = 10 } = options;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [rawPage] = useUrlParam("page");
  const [rawPageSize] = useUrlParam("page_size");

  const currentPage = rawPage ? parseInt(rawPage, 10) : 1;
  const pageSize = rawPageSize ? parseInt(rawPageSize, 10) : defaultPageSize;

  // Sets both params in one router.replace to avoid a double navigation
  const updateURL = useCallback(
    (page: number, size: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      params.set("page_size", size.toString());
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const setCurrentPage = useCallback(
    (page: number) => updateURL(page, pageSize),
    [pageSize, updateURL],
  );

  const setPageSize = useCallback(
    (size: number) => updateURL(1, size),
    [updateURL],
  );

  return {
    currentPage,
    pageSize,
    setCurrentPage,
    setPageSize,
  };
}
