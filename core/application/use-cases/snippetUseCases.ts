import { Snippet } from '../../domain/entities/Snippet';
import { ISnippetRepository } from '../ports/ISnippetRepository';
import {PrismaSnippetRepository} from "@/infrastructure/adapters/prismaSnippetRepository";

export class SnippetUseCases {
  constructor(private snippetRepository: ISnippetRepository) {}

  async createSnippet(snippetData: Partial<Snippet>): Promise<Snippet> {
    return this.snippetRepository.create(snippetData);
  }

  async getSnippetById(id: string): Promise<Snippet | null> {
    return this.snippetRepository.getById(id);
  }

  async updateSnippet(id: string, snippetData: Partial<Snippet>): Promise<Snippet | null> {
    return this.snippetRepository.update(id, snippetData);
  }

  async deleteSnippet(id: string): Promise<boolean> {
    return this.snippetRepository.delete(id);
  }
}
