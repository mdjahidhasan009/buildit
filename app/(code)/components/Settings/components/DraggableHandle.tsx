import {
    AnimatePresence,
    motion,
    MotionValue,
    useAnimationControls,
    useDragControls,
    useMotionValueEvent
} from "framer-motion";
import {useMemo, useState} from "react";
import {GripHorizontal, RefreshCcw} from "lucide-react";
import {cn} from "@/lib/cn";

export default function DraggableHandle({ dragControls, animationControls, hasMoved, isDragging }: {
    dragControls: ReturnType<typeof useDragControls>;
    animationControls: ReturnType<typeof useAnimationControls>;
    hasMoved: boolean;
    isDragging: MotionValue<boolean>;
}) {
    const [localIsDragging, setIsLocalDragging] = useState(false);

    useMotionValueEvent(isDragging, "change", (latest) => {
        setIsLocalDragging(latest);
    });

    const icon = useMemo(() => {
        if (!hasMoved || localIsDragging) {
            return <GripHorizontal size={16} aria-hidden="true" />;
        }

        return <RefreshCcw size={14} aria-hidden="true" />;
    }, [hasMoved, localIsDragging]);

    return (
        <motion.div
            onPointerDown={(e) => {
                dragControls.start(e, { snapToCursor: false });
            }}
            onTap={() => {
                if (hasMoved) {
                    animationControls.start({
                        x: 0,
                        y: 0,
                    });
                }
            }}
            whileTap={{ cursor: "grabbing" }}
            tabIndex={-1}
            className={cn(
                "absolute -top-[15px] left-1/2 z-50 flex h-7 w-9 items-center justify-center rounded-md",
                "touch-none select-none outline-none",
                "border border-white/20 bg-black",
                "transition-all duration-100 ease-in-out",
                "hover:scale-110 hover:cursor-grab hover:border-almost-white",
                "active:scale-110 active:border-almost-white"
            )}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={hasMoved && !localIsDragging ? "refresh" : "grip"}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.08, delay: 0.08 }}
                >
                    {icon}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}