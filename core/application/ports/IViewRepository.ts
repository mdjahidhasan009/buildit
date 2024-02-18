import { View } from '../../domain/entities/View';

export interface IViewRepository {
  findBySnippetId(snippetId: string): Promise<View | null>;
  create(viewData: Partial<View>): Promise<View>;
  update(snippetId: string, viewData: Partial<View>): Promise<View>;
  increaseViewCount(snippetId: string): Promise<View>;
}
