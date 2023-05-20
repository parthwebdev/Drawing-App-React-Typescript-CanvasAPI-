import { useCanvasContext } from "../context/CanvasContext";

function Customize() {
  const { color, width, setColor, setWidth } = useCanvasContext();

  function onColorChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setColor(value);
  }

  function onWidthChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value);
    setWidth(value);
  }

  return (
    <>
      <input type="color" value={color} onChange={(e) => onColorChange(e)} />
      <input
        type="range"
        name="width"
        value={width}
        min={1}
        max={20}
        onChange={(e) => onWidthChange(e)}
      />
    </>
  );
}

export default Customize;
