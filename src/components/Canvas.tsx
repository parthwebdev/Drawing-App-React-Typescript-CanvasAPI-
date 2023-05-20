import { useEffect, useRef, useState } from "react";

interface CanvasProps {
  width: number;
  height: number;
}

interface Point {
  x: number;
  y: number;
}

interface Line {
  points: Point[];
  // color: string;
}

function Canvas({ width, height }: CanvasProps) {
  const [currentLine, setCurrentLine] = useState<Point[]>([]);
  const [history, sethistory] = useState<Line[]>([]);
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {}, [history, width, height]);

  function getCanvasCoordinates(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = e.currentTarget;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      canvas,
      ctx,
    };
  }

  function handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    setIsHolding(true);
    const { x, y, ctx } = getCanvasCoordinates(e);

    if (ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
    }

    setCurrentLine([{ x, y }]);
  }

  function drawLine(e: React.MouseEvent<HTMLCanvasElement>) {
    if (isHolding) {
      const { x, y, ctx } = getCanvasCoordinates(e);

      if (ctx) {
        ctx.moveTo(x, y);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
      setCurrentLine((prevPoints) => [...prevPoints, { x, y }]);
    }
  }

  function handleMouseUp(e: React.MouseEvent<HTMLCanvasElement>) {
    const { ctx } = getCanvasCoordinates(e);

    setIsHolding(false);
    ctx?.closePath();

    sethistory((prevHistory) => [...prevHistory, { points: currentLine }]);
    setCurrentLine([]);
  }

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        border: "1px solid white",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={drawLine}
      onMouseUp={handleMouseUp}
    ></canvas>
  );
}

export default Canvas;
