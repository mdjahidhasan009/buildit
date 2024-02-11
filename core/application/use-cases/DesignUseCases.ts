import { IDesignRepository } from '../ports/IDesignRepository';
import { ITemplateRepository } from '../ports/ITemplateRepository';
import { IImageStorageService } from '../ports/IImageStorageService';
import { Design } from '@/core/domain/entities/Design';

export class DesignUseCases {
  constructor(
    private designRepository: IDesignRepository,
    private templateRepository: ITemplateRepository,
    private imageStorageService: IImageStorageService
  ) {}

  async createDesign(userId: string, components: object, base64Image: string): Promise<Design> {
    // Assuming components is already an object; adjust if it's a JSON string that needs parsing.
    // The base64Image parameter is expected to be a base64 string of the image.
    const imageUrl = await this.imageStorageService.uploadImage(base64Image, { folder: "designs", uniqueFilename: true });
    const design = await this.designRepository.create({
      userId,
      components: [components],
      imageUrl,
    });
    return design;
  }


  async updateDesign(id: string, userId: string, components: object, imageFile?: File): Promise<Design> {
    let imageUrl;
    if (imageFile) {
      imageUrl = await this.imageStorageService.uploadImage(imageFile);
    }
    return this.designRepository.update(id, {
      userId,
      components,
      ...(imageUrl && { imageUrl }),
    });
  }

  async getDesignById(id: string): Promise<Design | null> {
    return this.designRepository.getById(id);
  }

  async getUserDesigns(userId: string): Promise<Design[]> {
    return this.designRepository.findByUserId(userId);
  }

  async createDesignFromTemplate(userId: string, templateId: string): Promise<Design> {
    const template = await this.templateRepository.getById(templateId);
    if (!template) {
      throw new Error('Template not found');
    }
    return this.designRepository.create({
      userId,
      components: template.components,
      imageUrl: template.imageUrl,
    });
  }

  async deleteDesign(id: string, userId: string): Promise<boolean> {
    return this.designRepository.delete(id, userId);
  }

  // Additional methods as needed...
}
