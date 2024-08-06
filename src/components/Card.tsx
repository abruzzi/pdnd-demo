import { CardType } from "../type.tsx";

export const Card = ({ card }: { card: CardType }) => {
  const { id, title, position, columnId } = card;

  return (
    <li
      data-test-id={id}
      className="relative p-2 bg-gray-100 rounded-md text-lg hover:cursor-grab"
    >
      <p>{title}</p>
    </li>
  );
};
