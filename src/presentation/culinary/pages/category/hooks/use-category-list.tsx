import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableColumn } from '@presentation/base/components/table';
import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';
import { useToast } from '@presentation/base/toast/hooks/use-toast';
import { useListSearchParams } from '@presentation/base/query-state/hooks/use-list-search-params';
import {
  selectFilter,
  textFilter,
} from '@presentation/base/query-state/list-filter/factories';
import { DataGridAction } from '@presentation/base/components/data-grid/actions/action';
import { DataGridActions } from '@presentation/base/components/data-grid/actions';
import { status } from '@domain/base/enums/status';
import { Category } from '@domain/culinary/entities/category';
import { PaginatedResponse } from '@application/base/response/paginated-response';
import { AuthorizationProvider } from '@application/base/security/contracts/authorizaton-provider';
import { ICategoryService } from '@application/culinary/contracts/category-service';
import { GetCategoriesRequest } from '@application/culinary/requests/category-request';

import * as styles from '../styles.module.scss';

type Props = {
  categoryService: ICategoryService;
  authorizationProvider: AuthorizationProvider;
};

type CategoryFilter = {
  name?: string;
  status?: string;
  parent?: string;
};

export function useCategoryList({
  categoryService,
  authorizationProvider,
}: Props) {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const toast = useToast();

  const {
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
  } = useListSearchParams<CategoryFilter>();

  const [response, setResponse] = useState<PaginatedResponse<Category> | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [parents, setParents] = useState<Category[]>([]);

  const request = useMemo(() => {
    return new GetCategoriesRequest(
      page.value(),
      pageSize.value(),
      sortBy.value() ?? 'Name',
      sortDesc.value(),
      filters.name ?? '',
      filters.status ? Number(filters.status) : null,
      filters.parent,
    );
  }, [page, pageSize, sortBy, sortDesc, filters]);

  const load = async () => {
    try {
      setLoading(true);

      const result = await categoryService.getAll(request);

      setResponse(result);
    } finally {
      setLoading(false);
    }
  };

  const getAllParents = async () => {
    try {
      setLoading(true);
      const result = await categoryService.getAllParents();

      setParents(result);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    getAllParents();
  }, [request]);

  const handleCreate = () => {
    navigate('/culinary/categories/create');
  };

  const handleEdit = (category: Category) => {
    navigate(`/culinary/categories/edit/${category.id}`);
  };

  const handleOpenDelete = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleCloseDelete = () => {
    setSelectedCategory(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCategory) {
      return;
    }

    try {
      setLoading(true);

      await categoryService.delete(selectedCategory.id);

      toast.success(t('common.toast.success.deleted'));

      const isLastItemOnPage = response?.items.length === 1 && page.value() > 1;

      handleCloseDelete();

      if (isLastItemOnPage) {
        setPage(page.value() - 1);
        return;
      }

      await load();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const columns: TableColumn<Category>[] = useMemo(
    () => [
      {
        key: 'name',
        header: t('culinary.category.datagrid.name'),
        orderBy: 'Name',
      },
      {
        key: 'status',
        header: t('culinary.category.datagrid.status'),
        orderBy: 'Status',
        width: '160px',
        render: (c) => (
          <span
            className={
              c.status === 1 ? styles.activeStatus : styles.disabledStatus
            }
          >
            {c.status === 1
              ? t('common.status.active')
              : t('common.status.inactive')}
          </span>
        ),
      },
      {
        key: 'createdAt',
        header: t('culinary.category.datagrid.created_at'),
        width: '180px',
        render: (c) => new Date(c.createdAt).toLocaleDateString(),
      },
      {
        key: 'actions',
        header: '',
        width: '120px',
        align: 'right',
        render: (category) => (
          <DataGridActions>
            <DataGridAction
              type="edit"
              label={t('common.button.edit')}
              visible={authorizationProvider.hasPermission(
                'culinary.category.update',
              )}
              onClick={() => handleEdit(category)}
            />

            <DataGridAction
              type="delete"
              label={t('common.button.delete')}
              visible={authorizationProvider.hasPermission(
                'culinary.category.delete',
              )}
              onClick={() => handleOpenDelete(category)}
            />
          </DataGridActions>
        ),
      },
    ],
    [t],
  );

  return {
    loading,
    response,
    columns,

    filters,

    page: page.value(),
    pageSize: pageSize.value(),

    sortBy: sortBy.value(),
    sortDesc: sortDesc.value(),

    selectedCategory,

    setPage,
    setPageSize,
    setSorting,

    setFilters,
    clearFilters,

    handleCreate,
    handleCloseDelete,
    handleConfirmDelete,

    toolbar: {
      fields: [
        textFilter('name', t('filter.placeholder.name')),
        selectFilter(
          'parent',
          parents.map((parent) => ({ value: parent.id, label: parent.name })),
          t('culinary.category.fields.parent'),
        ),
        selectFilter(
          'status',
          [
            {
              value: status.inactive.toString(),
              label: t('common.status.inactive'),
            },
            {
              value: status.active.toString(),
              label: t('common.status.active'),
            },
          ],
          t('culinary.category.fields.status'),
        ),
      ],
    },
  };
}
