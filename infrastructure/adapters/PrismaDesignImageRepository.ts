// infrastructure/adapters/PrismaDesignImageRepository.ts

import { PrismaClient } from '@prisma/client';
import { IDesignImageRepository } from '@/core/application/ports/IDesignImageRepository';
import { DesignImage } from '@/core/domain/entities/DesignImage';

const prisma = new PrismaClient();

export class PrismaDesignImageRepository implements IDesignImageRepository {
  async findAll(): Promise<DesignImage[]> {
    return prisma.designImage.findMany();
  }

  async findById(id: string): Promise<DesignImage | null> {
    return prisma.designImage.findUnique({
      where: { id },
    });
  }
}
