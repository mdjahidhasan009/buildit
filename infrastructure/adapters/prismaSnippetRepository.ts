import { PrismaClient } from '@prisma/client';

import { ISnippetRepository } from '@/core/application/ports/ISnippetRepository';
import { Snippet } from '@/core/domain/entities/Snippet';
import {prepare} from "@/lib/prepare";
import {DEFAULT_VALUES} from "@/lib/values";
import {LanguageDefinition} from "@/lib/types";

const prisma = new PrismaClient();

export class PrismaSnippetRepository implements ISnippetRepository {
  async create(snippetData: Partial<Snippet> & { userId: string }): Promise<Snippet> {
    // Destructure `userId` from `snippetData` to ensure it is always defined
    const { userId, ...body } = snippetData;

    // Use `prepare` and ensure `userId` is included in the payload
    const preparedData = {
      ...prepare(body),
      userId,
      customColors: DEFAULT_VALUES.customColors,
      // Add more fields as necessary
    };

    // If your Prisma model expects `views` to be created alongside `snippet`, ensure it's structured correctly
    const createdSnippet = await prisma.snippet.create({
      data: {
        ...preparedData,
        views: {
          create: {
            count: 0,
          },
        },
      },
      include: { views: true },
    });

    // Ensure the return type matches `Snippet`. You might need to adjust based on your actual `Snippet` interface
    return createdSnippet as Snippet;
  }

  // async getAllByUserId(userId: string): Promise<Snippet[]> {
  //   return prisma.snippet.findMany({
  //     where: {
  //       userId,
  //     },
  //     include: {
  //       views: true,
  //     },
  //   });
  // }

  async getAllByUserId(userId: string): Promise<Snippet[]> {
    const snippets = await prisma.snippet.findMany({
      where: {
        userId,
      },
      include: {
        views: true,
      },
    });

    const transformedSnippets: Snippet[] = snippets.map(snippet => ({
      ...snippet,
      title: snippet.title ?? undefined,
      code: snippet.code ?? undefined,
      // Ensure customColors is transformed correctly
      customColors: typeof snippet.customColors === 'object' && snippet.customColors !== null ? snippet.customColors : undefined,
    }));

    return transformedSnippets;
  }



  // async getById(id: string): Promise<Snippet | null> {
  //   return prisma.snippet.findUnique({
  //     where: { id },
  //     include: {
  //       views: true,
  //     },
  //   });
  // }

  async getById(id: string): Promise<Snippet | null> {
    const snippet = await prisma.snippet.findUnique({
      where: { id },
      include: {
        views: true,
      },
    });

    if (!snippet) return null;

    // Transform the snippet to match the Snippet interface
    const transformedSnippet: Snippet = {
      ...snippet,
      title: snippet.title ?? undefined, // Convert null to undefined
      code: snippet.code ?? undefined,
      // Convert other nullable fields similarly
      customColors: snippet.customColors ? (typeof snippet.customColors === 'object' ? snippet.customColors : undefined) : undefined,
      // Handle views if necessary, depending on your Snippet interface
    };

    return transformedSnippet;
  }


  // async update(id: string, snippetData: Partial<Snippet>): Promise<Snippet | null> {
  //   const { userId, ...body } = snippetData;
  //
  //   return await prisma.snippet.update({
  //     where: { id, userId },
  //     data: prepare(body),
  //   });
  // }

  async update(id: string, snippetData: Partial<Snippet>): Promise<Snippet | null> {
    const { userId, ...body } = snippetData;

    const updatedSnippet = await prisma.snippet.update({
      where: { id, userId },
      data: prepare(body),
    });

    if (!updatedSnippet) return null;

    // Transform the updatedSnippet to match the Snippet interface
    const transformedUpdatedSnippet: Snippet = {
      ...updatedSnippet,
      title: updatedSnippet.title ?? undefined, // Convert null to undefined
      code: updatedSnippet.code ?? undefined,
      // Convert other nullable fields similarly
      customColors: updatedSnippet.customColors ?
        (typeof updatedSnippet.customColors === 'object' ? updatedSnippet.customColors : undefined) : undefined,
      // Handle views if necessary, depending on your Snippet interface
    };

    return transformedUpdatedSnippet;
  }


  // async delete(id: string, userId: string): Promise<boolean> {
  //   return await prisma.snippet.delete({
  //     where: { id, userId },
  //     select: { id: true },
  //   });
  //
  //   await prisma.snippet.delete({
  //     where: { id },
  //   });
  //
  //   return true;
  // }

  async delete(id: string, userId: string): Promise<boolean> {
    const snippet = await prisma.snippet.findUnique({
      where: { id, userId },
    });

    if (!snippet) {
      return false; // Snippet does not exist
    }

    await prisma.snippet.delete({
      where: { id, userId },
    });

    return true; // Successful deletion
  }

}
