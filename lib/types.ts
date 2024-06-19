import {Extension} from "@codemirror/state";
import {ReactNode} from "react";
import {ISnippet} from "@/app/(code)/constants/Snippet";
import {IDesignComponent} from "@/app/(design)/constants/Design";

export type ChoiceDefinition = {
  id: string;
  label: string;
  class: string;
};

export type ThemeDefinition = {
  id: string;
  label: string;
  baseColors: string[];
  class?: string;
  type: string;
};

export type LanguageDefinition = {
  id: string;
  label: string;
  extension: () => Promise<Extension>;
  type: string;
};

export type FontDefinition = {
  id: string;
  label: string;
  variable: string;
  class: string;
  type: string;
};

export type TMessage =
  | "SUCCESS"
  | "ERROR"
  | "UNAUTHORIZED"
  | "TOO_MANY_REQUESTS"
  | "LIMIT_REACHED"
  | "EMPTY_EDITOR"
  | "UNKNOWN_ERROR"
  | "SNIPPET_NOT_FOUND"
  | "INTERNAL_SERVER_ERROR"
  | "PENDING"
  | "IDLE"
  | "CLIPBOARD_API_NOT_SUPPORTED";

export type AppStatus = {
  message: TMessage;
  hasCustomTheme: boolean;
};

export type AppState = {
  allSnippets: ISnippet[];
  id: string | null;
  title: string | "";
  code: string | "";
  // language: LanguageDefinition;
  language: string;
  theme: string;
  fontFamily: string;
  fontSize: string;
  lineNumbers: boolean;
  padding: string;
  customColors: string[];
  colorMode: any;
  angle: number;
  grain: boolean;
  message: string;
  hasCustomTheme: boolean;
};

// export interface IDesign {
//   id: string;
//   userId: string;
//   components: IDesignComponent[];
//   imageUrl: string;
//   createdAt: string;
//   updatedAt: string;
// }

export interface IReactNode {
  children: ReactNode;
}