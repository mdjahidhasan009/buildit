import {cn} from "@/lib/cn";
import Select from "@/app/(code)/components/Settings/components/Select";
import {SUPPORTED_LANGUAGES} from "@/lib/languages";
import {SUPPORTED_THEMES} from "@/lib/themes";
import {SUPPORTED_FONT_STYLES} from "@/lib/fonts";
import Choices from "@/app/(code)/components/Settings/components/Choices";
import {BASE_FONT_SIZES, BASE_PADDING_VALUES} from "@/lib/values";
import Switch from "@/app/(code)/components/Settings/components/Switch";
import {Control} from "@/app/(code)/components/Settings/components/Control";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/lib/reduxStore";
import {update} from "@/lib/features/snippet/snippetSlice";

export function BasicSnippetControls() {
    const dispatch = useDispatch();
    const lineNumbers = useSelector((state: RootState) => state.snippet.lineNumbers);

    const handleLineNumbersChange = (value: boolean) => {
        dispatch(update({ type: "lineNumbers", value }));
    };

    return (
        <div className={cn(
            "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
            "gap-4 md:gap-8",
            "lg:flex lg:flex-row lg:justify-between"
        )}>
            <Control htmlFor="language" label="Language">
                <Select type="language" options={SUPPORTED_LANGUAGES} />
            </Control>
            <Control htmlFor="theme" label="Theme">
                <Select type="theme" options={SUPPORTED_THEMES} />
            </Control>
            <Control htmlFor="fontFamily" label="Font family">
                <Select type="fontFamily" options={SUPPORTED_FONT_STYLES} />
            </Control>
            <Control htmlFor="fontSize" label="Font Size">
                <Choices type="fontSize" choices={BASE_FONT_SIZES} />
            </Control>
            <Control htmlFor="lineNumbers" label="Line numbers">
                <Switch type="lineNumbers" currentValue={lineNumbers} onCheckedChange={handleLineNumbersChange} />
            </Control>
            <Control htmlFor="padding" label="Padding">
                <Choices type="padding" choices={BASE_PADDING_VALUES} />
            </Control>
        </div>
    );
}