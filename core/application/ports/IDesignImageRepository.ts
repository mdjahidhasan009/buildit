import { DesignImage } from '../../domain/entities/DesignImage';

export interface IDesignImageRepository {
  findAll(): Promise<DesignImage[]>;
  findById(id: string): Promise<DesignImage | null>;
}
