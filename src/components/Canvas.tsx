import { useEffect, useRef, useState } from "react";
import { useCanvasContext } from "../context/CanvasContext";

interface CanvasProps {
  width: number;
  height: number;
}

function Canvas({ width, height }: CanvasProps) {
  const {
    currentLine,
    setCurrentLine,
    history,
    setHistory,
    width: lineWidth,
    color,
  } = useCanvasContext();

  const [isHolding, setIsHolding] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (ctx) {
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.lineCap = "round";

      if (isHolding) {
        ctx.moveTo(currentLine[0].x, currentLine[0].y);
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        currentLine.forEach((line) => {
          ctx.lineTo(line.x, line.y);
        });
        ctx.stroke();
      }

      history.forEach((line) => {
        ctx.beginPath();
        ctx.moveTo(line.points[0].x, line.points[0].y);
        ctx.strokeStyle = line.color;
        ctx.lineWidth = line.width;
        line.points.forEach((point) => {
          ctx.lineTo(point.x, point.y);
        });
        ctx.stroke();
      });
    }
  }, [currentLine, isHolding, history, width, height, color, lineWidth]);

  function handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    const { offsetX: x, offsetY: y } = e.nativeEvent;

    setIsHolding(true);
    setCurrentLine([{ x, y }]);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    if (isHolding) {
      const { offsetX: x, offsetY: y } = e.nativeEvent;

      setCurrentLine((prevPoints) => [...prevPoints, { x, y }]);
    }
  }

  function handleMouseUp(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = e.currentTarget;
    const ctx = canvas.getContext("2d");

    setIsHolding(false);
    ctx?.closePath();

    setHistory((prevHistory) => [
      ...prevHistory,
      { points: currentLine, color, width: lineWidth },
    ]);
    setCurrentLine([]);
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          border: "1px solid white",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></canvas>
    </>
  );
}

export default Canvas;
