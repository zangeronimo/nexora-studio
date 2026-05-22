import { ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

import { Table, TableColumn } from '../table';
import { Pagination } from '../pagination';

import * as styles from './styles.module.scss';

type DataGridSorting = {
  orderBy?: string;
  desc?: boolean;
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
}: Props<T>) {
  const [, setSearchParams] = useSearchParams();

  function handleSort(columnOrderBy?: string) {
    if (!columnOrderBy) return;

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      const currentOrderBy = sorting?.orderBy;
      const currentDesc = sorting?.desc ?? false;

      const sameColumn = currentOrderBy === columnOrderBy;

      params.set('orderBy', columnOrderBy);

      params.set('desc', sameColumn ? String(!currentDesc) : 'false');

      return params;
    });
  }

  function handlePageChange(nextPage: number) {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.set('page', String(nextPage));

      return params;
    });
  }

  function handlePageSizeChange(nextPageSize: number) {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.set('pageSize', String(nextPageSize));

      params.set('page', '1');

      return params;
    });
  }

  const enhancedColumns = columns.map((col) => {
    const isSortable = !!col.orderBy;

    const isActive = sorting?.orderBy === col.orderBy;

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

              {isActive && !sorting?.desc && <ArrowUp size={14} />}

              {isActive && sorting?.desc && <ArrowDown size={14} />}
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
