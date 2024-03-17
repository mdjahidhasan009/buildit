import { cn } from "@/lib/cn";
import { debounce } from "@/lib/debounce";
import { HexColorInput, HexColorPicker } from "react-colorful";
import Popover from "@/components/shared/ui/Popover";
import { Minus, Plus } from "lucide-react";
import chroma from "chroma-js";
import {useDispatch, useSelector} from "react-redux";
import {addCustomColor, removeCustomColor, setCustomColor} from "@/lib/features/snippet/snippetSlice";
import {RootState} from "@/lib/reduxStore";

export default function Picker() {
  // const customColors = useStore((state) => state.customColors);
  // const setCustomColor = useStore((state) => state.setCustomColor);
  // const addCustomColor = useStore((state) => state.addCustomColor);
  // const removeCustomColor = useStore((state) => state.removeCustomColor);
  const dispatch = useDispatch();
  const customColors = useSelector((state: RootState) => state.snippet.customColors);

  return (
    <div className={cn("flex h-8 w-28 gap-2 rounded-lg")}>
      {customColors.map((color, idx: number) => (
        <div key={idx} className={cn("relative", "group")}>
          <Popover
            content={
              <SingleColor
                color={color}
                setCustomColor={(newColor) => {
                  dispatch(setCustomColor({ color: newColor, index: idx }))}
              }
              />
            }
            sideOffset={12}
          >
            <button
              className={cn(
                "h-full w-8 overflow-hidden rounded-lg",
                "outline-none",
                "border-2 border-white/20",
                "transition-all animate-in zoom-in duration-100 ease-in-out",
                "focus:ring-1 focus:ring-amlost-white focus:ring-offset-2 focus:ring-offset-black"
              )}
              style={{
                background: color,
              }}
            />
          </Popover>

          {customColors.length > 1 && (
            <button
              onClick={() => dispatch(removeCustomColor({ index: idx }))}
              className={cn(
                "absolute -right-2 -top-2 hidden h-5 w-5 items-center justify-center rounded-full",
                "select-none outline-none",
                "border border-white/20 bg-black",
                "transition-all animate-in zoom-in duration-100 ease-in-out",
                "hover:border-amlost-white hover:text-amlost-white",
                "group-hover:flex"
              )}
            >
              <Minus size={12} aria-hidden="true" />
              <span className="sr-only">Remove color</span>
            </button>
          )}
        </div>
      ))}

      {customColors.length < 3 && (
        <button
          onClick={() => dispatch(addCustomColor({ color: chroma.random().hex() }))}
          className={cn(
            "flex h-full w-8 items-center justify-center rounded-lg",
            "select-none outline-none",
            "transition-all duration-100 ease-in-out",
            "focus:text-amlost-white focus:outline-1 focus:outline-offset-2 focus:outline-amlost-white"
          )}
        >
          <Plus size={12} aria-hidden="true" />
          <span className="sr-only">Add color</span>
        </button>
      )}
    </div>
  );
}

function SingleColor({
  color,
  setCustomColor,
}: {
  color: string;
  setCustomColor: (color: string) => void;
}) {
  return (
    <section className={cn("flex flex-col gap-3", "picker")}>
      <HexColorPicker color={color} onChange={debounce(setCustomColor, 300)} />

      <HexColorInput
        color={color}
        onChange={debounce(setCustomColor, 300)}
        className={cn(
          "text-center font-medium uppercase",
          "outline-none",
          "bg-transparent text-amlost-white/40",
          "transition-all duration-100 ease-in-out",
          "focus:text-amlost-white"
        )}
      />
    </section>
  );
}
