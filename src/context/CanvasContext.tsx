import { useState, createContext, useContext } from "react";

interface Point {
  x: number;
  y: number;
}

interface Line {
  points: Point[];
  // color: string;
}

interface CanvasContextType {
  currentLine: Point[];
  history: Line[];
  setCurrentLine: React.Dispatch<React.SetStateAction<Point[]>>;
  setHistory: React.Dispatch<React.SetStateAction<Line[]>>;
}

const CanvasContext = createContext<CanvasContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useCanvasContext = () => {
  const context = useContext(CanvasContext);

  if (!context) {
    throw new Error("Context not found");
  }

  return context;
};

export const CanvasContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentLine, setCurrentLine] = useState<Point[]>([]);
  const [history, setHistory] = useState<Line[]>([]);

  return (
    <CanvasContext.Provider
      value={{ currentLine, history, setCurrentLine, setHistory }}
    >
      {children}
    </CanvasContext.Provider>
  );
};
