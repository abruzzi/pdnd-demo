import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import initBoardData from "./board.json";
import { Board, BoardContextType, CardType, ColumnType } from "../type.tsx";
import { noop } from "../utils.ts";

const BoardContext = createContext<BoardContextType>({
  board: { name: "", columns: [] },
  moveCard: noop,
});

const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [board, setBoard] = useState<Board>(initBoardData);

  const moveCard = useCallback(
    (cardId: string, targetColumnId: string, targetPosition: number) => {
      setBoard((prevBoard) => {
        const newBoard = JSON.parse(JSON.stringify(prevBoard));

        // Find the card and its current column
        let sourceColumn: ColumnType | undefined;
        let card: CardType | undefined;
        let sourceCardIndex: number = -1;

        for (const column of newBoard.columns) {
          sourceCardIndex = column.cards.findIndex((c) => c.id === cardId);
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
        const targetColumn = newBoard.columns.find(
          (col) => col.id === targetColumnId
        );

        if (!targetColumn) {
          console.error("Target column not found");
          return prevBoard;
        }

        // Remove the card from its current column
        sourceColumn.cards.splice(sourceCardIndex, 1);

        // Determine the insertion index
        let insertIndex: number;
        if (
          targetPosition === -1 ||
          targetPosition >= targetColumn.cards.length
        ) {
          insertIndex = targetColumn.cards.length;
        } else if (targetPosition === 0) {
          insertIndex = 0;
        } else {
          insertIndex = targetPosition;
        }

        // Insert the card at the target position
        targetColumn.cards.splice(insertIndex, 0, {
          ...card,
          columnId: targetColumnId,
        });

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
