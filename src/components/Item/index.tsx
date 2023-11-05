import { forwardRef, memo, useState } from "react";
import classNames from "classnames";
import type { DraggableSyntheticListeners } from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";

import styles from "./Item.module.scss";
import CheckedIcon from "../CheckedIcon";

export interface Props {
  dragOverlay?: boolean;
  disabled?: boolean;
  dragging?: boolean;
  handle?: boolean;
  index?: number;
  fadeIn?: boolean;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  sorting?: boolean;
  style?: React.CSSProperties;
  transition?: string | null;
  wrapperStyle?: React.CSSProperties;
  data: any;
  onCheckedUnchecked?: any;
  activeId?: number;
}

export const Item = memo(
  forwardRef<HTMLLIElement, Props>(
    (
      {
        data,
        dragOverlay,
        dragging,
        disabled,
        fadeIn,
        handle,
        index,
        listeners,
        sorting,
        style,
        transition,
        transform,
        wrapperStyle,
        onCheckedUnchecked,

        activeId,
        ...props
      },
      ref
    ) => {
      const [checked, setChecked] = useState(false);

      return (
        <li
          className={`${classNames(
            styles.Wrapper
            // fadeIn && styles.fadeIn,
            // sorting && styles.sorting,
            // dragOverlay && styles.dragOverlay
          )} border rounded-lg shadow-sm relative group ${
            index === 0 ? "col-span-2 row-span-2" : ""
          }`}
          style={
            {
              ...wrapperStyle,
              transition: [transition, wrapperStyle?.transition]
                .filter(Boolean)
                .join(", "),
              "--translate-x": transform
                ? `${Math.round(transform.x)}px`
                : undefined,
              "--translate-y": transform
                ? `${Math.round(transform.y)}px`
                : undefined,
              "--scale-x": transform?.scaleX
                ? `${transform.scaleX}`
                : undefined,
              "--scale-y": transform?.scaleY
                ? `${transform.scaleY}`
                : undefined,
              "--index": index,
            } as React.CSSProperties
          }
          ref={ref}
        >
          {activeId !== data.id && (
            <div
              className={`absolute pointer-events-none top-0 left-0 w-full h-full rounded-lg bg-black/50 opacity-0 ${
                !checked ? "group-hover:opacity-100" : ""
              } transition-all`}
            ></div>
          )}

          <div
            className={`absolute top-4 left-4 ${
              checked ? "z-10" : "-z-10"
            } group-hover:z-20`}
          >
            <input
              type="checkbox"
              className="opacity-0 absolute w-5 h-5 cursor-pointer"
              value={data.id}
              onPointerDown={(event) => {
                event.stopPropagation();
              }}
              onChange={(e) => {
                setChecked(e.target.checked);
                onCheckedUnchecked(e);
              }}
            />
            <CheckedIcon />
          </div>

          <div
            className={`${classNames(
              styles.Item,
              dragging && styles.dragging,
              dragOverlay && styles.dragOverlay
            )}`}
            style={style}
            {...(!handle ? listeners : undefined)}
            {...props}
          >
            <img
              className={`rounded-lg w-full h-full ${
                checked ? "opacity-50" : ""
              }`}
              src={data.imgSrc}
              alt={data.name}
            />
          </div>
        </li>
      );
    }
  )
);

export default Item;
