import { IDesignImageRepository } from '../ports/IDesignImageRepository';
import { DesignImage } from '../domain/entities/DesignImage';

export class DesignImageUseCases {
  constructor(private designImageRepository: IDesignImageRepository) {}

  async getDesignImages(): Promise<DesignImage[]> {
    return this.designImageRepository.findAll();
  }

  async getDesignImageById(id: string): Promise<DesignImage | null> {
    return this.designImageRepository.findById(id);
  }
}
