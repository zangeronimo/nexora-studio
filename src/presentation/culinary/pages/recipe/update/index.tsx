import { Card } from '@presentation/base/components/card';
import { DataGridActions } from '@presentation/base/components/data-grid/actions';
import { Input } from '@presentation/base/components/input';
import { Select } from '@presentation/base/components/select';
import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';
import { Page } from '@presentation/base/shell/components/page';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import * as styles from './styles.module.scss';
import { CancelButton } from '@presentation/base/components/action-buttons/cancel-button';
import { SaveButton } from '@presentation/base/components/action-buttons/save-button';
import { IRecipeService } from '@application/culinary/contracts/recipe-service';
import { status } from '@domain/base/enums/status';
import { useRecipeUpdateForm } from '../hooks/use-recipe-update.form';
import { GroupItem } from '@presentation/base/components/group-item';
import { Group } from '@presentation/base/components/group';
import { Textarea } from '@presentation/base/components/textarea';
import { ImageUpload } from '@presentation/base/components/image-upload';
import { RecipeNotesField } from '../components/recipe-notes-field';
import { ICategoryService } from '@application/culinary/contracts/category-service';
import { recipeDifficulty } from '@domain/culinary/enums/recipe-difficulty';
import { RecipeSectionsField } from '../components/recipe-sections-field';
import { JsonImportModal } from '../components/json-import-modal';
import { useState } from 'react';

type Props = {
  recipeService: IRecipeService;
  categoryService: ICategoryService;
};

export function CulinaryRecipeUpdatePage({
  recipeService,
  categoryService,
}: Props) {
  const { id } = useParams();
  const {
    errors,
    hasError,
    isPristine,
    loading,
    request,
    categoriesParent,
    categoriesChildren,
    setParent,
    handleFieldChange,
    handleNotesChange,
    handleSectionsChange,
    handleSubmit,
    handleImageUpload,
    handleImportJson,
  } = useRecipeUpdateForm({
    id,
    recipeService,
    categoryService,
  });
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [openImportModal, setOpenImportModal] = useState<boolean>(
    searchParams.get('import') === 'true',
  );

  return (
    <>
      <JsonImportModal
        onClose={() => setOpenImportModal(false)}
        onImport={handleImportJson}
        open={openImportModal}
      />
      <Page title={t('culinary.recipe.update.title')}>
        <Card description={t('culinary.recipe.update.description')}>
          <div className={styles.container}>
            <div className={styles.form}>
              <Group>
                <GroupItem>
                  <Select
                    label={t('culinary.recipe.fields.parent')}
                    placeholder={t('common.select.empty')}
                    value={request.category?.parentId ?? request.categoryId}
                    onChange={setParent}
                    options={categoriesParent?.map((parent) => ({
                      label: parent.name,
                      value: parent.id,
                    }))}
                  />
                </GroupItem>

                <GroupItem>
                  <Select
                    disabled={!categoriesChildren.length}
                    label={t('culinary.recipe.fields.children')}
                    placeholder={t('common.select.empty')}
                    value={request.categoryId}
                    onChange={(e) => handleFieldChange('categoryId', e)}
                    options={categoriesChildren?.map((children) => ({
                      label: children.name,
                      value: children.id,
                    }))}
                  />
                </GroupItem>
                <GroupItem>
                  <Select
                    label={t('culinary.recipe.fields.status')}
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
              <Group>
                <GroupItem>
                  <Input
                    label={t('culinary.recipe.fields.name')}
                    maxLength={150}
                    value={request.name}
                    error={errors.name}
                    onChange={(e) => handleFieldChange('name', e)}
                  />
                </GroupItem>
                <GroupItem>
                  <Input
                    label={t('culinary.recipe.fields.shortDescription')}
                    maxLength={255}
                    value={request.shortDescription}
                    onChange={(e) => handleFieldChange('shortDescription', e)}
                  />
                </GroupItem>
              </Group>

              <Group>
                <GroupItem>
                  <Textarea
                    label={t('culinary.recipe.fields.fullDescription')}
                    maxLength={500}
                    value={request.fullDescription}
                    onChange={(e) => handleFieldChange('fullDescription', e)}
                  />
                </GroupItem>
              </Group>

              <Group>
                <GroupItem>
                  <RecipeSectionsField
                    onChange={handleSectionsChange}
                    value={request.sections}
                  />
                </GroupItem>
              </Group>

              <Group>
                <GroupItem>
                  <RecipeNotesField
                    value={request.notes}
                    onChange={handleNotesChange}
                  />
                </GroupItem>
              </Group>

              <Group>
                <GroupItem>
                  <Input
                    type="number"
                    label={t('culinary.recipe.fields.prepTime')}
                    value={request.prepTime}
                    onChange={(e) => handleFieldChange('prepTime', e)}
                  />
                </GroupItem>
                <GroupItem>
                  <Input
                    type="number"
                    label={t('culinary.recipe.fields.cookTime')}
                    value={request.cookTime}
                    onChange={(e) => handleFieldChange('cookTime', e)}
                  />
                </GroupItem>
                <GroupItem>
                  <Input
                    type="number"
                    label={t('culinary.recipe.fields.restTime')}
                    value={request.restTime}
                    onChange={(e) => handleFieldChange('restTime', e)}
                  />
                </GroupItem>
              </Group>

              <Group>
                <GroupItem>
                  <Input
                    label={t('culinary.recipe.fields.yieldTotal')}
                    maxLength={50}
                    value={request.yieldTotal}
                    onChange={(e) => handleFieldChange('yieldTotal', e)}
                  />
                </GroupItem>
                <GroupItem>
                  <Select
                    label={t('culinary.recipe.fields.difficulty')}
                    value={request.difficulty}
                    onChange={(e) => handleFieldChange('difficulty', e)}
                    options={recipeDifficulty.toArray().map((item) => ({
                      label: item.label,
                      value: item.value.toString(),
                    }))}
                  />
                </GroupItem>
                <GroupItem>
                  <Input
                    label={t('culinary.recipe.fields.cuisine')}
                    maxLength={100}
                    value={request.cuisine}
                    onChange={(e) => handleFieldChange('cuisine', e)}
                  />
                </GroupItem>
              </Group>

              <Group>
                <GroupItem span={2}>
                  <Input
                    label={t('culinary.recipe.fields.metaTitle')}
                    maxLength={70}
                    value={request.metaTitle}
                    onChange={(e) => handleFieldChange('metaTitle', e)}
                  />
                </GroupItem>
              </Group>
              <Group>
                <GroupItem>
                  <Textarea
                    label={t('culinary.recipe.fields.metaDescription')}
                    maxLength={170}
                    value={request.metaDescription}
                    onChange={(e) => handleFieldChange('metaDescription', e)}
                  />
                </GroupItem>
              </Group>
              <Group>
                <GroupItem>
                  <ImageUpload
                    modalTitle={t('imageUpload.modal.title')}
                    cancelButtonTitle={t('imageUpload.buttons.cancel')}
                    onUpload={handleImageUpload}
                    selectButtonTitle={t('imageUpload.buttons.select')}
                    uploadButtonTitle={t('imageUpload.buttons.upload')}
                  />
                </GroupItem>
              </Group>
              {request.imageUrl && (
                <Group>
                  <GroupItem span={2}>
                    <img
                      style={{ width: '100%' }}
                      src={`${process.env.API_URL}${request.imageUrl}`}
                    />
                  </GroupItem>
                  <GroupItem span={2}>&nbsp;</GroupItem>
                </Group>
              )}
            </div>
          </div>

          <div className={styles.actions}>
            <DataGridActions>
              <CancelButton
                title={t('common.button.cancel')}
                onClick={() => navigate('/culinary/recipes')}
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
    </>
  );
}
