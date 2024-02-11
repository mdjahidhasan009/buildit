import { UserImage } from '../../domain/entities/UserImage';

export interface IUserImageRepository {
  // upload(userId: string, imageFile: File): Promise<UserImage>;
  uploadImage(userId: string, image: Buffer, imageName: string): Promise<UserImage>;
  findByUserId(userId: string): Promise<UserImage[]>;
  delete(id: string): Promise<boolean>;
}
