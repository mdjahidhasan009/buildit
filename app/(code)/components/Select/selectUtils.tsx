import { cn } from "@/lib/cn";
import ThemeBubble from "@/components/shared/ui/ThemeBubble";
import {
  LanguageDefinition,
  ThemeDefinition,
  FontDefinition,
} from "@/lib/types";
import { SUPPORTED_LANGUAGES } from "@/lib/languages";
import { SUPPORTED_THEMES } from "@/lib/themes";
import { SUPPORTED_FONT_STYLES } from "@/lib/fonts";

export function getInitialValue(value: any) {
  switch (value.type) {
    case 'language':
      return <span>{(value as LanguageDefinition).label}</span>;
    case 'theme':
      return (
        <ThemeBubble
          colors={(value as ThemeDefinition).baseColors}
          useCustomColorsFromStore={(value as ThemeDefinition).id === "custom"}
        />
      );
    case 'fontFamily':
      return <span className={(value as FontDefinition).class}>{value.label}</span>;
    default:
      return null;
  }
}

export function renderOption(option: any) {
  switch (option.type) {
    case 'language':
      return <span className={cn("block truncate pr-11")}>{option.label}</span>;
    case 'theme':
      return (
        <div className={cn("flex items-center gap-3")}>
          <ThemeBubble
            colors={option.baseColors}
            useCustomColorsFromStore={option.id === "custom"}
          />
          <span className={cn("block truncate")}>{option.label}</span>
        </div>
      );
    case 'fontFamily':
      return (
        <span className={cn("block truncate pr-12", option.class)}>
          {option.label}
        </span>
      );
    default:
      return null;
  }
}

export function findValue(type: string, currentValue: string) {
  switch (type) {
    case 'language':
      return SUPPORTED_LANGUAGES.find(lang => lang.id === currentValue);
    case 'theme':
      return SUPPORTED_THEMES.find(theme => theme.id === currentValue);
    case 'fontFamily':
      return SUPPORTED_FONT_STYLES.find(font => font.id === currentValue);
    default:
      return undefined;
  }
}
