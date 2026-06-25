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
import { Recipe } from '@domain/culinary/entities/recipe';
import { PaginatedResponse } from '@application/base/response/paginated-response';
import { AuthorizationProvider } from '@application/base/security/contracts/authorizaton-provider';
import { IRecipeService } from '@application/culinary/contracts/recipe-service';
import { GetRecipesRequest } from '@application/culinary/requests/recipe-request';

import * as styles from '../styles.module.scss';
import { Button } from '@presentation/base/components/button';
import { FileJson } from 'lucide-react';

type Props = {
  recipeService: IRecipeService;
  authorizationProvider: AuthorizationProvider;
};

type RecipeFilter = {
  name?: string;
  status?: string;
};

export function useRecipeList({ recipeService, authorizationProvider }: Props) {
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
  } = useListSearchParams<RecipeFilter>();

  const [response, setResponse] = useState<PaginatedResponse<Recipe> | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const request = useMemo(() => {
    return new GetRecipesRequest(
      page.value(),
      pageSize.value(),
      sortBy.value() ?? 'Status',
      sortDesc.value(),
      filters.name ?? '',
      filters.status ? Number(filters.status) : null,
    );
  }, [page, pageSize, sortBy, sortDesc, filters]);

  const load = async () => {
    try {
      setLoading(true);

      const result = await recipeService.getAll(request);

      setResponse(result);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [request]);

  const handleCreate = () => {
    navigate('/culinary/recipes/create');
  };

  const handleEdit = (recipe: Recipe, importJson: boolean = false) => {
    let params = '';
    if (importJson) params = '?import=true';
    navigate(`/culinary/recipes/edit/${recipe.id}${params}`);
  };

  const handleOpenDelete = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseDelete = () => {
    setSelectedRecipe(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRecipe) {
      return;
    }

    try {
      setLoading(true);

      await recipeService.delete(selectedRecipe.id);

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

  const columns: TableColumn<Recipe>[] = useMemo(
    () => [
      {
        key: 'name',
        header: t('culinary.recipe.datagrid.name'),
        orderBy: 'Name',
      },
      {
        key: 'status',
        header: t('culinary.recipe.datagrid.status'),
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
        header: t('culinary.recipe.datagrid.created_at'),
        width: '180px',
        render: (c) => new Date(c.createdAt).toLocaleDateString(),
      },
      {
        key: 'actions',
        header: '',
        width: '120px',
        align: 'right',
        render: (recipe) => (
          <DataGridActions>
            <DataGridAction
              type="edit"
              label={t('common.button.edit')}
              visible={authorizationProvider.hasPermission(
                'culinary.recipe.update',
              )}
              onClick={() => handleEdit(recipe)}
            />

            {recipe.status === status.inactive && (
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => handleEdit(recipe, true)}
                disabled={
                  !authorizationProvider.hasPermission('culinary.recipe.update')
                }
                aria-label={t('culinary.recipe.buttons.importJson')}
                title={t('culinary.recipe.buttons.importJson')}
              >
                <FileJson size={16} />
              </Button>
            )}

            <DataGridAction
              type="delete"
              label={t('common.button.delete')}
              visible={authorizationProvider.hasPermission(
                'culinary.recipe.delete',
              )}
              onClick={() => handleOpenDelete(recipe)}
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

    selectedRecipe,

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
          t('culinary.recipe.fields.status'),
        ),
      ],
    },
  };
}
