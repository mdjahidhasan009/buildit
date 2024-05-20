import {motion} from "framer-motion";
import {cn} from "@/lib/cn";
import Picker from "@/app/(code)/components/Settings/components/Picker";
import Choices from "@/app/(code)/components/Settings/components/Choices";
import {BASE_COLOR_MODES} from "@/lib/values";
import Angle from "@/app/(code)/components/Settings/components/Angle";
import Switch from "@/app/(code)/components/Settings/components/Switch";
import {Control} from "@/app/(code)/components/Settings/components/Control";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/lib/reduxStore";
import {update} from "@/lib/features/snippet/snippetSlice";

export function CustomThemeControls() {
    const dispatch = useDispatch();
    const grain = useSelector((state: RootState) => state.snippet.grain);

    const handleGrainChange = (value: boolean) => {
        dispatch(update({ type: "grain", value }));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.2 }}
            className={cn(
                "flex mt-4 justify-evenly gap-8 rounded-xl pb-4 pt-5",
                "stripes border border-dashed border-white/20 bg-white/[0.04]"
            )}
        >
            <Control htmlFor="colors" label="Colors">
                <Picker />
            </Control>
            <Control htmlFor="colorMode" label="Color mode">
                <Choices type="colorMode" choices={BASE_COLOR_MODES} />
            </Control>
            <Control htmlFor="gradientAngle" label="Gradient angle">
                <Angle />
            </Control>
            <Control htmlFor="grain" label="Grain">
                <Switch type="grain" currentValue={grain} onCheckedChange={handleGrainChange} />
            </Control>
        </motion.div>
    );
}