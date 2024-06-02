import { PrismaClient } from '@prisma/client';
import { IDesignRepository } from '@/core/application/ports/IDesignRepository';
import {IDesignEntry} from "@/core/domain/entities/Design";

const prisma = new PrismaClient();

export class PrismaDesignRepository implements IDesignRepository {
  async create(designData: IDesignEntry): Promise<IDesignEntry> {
    const createdDesign = await prisma.design.create({
      data: {
        ...designData,
        components: designData.components || {}
      }
    });

    return createdDesign;
  }

  async update(design_id: string, designData: Partial<IDesignEntry>): Promise<IDesignEntry> {
    // Validate or transform 'components' here if necessary
    // For example, ensuring it's not 'null' if your schema doesn't allow 'null'
    const safeDesignData = {
      ...designData,
      components: designData.components || {}
    };

    return prisma.design.update({
      where: { id: design_id },
      data: safeDesignData,
    });
  }

  async delete(id: string): Promise<boolean> {
    await prisma.design.delete({
      where: { id },
    });
    return true;
  }

  async getById(design_id: string): Promise<IDesignEntry | null> {
    const IdesignEntry = await prisma.design.findUnique({
      where: { id: design_id },
    });

    if (!IdesignEntry) return null;

    // Adjust handling here to ensure imageUrl is either a string or undefined
    const safeImageUrl = IdesignEntry.imageUrl !== null ? IdesignEntry.imageUrl : undefined;

    // Construct the safeDesign object with adjusted imageUrl and components
    const safeDesign: IDesignEntry = {
      ...IdesignEntry,
      imageUrl: safeImageUrl,
      components: typeof IdesignEntry.components === 'object' && IdesignEntry.components !== null ? IdesignEntry.components : undefined,
    };

    return safeDesign;
  }

  async findByUserId(userId: string): Promise<IDesignEntry[]> {
    const designs = await prisma.design.findMany({
      where: {
        userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Transform each designs to ensure 'components' conforms to 'object | undefined'
    const safeDesigns = designs.map(IdesignEntry => ({
      ...IdesignEntry,
      components: typeof IdesignEntry.components === 'object' && IdesignEntry.components !== null ? IdesignEntry.components : undefined,
      imageUrl: IdesignEntry.imageUrl !== null ? IdesignEntry.imageUrl : undefined, // Ensure 'imageUrl' conforms to 'string | undefined'
    }));

    return safeDesigns;
  }

  async getUserDesignById(userId: string, design_id: string): Promise<IDesignEntry | null> {
    const IdesignEntry = await prisma.design.findFirst({
      where: {
        userId,
        id: design_id,
      },
    });

    if (!IdesignEntry) return null;

    // Transform 'components' to ensure it conforms to 'object | undefined'
    const safeComponents = typeof IdesignEntry.components === 'object' && IdesignEntry.components !== null ? IdesignEntry.components : undefined;
    const safeImageUrl = IdesignEntry.imageUrl !== null ? IdesignEntry.imageUrl : undefined; // Ensure 'imageUrl' conforms to 'string | undefined'

    // Construct a safeDesign object that conforms to the IDesignEntry interface
    const safeDesign: IDesignEntry = {
      ...IdesignEntry,
      components: safeComponents,
      imageUrl: safeImageUrl,
    };

    return safeDesign;
  }

  async deleteUserDesign(userId: string, design_id: string): Promise<boolean> {
    await prisma.design.delete({
      where: {
        userId,
        id: design_id,
      },
    });
    return true;
  }
}
