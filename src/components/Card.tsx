import { CardType } from "../type.tsx";
import { useEffect, useRef, useState } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";

import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { pointerOutsideOfPreview } from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';
import { createPortal } from "react-dom";

export const Card = ({ card }: { card: CardType }) => {
  const { id, title, position, columnId } = card;
  const ref = useRef(null);

  const [isDragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<HTMLElement>();

  useEffect(() => {
    const element = ref.current;

    const dragConfig = {
      element,
      onDragStart() {
        setDragging(true);
      },
      onDrop() {
        setDragging(false);
        setPreview(undefined);
      },
      onGenerateDragPreview({ nativeSetDragImage }) {
        setCustomNativeDragPreview({
          nativeSetDragImage,
          getOffset: pointerOutsideOfPreview({
            x: '8px',
            y: '8px',
          }),
          render({ container }) {
            setPreview(container);
          },
        });
      },
    };

    return combine(draggable(dragConfig));
  }, []);

  return (
    <li
      ref={ref}
      data-test-id={id}
      className={`relative p-2 bg-gray-100 rounded-md text-lg hover:cursor-grab ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <p>{title}</p>
      {preview && createPortal(<DragPreview card={card} />, preview)}
    </li>
  );
};

// A simplified version of our task for the user to drag around
function DragPreview({ card }: { card: CardType }) {
  return (
    <div className="border-solid rounded p-2 bg-orange-500 text-slate-100 w-72">
      {card.title}
    </div>
  );
}
