import { CardType } from "./type.tsx";
import { useEffect } from "react";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Card } from "./Card.tsx";
import { useBoard } from "./BoardProvider.tsx";

const CardList = ({ cards }: { cards: CardType[] }) => {
  return (
    <ol className="p-4 flex flex-col gap-4">
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </ol>
  );
};

export const Column = ({
  id,
  name,
  cards = [],
}: {
  id: string;
  name: string;
  cards?: CardType[];
}) => {
  const { moveCard } = useBoard();

  useEffect(() => {
    return combine(
      monitorForElements({
        onDrop: ({ source, location }) => {
          const target = location.current.dropTargets[0];

          if (!target) {
            return;
          }

          const sourceData = source.data;
          const targetData = target.data;

          console.log(sourceData);
          console.log(targetData);

          // we're reordering in a column
          const indexOfTarget = cards.findIndex(
            (card) => card.id === targetData.id
          );

          if (indexOfTarget < 0) {
            return;
          }

          let targetPosition: unknown = -1;
          if (indexOfTarget === 0) {
            targetPosition = 0;
          } else if (indexOfTarget === cards.length - 1) {
            targetPosition = -1;
          } else {
            targetPosition = targetData.position;
          }

          moveCard(sourceData.id, id, targetPosition);
        },
      })
    );
  }, [cards, id, moveCard]);

  return (
    <li className="w-72 h-full shrink-0 bg-gray-200 rounded-md">
      <h2 className="p-4 text-slate-700">{name}</h2>
      {cards.length > 0 ? <CardList cards={cards} /> : null}
    </li>
  );
};
