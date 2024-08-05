import { Column } from "./Column.tsx";
import { useBoard } from "./BoardProvider.tsx";

const Board = () => {
  const { board } = useBoard();

  return (
    <div className="flex flex-col m-auto bg-gray-100 h-screen overflow-auto">
      <h1 className="mx-10 my-4 text-2xl">{board?.name}</h1>
      <ol className="max-h-full mx-10 my-4 flex flex-row gap-6 flex-grow">
        {board?.columns.map((col) => (
          <Column key={col.id} id={col.id} name={col.name} cards={col.cards} />
        ))}
      </ol>
    </div>
  );
};

export { Board };
