import { IUserImageRepository } from '../ports/IUserImageRepository';
import { UserImage } from '@/core/domain/entities/UserImage';
import {IImageStorageService} from "@/core/application/ports/IImageStorageService";

export class UserImageUseCases {
  constructor(
    private userImageRepository: IUserImageRepository,
    private imageStorageService: IImageStorageService
  ) {}

  async uploadUserImage(userId: string, base64Image: string): Promise<UserImage> {
    const imageUrl = await this.imageStorageService.uploadImage(base64Image, { folder: "designs", uniqueFilename: true });
    if(!imageUrl) {
      throw new Error('Error uploading image');
    }
    return await this.userImageRepository.uploadImage(userId, imageUrl);
  }

  async getUserImages(userId: string): Promise<UserImage[]> {
    return this.userImageRepository.findByUserId(userId);
  }

  async deleteUserImage(id: string): Promise<boolean> {
    return this.userImageRepository.delete(id);
  }
}
