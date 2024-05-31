export interface Snippet {
  id: string;
  title?: string | null;
  code?: string | null;
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
  viewCount: number;
}