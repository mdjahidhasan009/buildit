import { FontDefinition } from "./types";

export const SUPPORTED_FONT_STYLES: FontDefinition[] = [
  {
    id: "fira_code",
    label: "Fira Code",
    variable: "var(--font-fira-code)",
    class: "font-fira-code",
    type: "fontFamily"
  },
  {
    id: "jetbrains_mono",
    label: "JetBrains Mono",
    variable: "var(--font-jetbrains-mono)",
    class: "font-jetbrains-mono",
    type: "fontFamily"
  },
  {
    id: "inconsolata",
    label: "Inconsolata",
    variable: "var(--font-inconsolata)",
    class: "font-inconsolata",
    type: "fontFamily"
  },
  {
    id: "source_code_pro",
    label: "Source Code Pro",
    variable: "var(--font-source-code-pro)",
    class: "font-source-code-pro",
    type: "fontFamily"
  },
  {
    id: "ibm_plex_mono",
    label: "IBM Plex Mono",
    variable: "var(--font-ibm-plex-mono)",
    class: "font-ibm-plex-mono",
    type: "fontFamily"
  },
];
