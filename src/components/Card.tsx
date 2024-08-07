import { CardType } from "../type.tsx";
import { useEffect, useRef, useState } from "react";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";

import { useBoard } from "../data/BoardProvider.tsx";

export const Card = ({ card }: { card: CardType }) => {
  const { id, title } = card;
  const ref = useRef(null);

  const { moveCard } = useBoard();

  const [isDragging, setDragging] = useState(false);

  useEffect(() => {
    const element = ref.current;

    const dragConfig = {
      element,
      onDragStart() {
        setDragging(true);
      },
      getInitialData() {
        return card;
      },
      onDrop() {
        setDragging(false);
      },
    };

    const dropConfig = {
      element,
      getData() {
        return card;
      },
      onDrop({ source, self }) {
        const target = self;
        moveCard(
          source.data.id,
          target.data.columnId,
          target.data.position + 1
        );
      },
    };

    return combine(draggable(dragConfig), dropTargetForElements(dropConfig));
  }, [card, moveCard]);

  return (
    <li
      ref={ref}
      data-test-id={id}
      className={`relative p-2 bg-gray-100 rounded-md text-lg hover:cursor-grab ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <span className="bg-amber-500 text-slate-100 rounded-sm py-0.5 px-1 text-xs text-center">{id}</span>
      <p>{title}</p>
    </li>
  );
};
