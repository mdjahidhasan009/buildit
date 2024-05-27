import { cn } from "@/lib/cn";
import {RootState, useSelector} from "@/lib/reduxStore";

export default function ThemeBubble({
  style,
  colors,
  useCustomColorsFromStore,
}: {
  style?: React.CSSProperties;
  colors?: string[];
  useCustomColorsFromStore?: boolean;
}) {
  // const customColors = useStore((state) => state.customColors);
  // const angle = useStore((state) => state.angle);
  const customColors = useSelector((state: RootState) => state.snippet.customColors);
  const angle = useSelector((state: RootState) => state.snippet.angle);

  return (
    <div
      className={cn("h-4 w-4 rounded-full")}
      style={
        style || {
          backgroundImage: `linear-gradient(${angle}deg, ${(useCustomColorsFromStore
            ? customColors
            : colors!
          ).join(", ")})`,
        }
      }
    />
  );
}
