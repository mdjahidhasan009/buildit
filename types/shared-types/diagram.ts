import { Prisma } from "@prisma/client";

export interface Diagram {
  id: string;
  userId: string;
  title?: string | null;
  editorData?: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput | object | null;
  diagramData?: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput | object | null;
  createdAt: Date;
  updatedAt: Date;
}