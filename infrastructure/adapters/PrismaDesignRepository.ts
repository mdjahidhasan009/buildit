// import { PrismaClient } from '@prisma/client';
// import { IDesignRepository } from '@/core/application/ports/IDesignRepository';
// import { Design } from '@/core/domain/entities/Design';
//
// const prisma = new PrismaClient();
//
// export class PrismaDesignRepository implements IDesignRepository {
//   async create(designData: Partial<Design>): Promise<Design> {
//     const createdDesign = await prisma.designs.create({
//       data: designData,
//     });
//     return createdDesign;
//   }
//
//   async update(id: string, designData: Partial<Design>): Promise<Design> {
//     const updatedDesign = await prisma.designs.update({
//       where: { id },
//       data: designData,
//     });
//     return updatedDesign;
//   }
//
//   async delete(id: string): Promise<boolean> {
//     await prisma.designs.delete({
//       where: { id },
//     });
//     return true;
//   }
//
//   async getById(id: string): Promise<Design | null> {
//     const designs = await prisma.designs.findUnique({
//       where: { id },
//     });
//     return designs;
//   }
//
//   async findByUserId(userId: string): Promise<Design[]> {
//     const designs = await prisma.designs.findMany({
//       where: { userId },
//     });
//     return designs;
//   }
// }


// infrastructure/adapters/PrismaDesignRepository.ts

import { PrismaClient } from '@prisma/client';
import { IDesignRepository } from '@/core/application/ports/IDesignRepository';
import { Design } from '@/core/domain/entities/Design';

const prisma = new PrismaClient();

export class PrismaDesignRepository implements IDesignRepository {
  // async create(designData: Partial<Design>): Promise<Design> {
  //   return prisma.designs.create({
  //     data: designData,
  //   });
  // }
  async create(designData: Design): Promise<Design> {
    const createdDesign = await prisma.design.create({
      data: designData,
    });

    return createdDesign as Design;
  }

  // async update(design_id: string, designData: Partial<Design>): Promise<Design> {
  //   return prisma.designs.update({
  //     where: { id: design_id },
  //     data: designData,
  //   });
  // }

  async update(design_id: string, designData: Partial<Design>): Promise<Design> {
    // Validate or transform 'components' here if necessary
    // For example, ensuring it's not 'null' if your schema doesn't allow 'null'
    const safeDesignData = {
      ...designData,
      components: designData.components || {}, // Default to an empty object if null
    };

    return prisma.design.update({
      where: { id: design_id },
      data: safeDesignData,
    }) as Promise<Design>;
  }

  async delete(id: string): Promise<boolean> {
    await prisma.design.delete({
      where: { id },
    });
    return true;
  }

  // async getById(design_id: string): Promise<Design | null> {
  //   return prisma.designs.findUnique({
  //     where: { id: design_id },
  //   });
  // }

  async getById(design_id: string): Promise<Design | null> {
    const design = await prisma.design.findUnique({
      where: { id: design_id },
    });

    if (!design) return null;

    // Adjust handling here to ensure imageUrl is either a string or undefined
    const safeImageUrl = design.imageUrl !== null ? design.imageUrl : undefined;

    // Construct the safeDesign object with adjusted imageUrl and components
    const safeDesign: Design = {
      ...design,
      imageUrl: safeImageUrl,
      components: typeof design.components === 'object' && design.components !== null ? design.components : undefined,
    };

    return safeDesign;
  }

  // async findByUserId(userId: string): Promise<Design[]> {
  //   const desgins = await prisma.designs.findMany({
  //     where: {
  //       userId
  //     },
  //     orderBy: {
  //       createdAt: 'desc'
  //     }
  //   });
  //
  //   return desgins;
  // }

  async findByUserId(userId: string): Promise<Design[]> {
    const designs = await prisma.design.findMany({
      where: {
        userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Transform each designs to ensure 'components' conforms to 'object | undefined'
    const safeDesigns = designs.map(design => ({
      ...design,
      components: typeof design.components === 'object' && design.components !== null ? design.components : undefined,
      imageUrl: design.imageUrl !== null ? design.imageUrl : undefined, // Ensure 'imageUrl' conforms to 'string | undefined'
    }));

    return safeDesigns;
  }

  // async getUserDesignById(userId: string, design_id: string): Promise<Design | null> {
  //   const designs = await prisma.designs.findFirst({
  //     where: {
  //       userId,
  //       id: design_id,
  //     },
  //   });
  //
  //   return designs;
  // }

  async getUserDesignById(userId: string, design_id: string): Promise<Design | null> {
    const design = await prisma.design.findFirst({
      where: {
        userId,
        id: design_id,
      },
    });

    if (!design) return null;

    // Transform 'components' to ensure it conforms to 'object | undefined'
    const safeComponents = typeof design.components === 'object' && design.components !== null ? design.components : undefined;
    const safeImageUrl = design.imageUrl !== null ? design.imageUrl : undefined; // Ensure 'imageUrl' conforms to 'string | undefined'

    // Construct a safeDesign object that conforms to the Design interface
    const safeDesign: Design = {
      ...design,
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
