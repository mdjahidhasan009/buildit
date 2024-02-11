// import { PrismaClient } from '@prisma/client';
// import { IDesignRepository } from '@/core/application/ports/IDesignRepository';
// import { Design } from '@/core/domain/entities/Design';
//
// const prisma = new PrismaClient();
//
// export class PrismaDesignRepository implements IDesignRepository {
//   async create(designData: Partial<Design>): Promise<Design> {
//     const createdDesign = await prisma.design.create({
//       data: designData,
//     });
//     return createdDesign;
//   }
//
//   async update(id: string, designData: Partial<Design>): Promise<Design> {
//     const updatedDesign = await prisma.design.update({
//       where: { id },
//       data: designData,
//     });
//     return updatedDesign;
//   }
//
//   async delete(id: string): Promise<boolean> {
//     await prisma.design.delete({
//       where: { id },
//     });
//     return true;
//   }
//
//   async getById(id: string): Promise<Design | null> {
//     const design = await prisma.design.findUnique({
//       where: { id },
//     });
//     return design;
//   }
//
//   async findByUserId(userId: string): Promise<Design[]> {
//     const designs = await prisma.design.findMany({
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
  async create(designData: Partial<Design>): Promise<Design> {
    return prisma.design.create({
      data: designData,
    });
  }

  async update(design_id: string, designData: Partial<Design>): Promise<Design> {
    return prisma.design.update({
      where: { id: design_id },
      data: designData,
    });
  }

  async delete(id: string): Promise<boolean> {
    await prisma.design.delete({
      where: { id },
    });
    return true;
  }

  async getById(design_id: string): Promise<Design | null> {
    return prisma.design.findUnique({
      where: { id: design_id },
    });
  }

  async findByUserId(userId: string): Promise<Design[]> {
    return prisma.design.findMany({
      where: { userId },
    });
  }
}
