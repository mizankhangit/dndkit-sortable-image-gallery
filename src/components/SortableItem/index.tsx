import { useSortable } from "@dnd-kit/sortable";
import Item from "../Item";

// interface SortableItemProps {
//   animateLayoutChanges?: AnimateLayoutChanges;
//   disabled?: boolean;
//   // getNewIndex?: NewIndexGetter;
//   id: UniqueIdentifier;
//   index: number;
//   handle: boolean;
//   useDragOverlay?: boolean;
//   onRemove?(id: UniqueIdentifier): void;
//   style(values: any): React.CSSProperties;
//   renderItem?(args: any): React.ReactElement;
//   wrapperStyle: Props["wrapperStyle"];
// }

export function SortableItem({
  data,
  index,
  useDragOverlay = true,
  onCheckedUnchecked,
}: any) {
  const {
    attributes,
    isDragging,
    isSorting,
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
      sorting={isSorting}
      index={index}
      // style={style({
      //   index,
      //   id,
      //   isDragging,
      //   isSorting,
      //   overIndex,
      // })}
      transform={transform}
      transition={transition}
      //   wrapperStyle={wrapperStyle?.({ index, isDragging, active, id })}
      listeners={listeners}
      data-index={index}
      data-id={data.id}
      dragOverlay={!useDragOverlay && isDragging}
      {...attributes}
    />
  );
}

export default SortableItem;
