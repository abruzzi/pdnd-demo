import React from "react";
import { useEffect, useRef, useState } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import DropIndicator from "@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box";
import {
  attachClosestEdge,
  Edge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { CardType } from "../type.tsx";

const EmptyCardHolder = ({ columnId }: { columnId: string }) => {
  const ref = useRef(null);
  const [closestEdge, setClosestEdge] = useState<Edge>(null);

  useEffect(() => {
    const element = ref.current;

    const dropConfig = {
      element: element,
      canDrop({ source }) {
        return source.element !== element;
      },
      getData({ input, element }) {
        return attachClosestEdge(
          {
            columnId: columnId,
            position: 0,
            id: "placeholder",
            title: "",
          } as CardType,
          {
            element,
            input,
            allowedEdges: ["top", "bottom"],
          }
        );
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

    return dropTargetForElements(dropConfig);
  }, [columnId]);

  return (
    <ol className="p-4 flex flex-col gap-4">
      <li ref={ref} className={`relative p-2 hover:cursor-grab h-4`}>
        {closestEdge && <DropIndicator edge={closestEdge} gap="1rem" />}
      </li>
    </ol>
  );
};

export { EmptyCardHolder };
