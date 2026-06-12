import { Card } from '@presentation/base/components/card';
import { AddButton } from '@presentation/base/components/action-buttons/add-button';
import { DeleteButton } from '@presentation/base/components/action-buttons/delete-button';
import { Textarea } from '@presentation/base/components/textarea';

import * as styles from './styles.module.scss';

type Props = {
  value: string[];
  onChange: (value: string[]) => void;
};

export function RecipeNotesField({ value, onChange }: Props) {
  const notes = value.length ? value : [''];

  const handleAdd = () => {
    onChange([...notes, '']);
  };

  const handleRemove = (index: number) => {
    const next = notes.filter((_, i) => i !== index);

    onChange(next);
  };

  const handleChange = (index: number, note: string) => {
    const next = [...notes];

    next[index] = note;

    onChange(next);
  };

  return (
    <Card
      title="Chef Notes"
      description="Tips, substitutions, variations and preparation suggestions."
      actions={<AddButton title="Add Note" onClick={handleAdd} />}
    >
      <div className={styles.container}>
        {notes.map((note, index) => (
          <div key={index} className={styles.note}>
            <div className={styles.noteHeader}>
              <span className={styles.noteTitle}>Note {index + 1}</span>

              {notes.length > 1 && (
                <DeleteButton
                  title="Delete"
                  onClick={() => handleRemove(index)}
                />
              )}
            </div>

            <Textarea
              value={note}
              maxLength={500}
              placeholder="Example: For a stronger flavor, add one extra tablespoon of..."
              onChange={(value) => handleChange(index, value)}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
