import { Snippet } from '@/core/domain/entities/Snippet';

export interface ISnippetRepository {
  create(snippetData: Partial<Snippet>): Promise<Snippet>;
  getById(id: string): Promise<Snippet | null>;
  update(id: string, snippetData: Partial<Snippet>): Promise<Snippet | null>;
  delete(id: string, userId: string): Promise<boolean>;
}