import Canvas from "./components/Canvas";
import { useEffect, useState } from "react";

// currentLine => [{x, y}, {x, y}, {x, y}]
// lines => [ {points: [{x, y}, {x, y}, {x, y}], color},{points: [], color}, {points: [], color} ]

function App() {
  const [width, setWidth] = useState(window.innerWidth - 100);
  const [height, setHeight] = useState(window.innerHeight - 100);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth - 100);
      setHeight(window.innerHeight - 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-screen h-screen">
      <div className="button-container">
        <button>Undo</button>
        <button>Redo</button>
      </div>
      <Canvas width={width} height={height} />
    </div>
  );
}

export default App;