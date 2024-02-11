import { Design } from '../../domain/entities/Design';

export interface IDesignRepository {
  create(designData: Partial<Design>): Promise<Design>;
  update(id: string, designData: Partial<Design>): Promise<Design>;
  delete(id: string): Promise<boolean>;
  getById(id: string): Promise<Design | null>;
  findByUserId(userId: string): Promise<Design[]>;
}
