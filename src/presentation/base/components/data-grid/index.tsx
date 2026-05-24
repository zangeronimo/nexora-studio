import { ReactNode } from 'react';

import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

import { Table, TableColumn } from '../table';
import { Pagination } from '../pagination';

import * as styles from './styles.module.scss';

type DataGridSorting = {
  sortBy?: string;
  sortDesc?: boolean;
};

type DataGridPagination = {
  page: number;
  pageSize: number;
  total: number;
};

type Props<T> = {
  data: T[];

  columns: (TableColumn<T> & {
    orderBy?: string;
  })[];

  sorting?: DataGridSorting;

  pagination?: DataGridPagination;

  loading?: boolean;
  emptyMessage?: string;

  rowKey?: (row: T, index: number) => string;

  toolbar?: ReactNode;

  onPageChange?: (page: number) => void;

  onPageSizeChange?: (pageSize: number) => void;

  onSortingChange?: (params: { sortBy?: string; sortDesc?: boolean }) => void;
};

export function DataGrid<T>({
  data,
  columns,
  sorting,
  pagination,
  loading,
  emptyMessage,
  rowKey,
  toolbar,
  onPageChange,
  onPageSizeChange,
  onSortingChange,
}: Props<T>) {
  function handleSort(columnSortBy?: string) {
    if (!columnSortBy || !onSortingChange) {
      return;
    }

    const currentSortBy = sorting?.sortBy;

    const currentSortDesc = sorting?.sortDesc ?? false;

    const sameColumn = currentSortBy === columnSortBy;

    onSortingChange({
      sortBy: columnSortBy,

      sortDesc: sameColumn ? !currentSortDesc : false,
    });
  }

  function handlePageChange(nextPage: number) {
    onPageChange?.(nextPage);
  }

  function handlePageSizeChange(nextPageSize: number) {
    onPageSizeChange?.(nextPageSize);
  }

  const enhancedColumns = columns.map((col) => {
    const isSortable = !!col.orderBy;

    const isActive = sorting?.sortBy === col.orderBy;

    return {
      ...col,

      header: (
        <button
          type="button"
          className={styles.sortButton}
          onClick={() => handleSort(col.orderBy)}
          disabled={!isSortable}
        >
          <span>{col.header}</span>

          {isSortable && (
            <span className={styles.icon}>
              {!isActive && <ArrowUpDown size={14} />}

              {isActive && !sorting?.sortDesc && <ArrowUp size={14} />}

              {isActive && sorting?.sortDesc && <ArrowDown size={14} />}
            </span>
          )}
        </button>
      ),
    };
  });

  return (
    <div className={styles.wrapper}>
      {toolbar && <div className={styles.toolbar}>{toolbar}</div>}

      <Table
        columns={enhancedColumns}
        rows={data}
        loading={loading}
        emptyMessage={emptyMessage}
        rowKey={rowKey}
      />

      {pagination && (
        <Pagination
          page={pagination.page}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
}
