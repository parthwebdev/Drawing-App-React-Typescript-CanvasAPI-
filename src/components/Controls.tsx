import { useState } from "react";
import { Line, useCanvasContext } from "../context/CanvasContext";

function Controls() {
  const [cache, setCache] = useState<Line[]>([]);

  const { history, setHistory, setCurrentLine } = useCanvasContext();

  function undo() {
    if (history.length > 0) {
      const newHistory = [...history];
      const lastItem = newHistory.pop() as Line;
      setCache([...cache, lastItem]);
      setHistory(newHistory);
    }
  }

  function redo() {
    if (cache.length > 0) {
      const newCache = [...cache];
      const lastItem = newCache.pop() as Line;
      setCache(newCache);
      setHistory((prevHistory) => [...prevHistory, lastItem]);
    }
  }

  function reset() {
    setCurrentLine([]);
    setHistory([]);
    setCache([]);
  }

  return (
    <div>
      <button onClick={undo} disabled={history.length === 0}>
        Undo
      </button>
      <button onClick={redo} disabled={cache.length === 0}>
        Redo
      </button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Controls;
