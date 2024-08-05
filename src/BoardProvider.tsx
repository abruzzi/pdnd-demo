import { createContext, useCallback, useContext, useState } from "react";
import { Board } from "./type.tsx";

const initBoardData = {
  name: "My board",
  columns: [
    {
      id: "todo",
      name: "To do",
      cards: [
        { id: "id-1", title: "Buy some milk", position: 1, column: "todo" },
        { id: "id-2", title: "Write some CSS", position: 2, column: "todo" },
        { id: "id-3", title: "Learn skipping", position: 3, column: "todo" },
      ],
    },
    {
      id: "in-progress",
      name: "In progress",
      cards: [
        {
          id: "id-3",
          title: "Make a video",
          position: 1,
          column: "in-progress",
        },
      ],
    },
    {
      id: "done",
      name: "Done",
      cards: [],
    },
  ],
} as Board;

const noop = () => {};

type BoardContextType = {
  board: Board | null;
  moveCard: (
    id: string,
    targetColumnId: string,
    targetPosition: number
  ) => void;
};

const BoardContext = createContext<BoardContextType>({
  board: null,
  moveCard: noop,
});

const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [board, setBoard] = useState<Board>(initBoardData);
  const moveCard = useCallback(() => {}, []);

  return (
    <BoardContext.Provider value={{ board, moveCard }}>
      {children}
    </BoardContext.Provider>
  );
};

const useBoard = () => useContext(BoardContext);

export { BoardProvider, useBoard };
