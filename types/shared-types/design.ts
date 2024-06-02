import { Prisma } from "@prisma/client";

export interface Design {
  id: string;
  userId: string;
  components?: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput | object | null;
  imageUrl?: string | null
  createdAt: Date
  updatedAt: Date
}