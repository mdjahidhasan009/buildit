// infrastructure/adapters/PrismaTemplateRepository.ts

import { PrismaClient } from '@prisma/client';
import { ITemplateRepository } from '@/core/application/ports/ITemplateRepository';
import { Template } from '@/core/domain/entities/Template';

const prisma = new PrismaClient();

export class PrismaTemplateRepository implements ITemplateRepository {
  async create(templateData: Partial<Template>): Promise<Template> {
    return prisma.template.create({
      data: templateData,
    });
  }

  async update(id: string, templateData: Partial<Template>): Promise<Template> {
    return prisma.template.update({
      where: { id },
      data: templateData,
    });
  }

  async delete(id: string): Promise<boolean> {
    await prisma.template.delete({
      where: { id },
    });
    return true;
  }

  async getById(id: string): Promise<Template | null> {
    return prisma.template.findUnique({
      where: { id },
    });
  }

  async findAll(): Promise<Template[]> {
    return prisma.template.findMany();
  }
}
