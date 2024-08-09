import { CardType } from "../type.tsx";
import { useEffect, useRef, useState } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { createPortal } from "react-dom";

export const Card = ({ card }: { card: CardType }) => {
  const { id, title } = card;
  const ref = useRef(null);
  const [isDragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    return draggable({
      element,
      onDragStart() {
        setDragging(true);
      },
      onDrop() {
        setDragging(false);
        setPreview(null);
      },
      onGenerateDragPreview({ nativeSetDragImage }) {
        setCustomNativeDragPreview({
          nativeSetDragImage,
          render({ container }) {
            setPreview(container);
          },
        });
      },
    });
  }, []);

  return (
    <li
      data-test-id={id}
      className={`relative p-2 bg-gradient-to-br from-slate-100 to-slate-200 drop-shadow-sm rounded-md text-lg ${
        isDragging ? "opacity-50" : ""
      }`}
      ref={ref}
    >
      <span className="bg-orange-500 text-white rounded-sm py-0.5 px-1 text-xs text-center">
        {id}
      </span>
      <p className="text-slate-800">{title}</p>
      {preview && createPortal(<CardPreview card={card} />, preview)}
    </li>
  );
};

const CardPreview = ({ card }: { card: CardType }) => {
  return (
    <div
      className={`p-2 bg-red-500 text-white drop-shadow-sm rounded-md text-lg w-72`}
    >
      <p>{card.title}</p>
    </div>
  );
};
