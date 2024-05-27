import { cn } from "@/lib/cn";
import Select from "@/app/(code)/components/Settings/components/Select";
import { SUPPORTED_LANGUAGES } from "@/lib/languages";
import { SUPPORTED_THEMES } from "@/lib/themes";
import { SUPPORTED_FONT_STYLES } from "@/lib/fonts";
import Choices from "@/app/(code)/components/Settings/components/Choices";
import { BASE_FONT_SIZES, BASE_PADDING_VALUES } from "@/lib/values";
import Switch from "@/app/(code)/components/Settings/components/Switch";
import { Control } from "@/app/(code)/components/Settings/components/Control";
import {RootState, useDispatch, useSelector} from "@/lib/reduxStore";
import { update } from "@/lib/features/snippet/snippetSlice";
import { getInitialValue, renderOption } from "@/app/(code)/components/Select/selectUtils";

export function BasicSnippetControls() {
    const dispatch = useDispatch();
    const lineNumbers = useSelector((state: RootState) => state.snippet.lineNumbers);
    const language = useSelector((state: RootState) => state.snippet.language);
    const theme = useSelector((state: RootState) => state.snippet.theme);
    const fontFamily = useSelector((state: RootState) => state.snippet.fontFamily);
    const fontSize = useSelector((state: RootState) => state.snippet.fontSize);
    const padding = useSelector((state: RootState) => state.snippet.padding);

    const handleLineNumbersChange = (value: boolean) => {
        dispatch(update({ type: "lineNumbers", value }));
    };

    const handleLanguageChange = (value: string) => {
        dispatch(update({ type: "language", value }));
    };

    const handleThemeChange = (value: string) => {
        dispatch(update({ type: "theme", value }));
        if (value === "custom") {
            dispatch(update({ type: "hasCustomTheme", value: true }));
        } else {
            dispatch(update({ type: "hasCustomTheme", value: false }));
        }
    };

    const handleFontFamilyChange = (value: string) => {
        dispatch(update({ type: "fontFamily", value }));
    };

    const handleFontSizeChange = (value: string) => {
        dispatch(update({ type: "fontSize", value }));
    };

    const handlePaddingChange = (value: string) => {
        dispatch(update({ type: "padding", value }));
    };

    return (
      <div className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
        "gap-4 md:gap-8",
        "lg:flex lg:flex-row lg:justify-between"
      )}>
          <Control htmlFor="language" label="Language">
              <Select
                type="language"
                options={SUPPORTED_LANGUAGES}
                currentValue={language}
                onValueChange={handleLanguageChange}
                getInitialValue={getInitialValue}
                renderOption={renderOption}
              />
          </Control>
          <Control htmlFor="theme" label="Theme">
              <Select
                type="theme"
                options={SUPPORTED_THEMES}
                currentValue={theme}
                onValueChange={handleThemeChange}
                getInitialValue={getInitialValue}
                renderOption={renderOption}
              />
          </Control>
          <Control htmlFor="fontFamily" label="Font family">
              <Select
                type="fontFamily"
                options={SUPPORTED_FONT_STYLES}
                currentValue={fontFamily}
                onValueChange={handleFontFamilyChange}
                getInitialValue={getInitialValue}
                renderOption={renderOption}
              />
          </Control>
          <Control htmlFor="fontSize" label="Font Size">
              <Choices
                type="fontSize"
                choices={BASE_FONT_SIZES}
                currentValue={fontSize}
                onValueChange={handleFontSizeChange}
              />
          </Control>
          <Control htmlFor="lineNumbers" label="Line numbers">
              <Switch
                type="lineNumbers"
                currentValue={lineNumbers}
                onCheckedChange={handleLineNumbersChange}
              />
          </Control>
          <Control htmlFor="padding" label="Padding">
              <Choices
                type="padding"
                choices={BASE_PADDING_VALUES}
                currentValue={padding}
                onValueChange={handlePaddingChange}
              />
          </Control>
      </div>
    );
}
