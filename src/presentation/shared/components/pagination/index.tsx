import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Select } from '../select';

import * as styles from './styles.module.scss';
import { PageSize } from '@application/query/value-objects/page-size';
import { useTranslation } from '@presentation/i18n/hooks/use-translation';

type Props = {
  page: number;
  pageSize: number;
  total: number;

  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
};

export function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}: Props) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const { t } = useTranslation();

  function buildPages(): (number | 'ellipsis')[] {
    if (totalPages <= 7) {
      return Array.from(
        {
          length: totalPages,
        },
        (_, index) => index + 1,
      );
    }

    // início
    if (page <= 3) {
      return [1, 2, 3, 'ellipsis', totalPages];
    }

    // fim
    if (page >= totalPages - 2) {
      return [1, 'ellipsis', totalPages - 2, totalPages - 1, totalPages];
    }

    // meio
    return [1, 'ellipsis', page - 1, page, page + 1, 'ellipsis', totalPages];
  }

  const pages = buildPages();

  return (
    <div className={styles.container}>
      <div className={styles.info}>{total} records</div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.navButton}
          disabled={page <= 1}
          onClick={() => onPageChange?.(page - 1)}
        >
          <ChevronLeft size={16} />
        </button>

        <div className={styles.pages}>
          {pages.map((item, index) => {
            if (item === 'ellipsis') {
              return (
                <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                  ...
                </span>
              );
            }

            return (
              <button
                key={item}
                type="button"
                className={[
                  styles.pageButton,
                  item === page ? styles.active : '',
                ].join(' ')}
                onClick={() => onPageChange?.(item)}
              >
                {item}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className={styles.navButton}
          disabled={page >= totalPages}
          onClick={() => onPageChange?.(page + 1)}
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className={styles.pageSize}>
        <Select
          value={String(pageSize)}
          placeholder={t('select_empty')}
          onChange={(value) => onPageSizeChange?.(Number(value))}
          options={PageSize.allowedValues().map((value) => ({
            label: String(value),
            value: String(value),
          }))}
        />
      </div>
    </div>
  );
}
