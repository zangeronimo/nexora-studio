import { Page } from '@application/base/query/page';
import { PageSize } from '@application/base/query/page-size';
import { SortBy } from '@application/base/query/sort-by';
import { SortDesc } from '@application/base/query/sort-desc';
import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const RESERVED_PARAMS = new Set(['page', 'pageSize', 'sortBy', 'sortDesc']);

type Filters = Record<string, string | undefined>;

type SetSortingParams = {
  sortBy?: string;
  sortDesc?: boolean;
};

type UseListSearchParamsResult<TFilters extends Filters> = {
  page: Page;

  pageSize: PageSize;

  sortBy: SortBy;

  sortDesc: SortDesc;

  filters: TFilters;

  setPage(page: number): void;

  setPageSize(pageSize: number): void;

  setSorting(params: SetSortingParams): void;

  setFilters(filters: TFilters): void;

  clearFilters(): void;
};

export const useListSearchParams = <
  TFilters extends Filters = Filters,
>(): UseListSearchParamsResult<TFilters> => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = useMemo(() => {
    return Page.create(searchParams.get('page'));
  }, [searchParams]);

  const pageSize = useMemo(() => {
    return PageSize.create(searchParams.get('pageSize'));
  }, [searchParams]);

  const sortBy = useMemo(() => {
    return SortBy.create(searchParams.get('sortBy'));
  }, [searchParams]);

  const sortDesc = useMemo(() => {
    return SortDesc.create(searchParams.get('sortDesc'));
  }, [searchParams]);

  const filters = useMemo<TFilters>(() => {
    const entries = Array.from(searchParams.entries());

    return entries.reduce<Filters>((accumulator, [key, value]) => {
      if (RESERVED_PARAMS.has(key)) {
        return accumulator;
      }

      accumulator[key] = value;

      return accumulator;
    }, {}) as TFilters;
  }, [searchParams]);

  const updateSearchParams = useCallback(
    (updater: (params: URLSearchParams) => void) => {
      const nextParams = new URLSearchParams(searchParams);

      updater(nextParams);

      Array.from(nextParams.entries()).forEach(([key, value]) => {
        if (value === '' || value === 'undefined' || value === 'null') {
          nextParams.delete(key);
        }
      });

      setSearchParams(nextParams);
    },
    [searchParams, setSearchParams],
  );

  const setPage = useCallback(
    (value: number) => {
      const nextPage = Page.create(value);

      updateSearchParams((params) => {
        if (nextPage.value() <= 1) {
          params.delete('page');
          return;
        }

        params.set('page', nextPage.toString());
      });
    },
    [updateSearchParams],
  );

  const setPageSize = useCallback(
    (value: number) => {
      const nextPageSize = PageSize.create(value);

      updateSearchParams((params) => {
        params.delete('page');

        params.set('pageSize', nextPageSize.toString());
      });
    },
    [updateSearchParams],
  );

  const setSorting = useCallback(
    ({ sortBy, sortDesc }: SetSortingParams) => {
      const nextSortBy = SortBy.create(sortBy);

      const nextSortDesc = SortDesc.create(sortDesc);

      updateSearchParams((params) => {
        params.delete('page');

        if (nextSortBy.isDefined()) {
          params.set('sortBy', nextSortBy.toString());
        } else {
          params.delete('sortBy');
        }

        if (nextSortDesc.value()) {
          params.set('sortDesc', 'true');
        } else {
          params.delete('sortDesc');
        }
      });
    },
    [updateSearchParams],
  );

  const setFilters = useCallback(
    (nextFilters: TFilters) => {
      updateSearchParams((params) => {
        params.delete('page');

        Object.keys(filters).forEach((key) => {
          params.delete(key);
        });

        Object.entries(nextFilters).forEach(([key, value]) => {
          if (typeof value !== 'string') {
            return;
          }

          const normalizedValue = value.trim();

          if (!normalizedValue) {
            return;
          }

          params.set(key, normalizedValue);
        });
      });
    },
    [filters, updateSearchParams],
  );

  const clearFilters = useCallback(() => {
    updateSearchParams((params) => {
      params.delete('page');

      Object.keys(filters).forEach((key) => {
        params.delete(key);
      });
    });
  }, [filters, updateSearchParams]);

  return {
    page,

    pageSize,

    sortBy,

    sortDesc,

    filters,

    setPage,

    setPageSize,

    setSorting,

    setFilters,

    clearFilters,
  };
};
