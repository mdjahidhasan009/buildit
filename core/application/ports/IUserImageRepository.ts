import { UserImage } from '../../domain/entities/UserImage';

export interface IUserImageRepository {
  uploadImage(userId: string, image: string): Promise<UserImage>;
  findByUserId(userId: string): Promise<UserImage[]>;
  delete(id: string): Promise<boolean>;
}
