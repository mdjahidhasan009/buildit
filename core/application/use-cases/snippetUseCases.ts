import { Snippet } from '../../domain/entities/Snippet';
import { ISnippetRepository } from '../ports/ISnippetRepository';
import {IViewRepository} from "@/core/application/ports/IViewRepository";

export class SnippetUseCases {
  constructor(
    private snippetRepository: ISnippetRepository,
    private viewRepository: IViewRepository
  ) {}

  async createSnippet(snippetData: Partial<Snippet>): Promise<Snippet> {
    return this.snippetRepository.create(snippetData);
  }

  async getSnippetById(snippetId: string, userId: string): Promise<Snippet | null> {
    let snippet = await this.snippetRepository.getById(snippetId);
    if(!snippet) {
      return null;
    }

    console.log(userId, snippet?.userId, snippet?.userId.toString() !== userId.toString())

    if (snippet?.userId.toString() !== userId.toString()) {
      await this.viewRepository.increaseViewCount(snippetId);
      snippet = await this.snippetRepository.getById(snippetId);
    }

    return snippet;
  }

  async updateSnippet(id: string, snippetData: Partial<Snippet>): Promise<Snippet | null> {
    return this.snippetRepository.update(id, snippetData);
  }

  async deleteSnippet(id: string, userId: string): Promise<boolean> {
    return this.snippetRepository.delete(id, userId);
  }
}
