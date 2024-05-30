import { PrismaClient } from '@prisma/client';

import { ISnippetRepository } from '@/core/application/ports/ISnippetRepository';
import {prepare} from "@/lib/prepare";
import {ISnippetEntry} from "@/core/domain/entities/Snippet";

const prisma = new PrismaClient();

export class PrismaSnippetRepository implements ISnippetRepository {
  async create(snippetData: Partial<ISnippetEntry> & { userId: string }): Promise<ISnippetEntry> {
    // Destructure `userId` from `snippetData` to ensure it is always defined
    const {userId, ...body} = snippetData;

    const preparedData = {
      ...prepare(body),
      userId
    };

    const createdSnippet = await prisma.snippet.create({
      data: {...preparedData}
    });

    return createdSnippet;
  }

  async getAllByUserId(userId: string): Promise<ISnippetEntry[]> {
    const snippets = await prisma.snippet.findMany({
      where: { userId }
    });

    return snippets;
  }

  async getById(id: string): Promise<ISnippetEntry | null> {
    const snippet = await prisma.snippet.findUnique({
      where: {id}
    });

    return snippet;
  }

  async update(id: string, snippetData: Partial<ISnippetEntry>): Promise<ISnippetEntry | null> {
    const { userId, ...body } = snippetData;

    const updatedSnippet = await prisma.snippet.update({
      where: { id, userId },
      data: prepare(body),
    });

    return updatedSnippet;
  }

  async increaseViewCount(snippetId: string): Promise<ISnippetEntry | null> {
    const updatedSnippet = await prisma.snippet.update({
      where: { id: snippetId },
      data: {
        viewCount: {
          increment:  1,
        },
      },
    });

    return updatedSnippet;
  }

  async delete(id: string, userId: string): Promise<ISnippetEntry | boolean> {
    const snippet = await prisma.snippet.findUnique({
      where: { id, userId },
    });

    if (!snippet) {
      return false; // Snippet does not exist
    }

    const res = await prisma.snippet.delete({
      where: { id, userId },
    });

    return res;
  }
}
