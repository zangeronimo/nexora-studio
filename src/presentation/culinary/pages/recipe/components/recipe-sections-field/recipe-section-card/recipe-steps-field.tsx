import { useState } from 'react';
import { AddButton } from '@presentation/base/components/action-buttons/add-button';
import { DeleteButton } from '@presentation/base/components/action-buttons/delete-button';
import { DraggableList } from '@presentation/base/components/draggable-list';

import * as styles from './styles.module.scss';
import { Input } from '@presentation/base/components/input';

type Step = {
  order: number;
  instruction: string;
};

type Props = {
  value: Step[];
  onChange: (value: Step[]) => void;
};

export function RecipeStepsField({ value, onChange }: Props) {
  const [local, setLocal] = useState(value);

  const sync = (v: Step[]) => setLocal(v);

  const commit = (v: Step[]) => {
    setLocal(v);
    onChange(
      v.map((s, i) => ({
        instruction: s.instruction,
        order: i + 1,
      })),
    );
  };

  const add = () => {
    commit([...local, { instruction: '', order: 0 }]);
  };

  const remove = (index: number) => {
    commit(local.filter((_, i) => i !== index));
  };

  const update = (index: number, instruction: string) => {
    const next = [...local];
    next[index] = { ...next[index], instruction };

    sync(next); // 👈 sem commit aqui

    commit(next);
  };

  return (
    <div className={styles.block}>
      <div className={styles.blockHeader}>
        <span>Steps</span>
        <AddButton title="Add Step" onClick={add} />
      </div>

      <DraggableList
        items={local}
        getId={(_, index) => String(index)}
        onReorder={(items) => commit(items as Step[])}
        renderItem={(step, index) => (
          <div className={styles.rowDraggable}>
            <div className={styles.order}>{index + 1}</div>

            <Input
              value={step.instruction}
              onChange={(v) => update(index, v)}
            />

            <DeleteButton title="" onClick={() => remove(index)} />
          </div>
        )}
      />
    </div>
  );
}
