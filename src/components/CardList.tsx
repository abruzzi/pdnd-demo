import {CardType} from "../type.tsx";
import {Card} from "./Card.tsx";

export const CardList = ({cards}: { cards: CardType[] }) => {
  return (
    <ol className="p-4 flex flex-col gap-4">
      {cards.map((card) => (
        <Card key={card.id} card={card}/>
      ))}
    </ol>
  );
};