import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { Board, CardType, ColumnType } from "./type.tsx";

const initBoardData = {
  name: "My board",
  columns: [
    {
      id: "todo",
      name: "To do",
      cards: [
        { id: "id-1", title: "Buy some milk", position: 1, columnId: "todo" },
        { id: "id-2", title: "Write some CSS", position: 2, columnId: "todo" },
        { id: "id-3", title: "Learn skipping", position: 3, columnId: "todo" },
      ],
    },
    {
      id: "in-progress",
      name: "In progress",
      cards: [
        {
          id: "id-4",
          title: "Make a video",
          position: 1,
          columnId: "in-progress",
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

const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [board, setBoard] = useState<Board>(initBoardData);

  const moveCard = useCallback(
    (cardId: string, targetColumnId: string, targetPosition: number) => {
      setBoard(prevBoard => {
        const newBoard = JSON.parse(JSON.stringify(prevBoard));

        // Find the card and its current column
        let sourceColumn: ColumnType | undefined;
        let card: CardType | undefined;
        let sourceCardIndex: number = -1;

        for (const column of newBoard.columns) {
          sourceCardIndex = column.cards.findIndex(c => c.id === cardId);
          if (sourceCardIndex !== -1) {
            sourceColumn = column;
            card = column.cards[sourceCardIndex];
            break;
          }
        }

        if (!sourceColumn || !card) {
          console.error("Card not found");
          return prevBoard;
        }

        // Find the target column
        const targetColumn = newBoard.columns.find(col => col.id === targetColumnId);

        if (!targetColumn) {
          console.error("Target column not found");
          return prevBoard;
        }

        // Remove the card from its current column
        sourceColumn.cards.splice(sourceCardIndex, 1);

        // Determine the insertion index
        let insertIndex: number;
        if (targetPosition === -1 || targetPosition >= targetColumn.cards.length) {
          insertIndex = targetColumn.cards.length;
        } else if (targetPosition === 0) {
          insertIndex = 0;
        } else {
          insertIndex = targetPosition;
        }

        // Insert the card at the target position
        targetColumn.cards.splice(insertIndex, 0, { ...card, columnId: targetColumnId });

        // Update positions of all cards in the affected columns
        const updatePositions = (column: ColumnType) => {
          column.cards.forEach((c, index) => {
            c.position = index;
          });
        };

        updatePositions(targetColumn);
        if (sourceColumn !== targetColumn) {
          updatePositions(sourceColumn);
        }

        return newBoard;
      });
    },
    [setBoard]
  );

  return (
    <BoardContext.Provider value={{ board, moveCard }}>
      {children}
    </BoardContext.Provider>
  );
};

const useBoard = () => useContext(BoardContext);

export { BoardProvider, useBoard };
