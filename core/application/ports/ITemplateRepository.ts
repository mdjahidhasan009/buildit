import { Template } from '../../domain/entities/Template';

export interface ITemplateRepository {
  create(templateData: Partial<Template>): Promise<Template>;
  update(id: string, templateData: Partial<Template>): Promise<Template>;
  delete(id: string): Promise<boolean>;
  getById(id: string): Promise<Template | null>;
  findAll(): Promise<Template[]>;
}
