export interface SnippetViews {
  count: number;
  snippetId: string;
}

export interface ISnippet {
  id: string;
  title: string;
  code: string;
  language: string;
  theme: string;
  fontFamily: string;
  fontSize: string;
  lineNumbers: boolean;
  padding: string;
  customColors: string[];
  colorMode: string;
  angle: number;
  grain: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  views: SnippetViews;
}
