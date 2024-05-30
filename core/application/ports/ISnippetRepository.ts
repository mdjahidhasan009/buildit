import {ISnippetEntry} from "@/core/domain/entities/Snippet";

export interface ISnippetRepository {
  create(snippetData: Partial<ISnippetEntry>): Promise<ISnippetEntry>;
  getById(id: string): Promise<ISnippetEntry | null>;
  update(id: string, snippetData: Partial<ISnippetEntry>): Promise<ISnippetEntry | null>;
  delete(id: string, userId: string): Promise<ISnippetEntry | boolean>;
  getAllByUserId(userId: string): Promise<ISnippetEntry[]>;
  increaseViewCount(snippetId: string): Promise<ISnippetEntry | null>;
}