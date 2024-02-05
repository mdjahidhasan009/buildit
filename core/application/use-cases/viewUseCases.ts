import { ISnippetRepository } from '../ports/ISnippetRepository';
import { IViewRepository } from '../ports/IViewRepository';

export class ViewUseCases {
  constructor(
    private snippetRepository: ISnippetRepository,
    private viewRepository: IViewRepository
  ) {}

  async incrementViewCount(snippetId: string): Promise<void> {
    let view = await this.viewRepository.findBySnippetId(snippetId);

    if (!view) {
      // Initialize view count if it doesn't exist
      view = await this.viewRepository.create({
        snippetId,
        count: 1,
      });
    } else {
      // Increment view count
      await this.viewRepository.update(snippetId, { count: view.count + 1 });
    }
  }
}
