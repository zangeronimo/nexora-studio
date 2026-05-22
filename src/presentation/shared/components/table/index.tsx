import { ReactNode } from 'react';
import * as styles from './styles.module.scss';

export type TableColumn<T> = {
  key: keyof T | string;
  header: ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (row: T) => ReactNode;
};

type Props<T> = {
  columns: TableColumn<T>[];
  rows: T[];
  loading?: boolean;
  emptyMessage?: string;
  rowKey?: (row: T, index: number) => string;
  toolbar?: ReactNode;
};

export function Table<T>({
  columns,
  rows,
  loading = false,
  emptyMessage = 'No data found',
  rowKey,
  toolbar,
}: Props<T>) {
  if (loading) {
    return <div className={styles.state}>Loading...</div>;
  }

  return (
    <div className={styles.wrapper}>
      {toolbar && <div className={styles.toolbar}>{toolbar}</div>}

      <table className={styles.table}>
        <thead className={styles.head}>
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={[styles.th, styles[column.align ?? 'left']].join(
                  ' ',
                )}
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className={styles.table}>
          {!rows.length ? (
            <tr>
              <td colSpan={columns.length} className={styles.empty}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={rowKey?.(row, index) ?? index} className={styles.tr}>
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className={[styles.td, styles[column.align ?? 'left']].join(
                      ' ',
                    )}
                  >
                    {column.render
                      ? column.render(row)
                      : String(row[column.key as keyof T] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
