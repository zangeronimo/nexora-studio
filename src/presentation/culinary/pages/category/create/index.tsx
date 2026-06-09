import { Card } from '@presentation/base/components/card';
import { DataGridActions } from '@presentation/base/components/data-grid/actions';
import { Input } from '@presentation/base/components/input';
import { Select } from '@presentation/base/components/select';
import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';
import { Page } from '@presentation/base/shell/components/page';
import { useNavigate } from 'react-router-dom';

import * as styles from './styles.module.scss';
import { CancelButton } from '@presentation/base/components/action-buttons/cancel-button';
import { SaveButton } from '@presentation/base/components/action-buttons/save-button';
import { ICategoryService } from '@application/culinary/contracts/category-service';
import { status } from '@domain/base/enums/status';
import { useCategoryCreateForm } from '../hooks/use-category-create.form';
import { Textarea } from '@presentation/base/components/textarea';
import { GroupItem } from '@presentation/base/components/group-item';
import { Group } from '@presentation/base/components/group';

type Props = {
  categoryService: ICategoryService;
};

export function CulinaryCategoryCreatePage({ categoryService }: Props) {
  const {
    errors,
    hasError,
    isPristine,
    loading,
    request,
    handleFieldChange,
    handleSubmit,
  } = useCategoryCreateForm({
    categoryService,
  });
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Page title={t('culinary.category.create.title')}>
      <Card description={t('culinary.category.create.description')}>
        <div className={styles.container}>
          <div className={styles.form}>
            <Group>
              <GroupItem>
                <Input
                  label={t('culinary.category.fields.name')}
                  maxLength={150}
                  value={request.name}
                  error={errors.name}
                  onChange={(e) => handleFieldChange('name', e)}
                />
              </GroupItem>
            </Group>

            <Group>
              <GroupItem>
                <Textarea
                  label={t('culinary.category.fields.description')}
                  maxLength={500}
                  value={request.description}
                  onChange={(e) => handleFieldChange('description', e)}
                />
              </GroupItem>
            </Group>
            <Group>
              <GroupItem span={2}>
                <Input
                  label={t('culinary.category.fields.metaTitle')}
                  maxLength={70}
                  value={request.metaTitle}
                  onChange={(e) => handleFieldChange('metaTitle', e)}
                />
              </GroupItem>

              <GroupItem span={2}>
                <Input
                  label={t('culinary.category.fields.canonicalUrl')}
                  maxLength={500}
                  value={request.canonicalUrl}
                  onChange={(e) => handleFieldChange('canonicalUrl', e)}
                />
              </GroupItem>
            </Group>
            <Group>
              <GroupItem>
                <Textarea
                  label={t('culinary.category.fields.metaDescription')}
                  maxLength={170}
                  value={request.metaDescription}
                  onChange={(e) => handleFieldChange('metaDescription', e)}
                />
              </GroupItem>
            </Group>
            <Group>
              <GroupItem span={1}>
                <Input
                  type="number"
                  label={t('culinary.category.fields.displayOrder')}
                  value={request.displayOrder}
                  onChange={(e) => handleFieldChange('displayOrder', e)}
                />
              </GroupItem>

              <GroupItem span={3}>
                <Select
                  label={t('culinary.category.fields.status')}
                  placeholder={t('common.select.empty')}
                  value={request.status}
                  error={errors.status}
                  onChange={(e) => handleFieldChange('status', e)}
                  options={[
                    {
                      label: t('common.status.active'),
                      value: status.active.toString(),
                    },
                    {
                      label: t('common.status.inactive'),
                      value: status.inactive.toString(),
                    },
                  ]}
                />
              </GroupItem>
            </Group>
          </div>
        </div>

        <div className={styles.actions}>
          <DataGridActions>
            <CancelButton
              title={t('common.button.cancel')}
              onClick={() => navigate('/culinary/categories')}
            />

            <SaveButton
              title={t('common.button.save')}
              disabled={hasError || isPristine || loading}
              onClick={handleSubmit}
            />
          </DataGridActions>
        </div>
      </Card>
    </Page>
  );
}
