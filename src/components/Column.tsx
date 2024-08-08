import { ColumnType } from "../type.tsx";
import { EmptyCardHolder } from "./EmptyCardHolder.tsx";
import { CardList } from "./CardList.tsx";
import { useEffect, useRef, useState } from "react";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

export const Column = ({ column }: { column: ColumnType }) => {
  const { id, name, cards } = column;
  const ref = useRef<HTMLLIElement | null>(null);
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    const element = ref.current;

    const monitorConfig = {
      element,
      onDrag({ location }) {
        const target = location.current.dropTargets[0];

        if (!target) {
          return;
        }

        if (target.data.columnId === id) {
          setHighlight(true);
        } else {
          setHighlight(false);
        }
      },
      onDrop() {
        setHighlight(false);
      },
    };

    return monitorForElements(monitorConfig);
  }, [id]);

  return (
    <li
      className={`w-72 h-full shrink-0 ${
        highlight ? "bg-blue-100" : "bg-gray-50"
      } rounded-md`}
      ref={ref}
    >
      <h2 className="p-4 text-slate-700">{name}</h2>
      {cards.length > 0 ? (
        <CardList cards={cards} />
      ) : (
        <EmptyCardHolder columnId={id} />
      )}
    </li>
  );
};
