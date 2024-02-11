import { IUserImageRepository } from '../ports/IUserImageRepository';
import { UserImage } from '../domain/entities/UserImage';

export class UserImageUseCases {
  constructor(private userImageRepository: IUserImageRepository) {}

  async uploadUserImage(userId: string, image: Buffer, imageName: string): Promise<UserImage> {
    return this.userImageRepository.uploadImage(userId, image, imageName);
  }

  async getUserImages(userId: string): Promise<UserImage[]> {
    return this.userImageRepository.findByUserId(userId);
  }

  async deleteUserImage(id: string): Promise<boolean> {
    return this.userImageRepository.delete(id);
  }
}
