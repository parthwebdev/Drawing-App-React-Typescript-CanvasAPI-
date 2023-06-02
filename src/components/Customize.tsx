import { useCanvasContext } from "../context/CanvasContext";
import ColorIcon from "../assets/brush";

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
    <div className="flex items-center gap-4">
      <div className="relative">
        <input
          type="color"
          className="w-0 h-0 absolute overflow-hidden"
          id="color-picker"
          value={color}
          onChange={(e) => onColorChange(e)}
        />
        <label htmlFor="color-picker">
          <ColorIcon width={30} height={30} color={color} />
        </label>
      </div>
      <input
        type="range"
        name="width"
        value={width}
        min={1}
        max={20}
        onChange={(e) => onWidthChange(e)}
      />
    </div>
  );
}

export default Customize;
