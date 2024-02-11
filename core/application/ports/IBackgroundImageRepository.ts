import { BackgroundImage } from '../../domain/entities/BackgroundImage';

export interface IBackgroundImageRepository {
  findAll(): Promise<BackgroundImage[]>;
  findById(id: string): Promise<BackgroundImage | null>;
}
