import { useState } from 'react';
import { AddButton } from '@presentation/base/components/action-buttons/add-button';
import { DeleteButton } from '@presentation/base/components/action-buttons/delete-button';
import { Input } from '@presentation/base/components/input';

import * as styles from './styles.module.scss';

type Ingredient = {
  description: string;
};

type Props = {
  value: Ingredient[];
  onChange: (value: Ingredient[]) => void;
};

export function RecipeIngredientsField({ value, onChange }: Props) {
  const [local, setLocal] = useState(value);

  const sync = (next: Ingredient[]) => {
    setLocal(next);
  };

  const commit = (next: Ingredient[]) => {
    setLocal(next);
    onChange(next);
  };

  const add = () => {
    commit([...local, { description: '' }]);
  };

  const remove = (index: number) => {
    commit(local.filter((_, i) => i !== index));
  };

  const update = (index: number, description: string) => {
    const next = [...local];
    next[index] = { description };

    sync(next); // 👈 NÃO chama onChange aqui
  };

  return (
    <div className={styles.block}>
      <div className={styles.blockHeader}>
        <span>Ingredients</span>
        <AddButton title="Add" onClick={add} />
      </div>

      <div className={styles.list}>
        {local.map((item, index) => (
          <div key={index} className={styles.row}>
            <Input
              value={item.description}
              onChange={(v) => update(index, v)}
              onBlur={() => onChange(local)}
            />

            <DeleteButton title="" onClick={() => remove(index)} />
          </div>
        ))}
      </div>
    </div>
  );
}
