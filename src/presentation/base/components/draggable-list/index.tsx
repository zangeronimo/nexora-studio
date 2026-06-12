import { ReactNode, useRef } from 'react';

type Props<T> = {
  items: T[];
  getId: (item: T, index: number) => string;
  renderItem: (item: T, index: number) => ReactNode;
  onReorder: (items: T[]) => void;
};

export function DraggableList<T>({
  items,
  getId,
  renderItem,
  onReorder,
}: Props<T>) {
  const draggedIndexRef = useRef<number | null>(null);

  const reorder = (from: number, to: number) => {
    if (from === to) return;

    const updated = [...items];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);

    onReorder(updated);
  };

  return (
    <>
      {items.map((item, index) => {
        const id = getId(item, index);

        return (
          <div
            key={id}
            draggable
            onDragStart={() => {
              draggedIndexRef.current = index;
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              const from = draggedIndexRef.current;
              if (from === null) return;

              reorder(from, index);
              draggedIndexRef.current = null;
            }}
          >
            {renderItem(item, index)}
          </div>
        );
      })}
    </>
  );
}
