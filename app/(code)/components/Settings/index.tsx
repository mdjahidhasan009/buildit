import { cn } from "@/lib/cn";
import {
  motion,
  useAnimationControls,
  useDragControls,
  useMotionValue,
} from "framer-motion";
import { useRef, useState } from "react";
import Actions from "./Actions";
import {useSelector} from "react-redux";
import {RootState} from "@/lib/reduxStore";
import DraggableHandle from "@/app/(code)/components/Settings/DraggableHandle";
import {CustomThemeControls} from "@/app/(code)/components/Settings/CustomThemeControls";
import {BasicSnippetControls} from "@/app/(code)/components/Settings/BasicSnippetControls";

export default function Settings() {
  const [hasMoved, setHasMoved] = useState(false);

  const constraintsRef = useRef(null);

  const dragControls = useDragControls();
  const animationControls = useAnimationControls();
  const isDragging = useMotionValue(false);

  // const hasCustomTheme = useStore((state) => state.hasCustomTheme);
  const hasCustomTheme = useSelector((state: RootState) => state.snippet.hasCustomTheme);

  return (
    <>
      <div
        key={`settings-expanded-${hasCustomTheme}`}
        ref={constraintsRef}
        className={cn(
          "fixed bottom-6 left-6 right-6 top-[88px] -z-10",
          "pointer-events-none"
        )}
      />
      <motion.div
        id="settings"
        drag
        dragListener={false}
        dragMomentum={false}
        dragControls={dragControls}
        dragConstraints={constraintsRef}
        onDragStart={() => isDragging.set(true)}
        onDragEnd={(_, info) => {
          isDragging.set(false);

          if (!hasMoved && (info.point.x !== 0 || info.point.y !== 0)) {
            setHasMoved(true);
          }
        }}
        animate={animationControls}
        onUpdate={({ x, y }) => {
          if (hasMoved && x === 0 && y === 0) {
            setHasMoved(false);
          }
        }}
        className={cn(
          "fixed bottom-12 z-40 w-[90%] max-w-[960px] rounded-xl font-medium",
          "border border-white/20 bg-black/50 shadow-xl shadow-black/40 backdrop-blur-md"
        )}
      >
        <DraggableHandle
          dragControls={dragControls}
          animationControls={animationControls}
          hasMoved={hasMoved}
          isDragging={isDragging}
        />
        <div
          className={cn(
            "relative flex-col rounded-xl px-4 pb-4 pt-5",
            "border-b border-white/20 bg-black shadow-xl shadow-black/40",
            "transition-all duration-100 ease-in-out",
            hasCustomTheme ? "h-[211px]" : "h-[150px] overflow-y-auto lg:h-[97px]"
          )}
        >
          <BasicSnippetControls />
          {hasCustomTheme && <CustomThemeControls />}
        </div>

        <Actions />
      </motion.div>
    </>
  );
}