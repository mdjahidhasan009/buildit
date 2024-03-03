// infrastructure/adapters/PrismaTemplateRepository.ts

import { PrismaClient } from '@prisma/client';
import { ITemplateRepository } from '@/core/application/ports/ITemplateRepository';
import { Template } from '@/core/domain/entities/Template';

const prisma = new PrismaClient();

export class PrismaTemplateRepository implements ITemplateRepository {
  // async create(templateData: Partial<Template>): Promise<Template> {
  //   return prisma.template.create({
  //     data: templateData,
  //   });
  // }

  async create(templateData: Partial<Template>): Promise<Template> {
    // Ensure components is an array (or undefined if not provided)
    const dataWithCorrectedComponents = {
      ...templateData,
      components: Array.isArray(templateData.components) ? templateData.components : undefined,
    };

    const createdTemplate = await prisma.template.create({
      data: dataWithCorrectedComponents,
    });

    return createdTemplate as Template;
  }

  // async update(id: string, templateData: Partial<Template>): Promise<Template> {
  //   return prisma.template.update({
  //     where: { id },
  //     data: templateData,
  //   });
  // }

  async update(id: string, templateData: Partial<Template>): Promise<Template> {
    const updatedTemplate = await prisma.template.update({
      where: { id },
      data: templateData,
    });

    // Convert imageUrl from null to undefined if necessary
    const safeUpdatedTemplate: Template = {
      ...updatedTemplate,
      imageUrl: updatedTemplate.imageUrl ?? undefined,
    };

    return safeUpdatedTemplate;
  }


  async delete(id: string): Promise<boolean> {
    await prisma.template.delete({
      where: { id },
    });
    return true;
  }

  // async getById(template_id: string): Promise<Template | null> {
  //   return prisma.template.findUnique({
  //     where: { id: template_id },
  //   });
  // }

  async getById(template_id: string): Promise<Template | null> {
    const template = await prisma.template.findUnique({
      where: { id: template_id },
    });

    if (!template) {
      return null;
    }

    // Convert imageUrl from null to undefined if necessary
    const safeTemplate: Template = {
      ...template,
      imageUrl: template.imageUrl ?? undefined,
    };

    return safeTemplate;
  }


  // async findAll(): Promise<Template[]> {
  //   return prisma.template.findMany();
  // }

  async findAll(): Promise<Template[]> {
    const templates = await prisma.template.findMany();

    // Convert imageUrl from null to undefined for each template
    const safeTemplates: Template[] = templates.map(template => ({
      ...template,
      imageUrl: template.imageUrl ?? undefined, // Convert null to undefined
    }));

    return safeTemplates;
  }

}
