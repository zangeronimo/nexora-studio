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
import { Tag } from '@domain/culinary/entities/tag';
import { PaginatedResponse } from '@application/base/response/paginated-response';
import { AuthorizationProvider } from '@application/base/security/contracts/authorizaton-provider';
import { ITagService } from '@application/culinary/contracts/tag-service';
import { GetTagsRequest } from '@application/culinary/requests/tag-request';

import * as styles from '../styles.module.scss';

type Props = {
  tagService: ITagService;
  authorizationProvider: AuthorizationProvider;
};

type TagFilter = {
  name?: string;
  status?: string;
};

export function useTagList({ tagService, authorizationProvider }: Props) {
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
  } = useListSearchParams<TagFilter>();

  const [response, setResponse] = useState<PaginatedResponse<Tag> | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

  const request = useMemo(() => {
    return new GetTagsRequest(
      page.value(),
      pageSize.value(),
      sortBy.value() ?? 'Name',
      sortDesc.value(),
      filters.name ?? '',
      filters.status ? Number(filters.status) : null,
    );
  }, [page, pageSize, sortBy, sortDesc, filters]);

  const load = async () => {
    try {
      setLoading(true);

      const result = await tagService.getAll(request);

      setResponse(result);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [request]);

  const handleCreate = () => {
    navigate('/culinary/tags/create');
  };

  const handleEdit = (tag: Tag) => {
    navigate(`/culinary/tags/edit/${tag.id}`);
  };

  const handleOpenDelete = (tag: Tag) => {
    setSelectedTag(tag);
  };

  const handleCloseDelete = () => {
    setSelectedTag(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedTag) {
      return;
    }

    try {
      setLoading(true);

      await tagService.delete(selectedTag.id);

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

  const columns: TableColumn<Tag>[] = useMemo(
    () => [
      {
        key: 'name',
        header: t('culinary.tag.datagrid.name'),
        orderBy: 'Name',
      },
      {
        key: 'status',
        header: t('culinary.tag.datagrid.status'),
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
        header: t('culinary.tag.datagrid.created_at'),
        width: '180px',
        render: (c) => new Date(c.createdAt).toLocaleDateString(),
      },
      {
        key: 'actions',
        header: '',
        width: '120px',
        align: 'right',
        render: (tag) => (
          <DataGridActions>
            <DataGridAction
              type="edit"
              label={t('common.button.edit')}
              visible={authorizationProvider.hasPermission(
                'culinary.tag.update',
              )}
              onClick={() => handleEdit(tag)}
            />

            <DataGridAction
              type="delete"
              label={t('common.button.delete')}
              visible={authorizationProvider.hasPermission(
                'culinary.tag.delete',
              )}
              onClick={() => handleOpenDelete(tag)}
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

    selectedTag,

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
          t('culinary.tag.fields.status'),
        ),
      ],
    },
  };
}
