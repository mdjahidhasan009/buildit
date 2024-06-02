import {IDesignEntry} from "@/core/domain/entities/Design";


export interface IDesignRepository {
  create(designData: Partial<IDesignEntry>): Promise<IDesignEntry>;
  update(id: string, designData: Partial<IDesignEntry>): Promise<IDesignEntry>;
  delete(id: string): Promise<boolean>;
  getById(id: string): Promise<IDesignEntry | null>;
  findByUserId(userId: string): Promise<IDesignEntry[]>;
  getUserDesignById(userId: string, design_id: string): Promise<IDesignEntry | null>;
  deleteUserDesign(userId: string, design_id: string): Promise<boolean>;
}
