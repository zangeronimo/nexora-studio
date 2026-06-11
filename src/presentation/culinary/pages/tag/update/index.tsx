import { Card } from '@presentation/base/components/card';
import { DataGridActions } from '@presentation/base/components/data-grid/actions';
import { Input } from '@presentation/base/components/input';
import { Select } from '@presentation/base/components/select';
import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';
import { Page } from '@presentation/base/shell/components/page';
import { useNavigate, useParams } from 'react-router-dom';

import * as styles from './styles.module.scss';
import { CancelButton } from '@presentation/base/components/action-buttons/cancel-button';
import { SaveButton } from '@presentation/base/components/action-buttons/save-button';
import { ITagService } from '@application/culinary/contracts/tag-service';
import { status } from '@domain/base/enums/status';
import { useTagUpdateForm } from '../hooks/use-tag-update.form';
import { GroupItem } from '@presentation/base/components/group-item';
import { Group } from '@presentation/base/components/group';
import { Textarea } from '@presentation/base/components/textarea';

type Props = {
  tagService: ITagService;
};

export function CulinaryTagUpdatePage({ tagService }: Props) {
  const { id } = useParams();
  const {
    errors,
    hasError,
    isPristine,
    loading,
    request,
    handleFieldChange,
    handleSubmit,
  } = useTagUpdateForm({
    id,
    tagService,
  });
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Page title={t('culinary.tag.update.title')}>
      <Card description={t('culinary.tag.update.description')}>
        <div className={styles.container}>
          <div className={styles.form}>
            <Group>
              <GroupItem span={2}>
                <Input
                  label={t('culinary.tag.fields.name')}
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
                  label={t('culinary.tag.fields.description')}
                  maxLength={500}
                  value={request.description}
                  onChange={(e) => handleFieldChange('description', e)}
                />
              </GroupItem>
            </Group>
            <Group>
              <GroupItem span={3}>
                <Select
                  label={t('culinary.tag.fields.status')}
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
              onClick={() => navigate('/culinary/tags')}
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
