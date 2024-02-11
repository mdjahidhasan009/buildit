// infrastructure/adapters/PrismaUserImageRepository.ts

import { PrismaClient } from '@prisma/client';
import { IUserImageRepository } from '@/core/application/ports/IUserImageRepository';
import { UserImage } from '@/core/domain/entities/UserImage';

const prisma = new PrismaClient();

export class PrismaUserImageRepository implements IUserImageRepository {
  async uploadImage(userId: string, image: Buffer, imageName: string): Promise<UserImage> {
    // Assuming a method exists to handle the buffer to URL conversion, not directly supported by Prisma
    const imageUrl = await this.uploadToCloudinary(image, imageName); // Placeholder for actual upload logic
    return prisma.userImage.create({
      data: {
        userId,
        imageUrl,
      },
    });
  }

  async findByUserId(userId: string): Promise<UserImage[]> {
    return prisma.userImage.findMany({
      where: { userId },
    });
  }

  async delete(id: string): Promise<boolean> {
    await prisma.userImage.delete({
      where: { id },
    });
    return true;
  }

  private async uploadToCloudinary(image: Buffer, imageName: string): Promise<string> {
    // Placeholder for actual Cloudinary upload logic
    return "https://example.com/image-url";
  }
}
