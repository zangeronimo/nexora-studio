import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Page } from '../value-objects/page';
import { PageSize } from '../value-objects/page-size';
import { SortBy } from '../value-objects/sort-by';
import { SortDesc } from '../value-objects/sort-desc';

const RESERVED_PARAMS = ['page', 'pageSize', 'sortBy', 'sortDesc'] as const;

type Filters = Record<string, string>;

type SetSortingParams = {
  sortBy?: string;
  sortDesc?: boolean;
};

type UseListSearchParamsResult = {
  page: Page;
  pageSize: PageSize;

  sortBy: SortBy;
  sortDesc: SortDesc;

  filters: Filters;

  setPage(page: number): void;

  setPageSize(pageSize: number): void;

  setSorting(params: SetSortingParams): void;

  setFilters(filters: Filters): void;

  clearFilters(): void;
};

export const useListSearchParams = (): UseListSearchParamsResult => {
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

  const filters = useMemo<Filters>(() => {
    const entries = Array.from(searchParams.entries());

    return entries.reduce<Filters>((accumulator, [key, value]) => {
      if (RESERVED_PARAMS.includes(key as (typeof RESERVED_PARAMS)[number])) {
        return accumulator;
      }

      accumulator[key] = value;

      return accumulator;
    }, {});
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
        params.set('page', nextPage.toString());
      });
    },
    [updateSearchParams],
  );

  const setPageSize = useCallback(
    (value: number) => {
      const nextPageSize = PageSize.create(value);

      updateSearchParams((params) => {
        params.set('page', '1');

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
        params.set('page', '1');

        if (nextSortBy.isDefined()) {
          params.set('sortBy', nextSortBy.toString());
        } else {
          params.delete('sortBy');
        }

        params.set('sortDesc', nextSortDesc.toString());
      });
    },
    [updateSearchParams],
  );

  const setFilters = useCallback(
    (nextFilters: Filters) => {
      updateSearchParams((params) => {
        params.set('page', '1');

        Object.keys(filters).forEach((key) => {
          params.delete(key);
        });

        Object.entries(nextFilters).forEach(([key, value]) => {
          if (!value?.trim()) {
            return;
          }

          params.set(key, value);
        });
      });
    },
    [filters, updateSearchParams],
  );

  const clearFilters = useCallback(() => {
    updateSearchParams((params) => {
      params.set('page', '1');

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
