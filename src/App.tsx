import Canvas from "./components/Canvas";
import { useEffect, useState } from "react";
import { CanvasContextProvider } from "./context/CanvasContext";
import Customize from "./components/Customize";
import Controls from "./components/Controls";

function App() {
  const [width, setWidth] = useState(window.innerWidth - 20);
  const [height, setHeight] = useState(window.innerHeight - 20);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth - 20);
      setHeight(window.innerHeight - 20);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <CanvasContextProvider>
      <div className="w-screen h-screen">
        <Customize />
        <Controls />
        <Canvas width={width} height={height} />
      </div>
    </CanvasContextProvider>
  );
}

export default App;
