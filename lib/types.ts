import {Extension} from "@codemirror/state";
import {Snippet} from "@/core/domain/entities/Snippet";
import {ISnippet, SnippetViews} from "@/app/(code)/constants/ISnippet";
import {IComponent} from "@/lib/features/components/IComponent";
import {ReactNode} from "react";

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

export type Message =
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
  message: Message;
  hasCustomTheme: boolean;
};

export type AppState = {
  id: string | null;
  title: string | null;
  code: string | null;
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

// export interface Store extends AppStatus, AppState {
//   update: <
//     T extends string,
//     V extends
//         | string
//       | number
//       | boolean
//       | LanguageDefinition
//       | ThemeDefinition
//       | FontDefinition
//   >(
//     type: T,
//     value: V
//   ) => void;
//   setAppState: (snippet: Partial<ISnippet>) => void;
//   getAppState: () => AppState;
//   setCustomColor: (c: string, i: number) => void;
//   addCustomColor: (c: string) => void;
//   removeCustomColor: (i: number) => void;
// }

export interface IDesign {
  id: string;
  userId: string;
  components: IComponent[];
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface IReactNode {
  children: ReactNode;
}