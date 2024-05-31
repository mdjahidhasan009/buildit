import { ISnippetRepository } from '../ports/ISnippetRepository';
import {ISnippetEntity} from "@/core/domain/entities/Snippet";

export class SnippetUseCases {
  constructor( private snippetRepository: ISnippetRepository) {}

  async createSnippet(snippetData: Partial<ISnippetEntity>): Promise<ISnippetEntity> {
    let snippet: ISnippetEntity | null = await this.snippetRepository.create(snippetData);
    return snippet as ISnippetEntity;
  }

  async getSnippets(userId: string): Promise<ISnippetEntity[]> {
    return this.snippetRepository.getAllByUserId(userId);
  }

  async getSnippetById(snippetId: string, userId: string): Promise<ISnippetEntity | null> {
    let snippet = await this.snippetRepository.getById(snippetId);
    if(!snippet) {
      return null;
    }

    if (snippet?.userId.toString() !== userId.toString()) {
      snippet = await this.snippetRepository.increaseViewCount(snippetId);
    }

    return snippet;
  }

  async updateSnippet(id: string, snippetData: Partial<ISnippetEntity>): Promise<ISnippetEntity | null> {
    return this.snippetRepository.update(id, snippetData);
  }

  async deleteSnippet(id: string, userId: string): Promise<ISnippetEntity | boolean> {
    return this.snippetRepository.delete(id, userId);
  }
}
