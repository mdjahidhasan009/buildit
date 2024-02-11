import { IBackgroundImageRepository } from '../ports/IBackgroundImageRepository';
import { BackgroundImage } from '../domain/entities/BackgroundImage';

export class BackgroundImageUseCases {
  constructor(private backgroundImageRepository: IBackgroundImageRepository) {}

  async getBackgroundImages(): Promise<BackgroundImage[]> {
    return this.backgroundImageRepository.findAll();
  }

  async getBackgroundImageById(id: string): Promise<BackgroundImage | null> {
    return this.backgroundImageRepository.findById(id);
  }
}
