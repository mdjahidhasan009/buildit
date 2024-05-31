import {ISnippetEntity} from "@/core/domain/entities/Snippet";

export interface ISnippetRepository {
  create(snippetData: Partial<ISnippetEntity>): Promise<ISnippetEntity>;
  getById(id: string): Promise<ISnippetEntity | null>;
  update(id: string, snippetData: Partial<ISnippetEntity>): Promise<ISnippetEntity | null>;
  delete(id: string, userId: string): Promise<ISnippetEntity | boolean>;
  getAllByUserId(userId: string): Promise<ISnippetEntity[]>;
  increaseViewCount(snippetId: string): Promise<ISnippetEntity | null>;
}