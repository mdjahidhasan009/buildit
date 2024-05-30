import { ISnippetRepository } from '../ports/ISnippetRepository';
import {ISnippetEntry} from "@/core/domain/entities/Snippet";

export class SnippetUseCases {
  constructor( private snippetRepository: ISnippetRepository) {}

  async createSnippet(snippetData: Partial<ISnippetEntry>): Promise<ISnippetEntry> {
    let snippet: ISnippetEntry | null = await this.snippetRepository.create(snippetData);
    return snippet as ISnippetEntry;
  }

  async getSnippets(userId: string): Promise<ISnippetEntry[]> {
    return this.snippetRepository.getAllByUserId(userId);
  }

  async getSnippetById(snippetId: string, userId: string): Promise<ISnippetEntry | null> {
    let snippet = await this.snippetRepository.getById(snippetId);
    if(!snippet) {
      return null;
    }

    if (snippet?.userId.toString() !== userId.toString()) {
      snippet = await this.snippetRepository.increaseViewCount(snippetId);
    }

    return snippet;
  }

  async updateSnippet(id: string, snippetData: Partial<ISnippetEntry>): Promise<ISnippetEntry | null> {
    return this.snippetRepository.update(id, snippetData);
  }

  async deleteSnippet(id: string, userId: string): Promise<ISnippetEntry | boolean> {
    return this.snippetRepository.delete(id, userId);
  }
}
