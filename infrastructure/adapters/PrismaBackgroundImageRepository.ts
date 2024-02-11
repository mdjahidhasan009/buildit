// infrastructure/adapters/PrismaBackgroundImageRepository.ts

import { PrismaClient } from '@prisma/client';
import { IBackgroundImageRepository } from '@/core/application/ports/IBackgroundImageRepository';
import { BackgroundImage } from '@/core/domain/entities/BackgroundImage';

const prisma = new PrismaClient();

export class PrismaBackgroundImageRepository implements IBackgroundImageRepository {
  async findAll(): Promise<BackgroundImage[]> {
    return prisma.backgroundImage.findMany();
  }

  async findById(id: string): Promise<BackgroundImage | null> {
    return prisma.backgroundImage.findUnique({
      where: { id },
    });
  }
}
