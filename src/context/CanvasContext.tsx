import { useState, createContext, useContext } from "react";

interface Point {
  x: number;
  y: number;
}

export interface Line {
  points: Point[];
  color: string;
  width: number;
}

interface CanvasContextType {
  currentLine: Point[];
  history: Line[];
  setCurrentLine: React.Dispatch<React.SetStateAction<Point[]>>;
  setHistory: React.Dispatch<React.SetStateAction<Line[]>>;
  color: string;
  width: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
  setColor: React.Dispatch<React.SetStateAction<string>>;
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
  const [color, setColor] = useState<string>("#ffffff");
  const [width, setWidth] = useState<number>(1);

  return (
    <CanvasContext.Provider
      value={{
        currentLine,
        history,
        setCurrentLine,
        setHistory,
        color,
        width,
        setWidth,
        setColor,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};
