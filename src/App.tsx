import { BoardProvider } from "./BoardProvider.tsx";
import { Board } from "./Board.tsx";

function App() {
  return (
    <BoardProvider>
      <Board />
    </BoardProvider>
  );
}

export default App;
