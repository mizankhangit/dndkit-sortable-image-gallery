import { useState } from "react";
import { createPortal } from "react-dom";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import GalleryHeader from "../../components/GalleryHeader";
import SortableItem from "../../components/SortableItem";
import AddImage from "../../components/AddImage";
import Item from "../../components/Item";
import data from "./../../_data/gallery-items.json";

const ImageGalleryPage = () => {
  const [items, setItems] = useState(data);
  const [selected, setSelected] = useState<number[]>([]);
  const [activeId, setActiveId] = useState<any>(null);
  const getIndex = (id: any) => items.findIndex((item) => item.id === id);
  const activeIndex = activeId ? getIndex(activeId) : -1;

  // Handle drag start
  const handleDragStart = ({ active }: any) => {
    if (!active) return;
    setActiveId(active.id);
  };

  // Re-arranging functionality onDrag end
  const handleDragEnd = ({ over }: any) => {
    setActiveId(null);
    if (over) {
      const overIndex = getIndex(over.id);
      if (activeIndex !== overIndex) {
        setItems((items) => arrayMove(items, activeIndex, overIndex));
      }
    }
  };

  // Checked and unchecked functionality
  const onCheckedUnchecked = (event: any) => {
    const checkedItem = parseInt(event.target.value);
    if (selected.includes(checkedItem)) {
      setSelected(selected.filter((item) => item !== checkedItem));
    } else {
      setSelected((prev) => [...prev, checkedItem]);
    }
  };

  // Delete functionality
  const handleDelete = () => {
    const remainingItems = items.filter((item) => !selected.includes(item.id));
    setItems(remainingItems);
    setSelected([]);
  };

  console.log({ activeId });

  return (
    <DndContext
      sensors={useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor)
      )}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <div className="bg-[#ebeff5] min-h-[100vh] py-10 lg:py-[80px]">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="bg-white border rounded-lg">
            <GalleryHeader
              selectedLength={selected.length}
              handleDelete={handleDelete}
            />
            <SortableContext items={items} strategy={rectSortingStrategy}>
              <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 lg:gap-[30px] p-5 md:p-8 lg:p-10">
                {items.map((item, index) => (
                  <SortableItem
                    key={item.id}
                    data={item}
                    index={index}
                    onCheckedUnchecked={onCheckedUnchecked}
                  />
                ))}
                <AddImage />
              </ul>
            </SortableContext>
          </div>
        </div>
      </div>

      {createPortal(
        <DragOverlay
          adjustScale={true}
          dropAnimation={{
            sideEffects: defaultDropAnimationSideEffects({
              styles: {
                active: {
                  opacity: "0.4",
                },
              },
            }),
          }}
        >
          {activeId ? (
            <Item data={items[activeIndex]} activeId={activeId} dragOverlay />
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};

export default ImageGalleryPage;
