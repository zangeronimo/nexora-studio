import { AddButton } from '@presentation/base/components/action-buttons/add-button';

import { RecipeSectionCard } from './recipe-section-card';
import * as styles from './styles.module.scss';

export type Ingredient = {
  id?: string;
  description: string;
};

export type Step = {
  id?: string;
  order: number;
  instruction: string;
};

export type Section = {
  id?: string;
  title: string | null;
  ingredients: Ingredient[];
  steps: Step[];
};

type Props = {
  value: Section[];
  onChange: (sections: Section[]) => void;
};

const createIngredient = (): Ingredient => ({
  id: crypto.randomUUID(),
  description: '',
});

const createStep = (): Step => ({
  id: crypto.randomUUID(),
  order: 1,
  instruction: '',
});

const createSection = (): Section => ({
  id: crypto.randomUUID(),
  title: '',
  ingredients: [createIngredient()],
  steps: [createStep()],
});

export function RecipeSectionsField({ value, onChange }: Props) {
  const addSection = () => {
    onChange([...value, createSection()]);
  };

  const removeSection = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const updateSection = (index: number, section: Section) => {
    const sections = [...value];

    sections[index] = section;

    onChange(sections);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>Sections</span>

        <AddButton title="Add Section" onClick={addSection} />
      </div>

      {value.map((section, index) => (
        <RecipeSectionCard
          key={section.id}
          section={section}
          canDelete={value.length > 1}
          onDelete={() => removeSection(index)}
          onChange={(updated) => updateSection(index, updated)}
        />
      ))}
    </div>
  );
}
