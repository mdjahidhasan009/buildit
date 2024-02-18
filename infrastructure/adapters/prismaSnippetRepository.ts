import { PrismaClient } from '@prisma/client';

import { ISnippetRepository } from '@/core/application/ports/ISnippetRepository';
import { Snippet } from '@/core/domain/entities/Snippet';
import {prepare} from "@/lib/prepare";
import {DEFAULT_VALUES} from "@/lib/values";

const prisma = new PrismaClient();

export class PrismaSnippetRepository implements ISnippetRepository {
  async create(snippetData: Partial<Snippet>): Promise<Snippet> {
    const { userId, ...body } = snippetData;

    const createdSnippet = await prisma.snippet.create({
      data: {
        userId,
        ...prepare(body),
        customColors: DEFAULT_VALUES.customColors,
        views: { create: { count: 0 } },
      },
      include: { views: true },
    });

    return createdSnippet;
  }

  async getById(id: string): Promise<Snippet | null> {
    return prisma.snippet.findUnique({
      where: { id },
      include: {
        views: true,
      },
    });
  }

  async update(id: string, snippetData: Partial<Snippet>): Promise<Snippet | null> {
    const { userId, ...body } = snippetData;

    return await prisma.snippet.update({
      where: { id, userId },
      data: prepare(body),
    });
  }

  async delete(id: string, userId: string): Promise<boolean> {
    return await prisma.snippet.delete({
      where: { id, userId },
      select: { id: true },
    });

    await prisma.snippet.delete({
      where: { id },
    });

    return true;
  }
}
