import { useSortable } from "@dnd-kit/sortable";
import Item from "../Item";

interface Props {
  data: any;
  index: number;
  onCheckedUnchecked?: any;
  useDragOverlay?: boolean;
}

export function SortableItem({
  data,
  index,
  useDragOverlay = true,
  onCheckedUnchecked,
}: Props) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: data.id });

  return (
    <Item
      onCheckedUnchecked={onCheckedUnchecked}
      ref={setNodeRef}
      data={data}
      dragging={isDragging}
      index={index}
      transform={transform}
      transition={transition}
      listeners={listeners}
      data-index={index}
      data-id={data.id}
      dragOverlay={!useDragOverlay && isDragging}
      {...attributes}
    />
  );
}

export default SortableItem;
