import { CardType } from "./type.tsx";
import { useEffect, useRef, useState } from "react";
import {
  attachClosestEdge,
  Edge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import DropIndicator from "@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box";

export const Card = ({ card }: { card: CardType }) => {
  const { id, title, position, columnId } = card;
  const ref = useRef(null);
  const [closestEdge, setClosestEdge] = useState<Edge>(null);
  const [isDragging, setDragging] = useState<boolean>(false);

  useEffect(() => {
    const element = ref.current;

    const dragConfig = {
      element: element,
      getInitialData: () => {
        return card;
      },
      onDragStart: () => {
        setDragging(true);
      },
      onDrop: () => {
        setDragging(false);
      },
    };

    const dropConfig = {
      element: element,
      canDrop({ source }) {
        return source.element !== element;
      },
      getData({ input, element }) {
        return attachClosestEdge(card, {
          element,
          input,
          allowedEdges: ["top", "bottom"],
        });
      },
      onDrag: ({ self }) => {
        const closestEdge = extractClosestEdge(self.data);
        setClosestEdge(closestEdge);
      },
      getIsSticky() {
        return true;
      },
      onDragLeave() {
        setClosestEdge(null);
      },
      onDrop() {
        setClosestEdge(null);
      },
    };

    return combine(draggable(dragConfig), dropTargetForElements(dropConfig));
  }, [columnId, id, position]);

  return (
    <li
      ref={ref}
      data-test-id={id}
      className={`relative p-2 bg-gray-100 rounded-md text-lg hover:cursor-grab ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <p>{title}</p>

      {closestEdge && <DropIndicator edge={closestEdge} gap="1rem" />}
    </li>
  );
};
