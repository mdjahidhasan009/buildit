import { ITemplateRepository } from '../ports/ITemplateRepository';
import { Template } from '../domain/entities/Template';

export class TemplateUseCases {
  constructor(private templateRepository: ITemplateRepository) {}

  async createTemplate(templateData: Partial<Template>): Promise<Template> {
    return this.templateRepository.create(templateData);
  }

  async updateTemplate(id: string, templateData: Partial<Template>): Promise<Template> {
    return this.templateRepository.update(id, templateData);
  }

  async getTemplateById(id: string): Promise<Template | null> {
    return this.templateRepository.getById(id);
  }

  async getAllTemplates(): Promise<Template[]> {
    return this.templateRepository.findAll();
  }

  async deleteTemplate(id: string): Promise<boolean> {
    return this.templateRepository.delete(id);
  }
}
