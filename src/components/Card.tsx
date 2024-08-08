import { CardType } from "../type.tsx";

export const Card = ({ card }: { card: CardType }) => {
  const { id, title } = card;

  return (
    <li
      data-test-id={id}
      className="relative p-2 bg-gradient-to-br from-slate-100 to-slate-200 drop-shadow-sm rounded-md text-lg"
    >
      <span className="bg-orange-500 text-white rounded-sm py-0.5 px-1 text-xs text-center">
        {id}
      </span>
      <p className="text-slate-800">{title}</p>
    </li>
  );
};
