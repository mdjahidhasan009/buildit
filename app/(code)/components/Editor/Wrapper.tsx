import { useEffect, useMemo, useRef, useState } from "react";
import chroma from "chroma-js";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import {RootState, useSelector} from "@/lib/reduxStore";
import {find} from "@/lib/find";
import {SUPPORTED_THEMES} from "@/lib/themes";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const [marginTop, setMarginTop] = useState(15);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const hasCustomTheme = useSelector((state: RootState) => state.snippet.hasCustomTheme);
  const themeId = useSelector((state: RootState) => state.snippet.theme);
  const theme = find(SUPPORTED_THEMES, themeId);
  const customColors = useSelector((state: RootState) => state.snippet.customColors);
  const colorMode = useSelector((state: RootState) => state.snippet.colorMode);
  const padding = useSelector((state: RootState) => state.snippet.padding);
  const angle = useSelector((state: RootState) => state.snippet.angle);
  const grain = useSelector((state: RootState) => state.snippet.grain);

  const baseColors = useMemo(() => {
    return hasCustomTheme ? customColors : theme.baseColors;
  }, [hasCustomTheme, theme.baseColors, customColors]);

  const gradientColors = useMemo(() => {
    return baseColors.length === 1
      ? [...baseColors, baseColors[0]]
      : chroma
          .scale(baseColors)
          .mode(colorMode)
          .colors(baseColors.length + (baseColors.length - 1));
  }, [baseColors, colorMode]);

  useEffect(() => {
    const updateSize = () => {
      if (wrapperRef.current) {
        const viewportHeight = window.innerHeight;
        const divHeight = wrapperRef.current.clientHeight;
        const heightPercentage = (divHeight / viewportHeight) * 100;

        if (heightPercentage > 40) {
          const excessPercentage = heightPercentage - 40;
          const marginTopReduction = excessPercentage / 0.5;
          const newMarginTop = Math.max(0, 15 - marginTopReduction * 0.5);

          if (newMarginTop !== marginTop) {
            setMarginTop(newMarginTop);
          }
        } else if (marginTop !== 15) {
          setMarginTop(15);
        }
      }
    };

    if (wrapperRef.current) {
      const observer = new ResizeObserver(updateSize);

      observer.observe(wrapperRef.current);

      window.addEventListener("resize", updateSize);

      return () => {
        observer.disconnect();
        window.removeEventListener("resize", updateSize);
      };
    }
  }, [marginTop]);

  return (
    <motion.div
      ref={wrapperRef}
      layoutId="wrapper"
      animate={{
        opacity: 1,
        transition: { duration: 0.1, delay: 0.05 },
      }}
      initial={{ opacity: 0 }}
      className={cn("overflow-hidden", "shadow-xl shadow-black/40 min-w-full lg:min-w-[70%]")}
      style={{
        marginTop: `${marginTop}vh`,
        borderRadius: 8 + +padding / 10,
      }}
    >
      <div
        id="screenshot"
        className={cn(
          // "relative z-0 w-auto min-w-[512px] max-w-[5xl]",
          "relative z-0 min-w-full lg:min-w-[70%] max-w-[5xl]",
          "transition-all duration-100 ease-in-out max-h-[50vh] overflow-y-auto"
        )}
        style={{
          padding: `${padding}px`,
          backgroundImage: `linear-gradient(${angle}deg, ${gradientColors.join(
            ", "
          )})`,
        }}
      >
        <div
          className={cn(
            "invisible absolute inset-0",
            "bg-noise bg-contain opacity-30",
            { "visible": grain }
          )}
        />

        <div
          className={cn(
            // "relative z-[1] h-full w-full min-w-[480px] max-w-2xl rounded-lg"
            "relative z-[1] h-full min-w-full max-w-2xl rounded-lg"
          )}
        >
          <div
            className={cn(
              "absolute inset-0 rounded-lg",
              "after:absolute after:inset-0 after:z-[2] after:translate-y-6 after:rounded-xl after:bg-black/60 after:blur-xl"
            )}
          >
            <div
              className={cn("absolute inset-0 z-[3] rounded-lg")}
              style={{
                backgroundImage: `linear-gradient(${angle}deg, ${gradientColors.join(
                  ", "
                )})`,
              }}
            />
          </div>
          <div className={cn("relative z-[4] rounded-lg", "bg-black/70")}>
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
