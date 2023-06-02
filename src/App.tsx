import Canvas from "./components/Canvas";
import { useEffect, useState } from "react";
import { CanvasContextProvider } from "./context/CanvasContext";
import Customize from "./components/Customize";
import Controls from "./components/Controls";

function App() {
  const [width, setWidth] = useState(window.innerWidth - 40);
  const [height, setHeight] = useState(window.innerHeight - 40);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth - 40);
      setHeight(window.innerHeight - 40);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <CanvasContextProvider>
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="flex items-center gap-7 fixed bottom-6 left-1/2 -translate-x-1/2 ">
          <Customize />
          <Controls />
        </div>
        <Canvas width={width} height={height} />
      </div>
    </CanvasContextProvider>
  );
}

export default App;
