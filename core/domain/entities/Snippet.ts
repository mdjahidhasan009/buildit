export interface Snippet {
  id: string;
  title?: string;
  code?: string;
  language: string;
  theme: string;
  fontFamily: string;
  fontSize: string;
  lineNumbers: boolean;
  padding: string;
  customColors?: object;
  colorMode: string;
  angle: number;
  grain: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}