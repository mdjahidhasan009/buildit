import { IDesignRepository } from '../ports/IDesignRepository';
import { ITemplateRepository } from '../ports/ITemplateRepository';
import { IImageStorageService } from '../ports/IImageStorageService';
import { Design } from '@/core/domain/entities/Design';
import {NextResponse} from "next/server";

export class DesignUseCases {
  constructor(
    private designRepository: IDesignRepository,
    private templateRepository: ITemplateRepository,
    private imageStorageService: IImageStorageService
  ) {}

  async createDesign(userId: string, componentsString: string | File, base64Image: string): Promise<Design> {
    let components;
    try {
      if (componentsString) {
        if (typeof componentsString === "string") {
          components = JSON.parse(componentsString);
        } else {
          throw new Error("Components must be a JSON string.");
        }
      }
    } catch (error) {
      console.error('Invalid Json', error);
      throw new Error("Invalid JSON format for components.");
    }
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


  async updateDesign(design_id: string, componentsString: string | File, base64Image: string): Promise<Design> {
    let components;
    try {
      if (componentsString) {
        if (typeof componentsString === "string") {
          components = JSON.parse(componentsString);
        } else {
          throw new Error("Components must be a JSON string.");
        }
      }
    } catch (error) {
      console.error('Invalid Json', error);
      throw new Error("Invalid JSON format for components.");
    }

    const oldDesign = await this.designRepository.getById(design_id);
    if(!oldDesign) {
      throw new Error('Design not found');
    }

    let oldDesignImageUrl = oldDesign?.imageUrl;
    if(oldDesignImageUrl) {
      await this.imageStorageService.deleteImage(oldDesignImageUrl);
    }

    const imageUrl = await this.imageStorageService.uploadImage(base64Image, { folder: "designs", uniqueFilename: true });
    if(!imageUrl) {
      throw new Error('Error uploading image');
    }
    const design = await this.designRepository.update(design_id, {
      components: components?.design,
      imageUrl,
    });

    return design;
  }

  async getDesignById(id: string): Promise<Design | null> {
    return this.designRepository.getById(id);
  }

  async getUserDesigns(userId: string): Promise<Design[]> {
    return this.designRepository.findByUserId(userId);
  }

  async getUserDesignById(userId: string, designId: string): Promise<Design | null> {
    return this.designRepository.getUserDesignById(userId, designId);
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

  async deleteUserDesign(id: string, userId: string): Promise<boolean> {
    return this.designRepository.deleteUserDesign(id, userId);
  }
}
