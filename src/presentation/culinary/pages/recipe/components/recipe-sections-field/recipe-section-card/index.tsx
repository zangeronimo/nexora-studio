import { DeleteButton } from '@presentation/base/components/action-buttons/delete-button';
import { Input } from '@presentation/base/components/input';

import { RecipeIngredientsField } from './recipe-ingredients-field';
import { RecipeStepsField } from './recipe-steps-field';

import * as styles from './styles.module.scss';
import { Section } from '..';

type Props = {
  section: Section;
  canDelete: boolean;
  onDelete: () => void;
  onChange: (section: Section) => void;
};

export function RecipeSectionCard({
  section,
  canDelete,
  onDelete,
  onChange,
}: Props) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionTitle}>Section</span>

        {canDelete && <DeleteButton title="Delete" onClick={onDelete} />}
      </div>

      <Input
        label="Title"
        value={section.title}
        onChange={(title) =>
          onChange({
            ...section,
            title,
          })
        }
      />

      <RecipeIngredientsField
        value={section.ingredients}
        onChange={(ingredients) =>
          onChange({
            ...section,
            ingredients,
          })
        }
      />

      <RecipeStepsField
        value={section.steps}
        onChange={(steps) =>
          onChange({
            ...section,
            steps,
          })
        }
      />
    </div>
  );
}
