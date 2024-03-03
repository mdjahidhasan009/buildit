import { PrismaClient } from '@prisma/client';
import { IViewRepository } from '@/core/application/ports/IViewRepository';
import { View } from '@/core/domain/entities/View';

const prisma = new PrismaClient();
//
// export class PrismaViewRepository implements IViewRepository {
//   async findBySnippetId(snippetId: string): Promise<View | null> {
//     return prisma.view.findUnique({
//       where: { snippetId },
//     });
//   }
//
//   async create(viewData: Partial<View>): Promise<View> {
//     return prisma.view.create({
//       data: viewData,
//     });
//   }
//
//   async update(snippetId: string, viewData: Partial<View>): Promise<View> {
//     return prisma.view.update({
//       where: { snippetId },
//       data: viewData,
//     });
//   }
//
//   async increaseViewCount(snippetId: string): Promise<View> {
//     return prisma.view.update({
//     where: {
//       snippetId: snippetId,
//     },
//     data: {
//       count: {
//         increment: 1,
//       },
//     },
//   });
//   }
// }



export class PrismaViewRepository implements IViewRepository {
  async findBySnippetId(snippetId: string): Promise<View | null> {
    return prisma.view.findUnique({
      where: { snippetId },
    });
  }

  async create(viewData: Partial<View> & { snippetId: string }): Promise<View> {
    // Ensure that `viewData` contains `snippetId` and any other required fields
    return prisma.view.create({
      data: viewData,
    });
  }

  async update(snippetId: string, viewData: Partial<View>): Promise<View> {
    // It might be necessary to handle `viewData` similarly to `create` if there are required fields
    return prisma.view.update({
      where: { snippetId },
      data: viewData,
    });
  }

  async increaseViewCount(snippetId: string): Promise<View> {
    // This method should work as expected, assuming `snippetId` is correctly passed
    return prisma.view.update({
      where: {
        snippetId: snippetId,
      },
      data: {
        count: {
          increment: 1,
        },
      },
    });
  }
}
