import {CardType, ColumnType} from "../type.tsx";
import { EmptyCardHolder } from "./EmptyCardHolder.tsx";
import { CardList } from "./CardList.tsx";
import { useEffect, useRef, useState } from "react";
import {dropTargetForElements, monitorForElements} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {useBoard} from "../data/BoardProvider.tsx";

export const Column = ({ column }: { column: ColumnType }) => {
  const { id, name, cards } = column;
  const ref = useRef<HTMLLIElement | null>(null);
  const [aboutToDrop, setAboutToDrop] = useState(false);
  const { moveCard } = useBoard();

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    return dropTargetForElements({
      element,
      onDragLeave() {
        setAboutToDrop(false);
      },
      onDragEnter() {
        setAboutToDrop(true);
      },
      onDragStart() {
        setAboutToDrop(true);
      },
      onDrop() {
        setAboutToDrop(false);
      },
    });
  }, []);

  useEffect(() => {
    monitorForElements({
      onDrop({source, location}) {
        const target = location.current.dropTargets[0];

        if(!source || !target) {
          return;
        }

        const sourceData = source.data as CardType;
        const targetData = target.data as CardType;

        if(!sourceData || !targetData) {
          return;
        }

        if(targetData.id === 'placeholder') {
          moveCard(sourceData.id, targetData.columnId, 0);
        } else {
          const indexOfTarget = cards.findIndex(card => card.id === targetData.id);

          let targetPosition = -1;
          if(indexOfTarget === 0) {
            targetPosition = 0;
          } else if(indexOfTarget === cards.length - 1) {
            targetPosition = -1;
          } else {
            targetPosition = targetData.position;
          }

          moveCard(sourceData.id, targetData.columnId, targetPosition);
        }
      }
    })
  }, [moveCard]);

  return (
    <li
      className={`w-72 h-full shrink-0 bg-gray-200 rounded-md ${
        aboutToDrop ? "bg-blue-100" : ""
      }`}
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
