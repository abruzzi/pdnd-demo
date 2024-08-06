import { ColumnType } from "../type.tsx";
import { EmptyCardHolder } from "./EmptyCardHolder.tsx";
import { CardList } from "./CardList.tsx";

export const Column = ({ column }: { column: ColumnType }) => {
  const { id, name, cards } = column;

  return (
    <li className="w-72 h-full shrink-0 bg-gray-200 rounded-md">
      <h2 className="p-4 text-slate-700">{name}</h2>
      {cards.length > 0 ? (
        <CardList cards={cards} />
      ) : (
        <EmptyCardHolder columnId={id} />
      )}
    </li>
  );
};
