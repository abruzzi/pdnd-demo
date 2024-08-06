import { BoardProvider } from "./data/BoardProvider.tsx";
import { Board } from "./components/Board.tsx";

function App() {
  return (
    <BoardProvider>
      <Board />
    </BoardProvider>
  );
}

export default App;
