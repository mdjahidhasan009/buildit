import { NextRequest } from "next/server";
import { PrismaDesignRepository } from "@/infrastructure/adapters/PrismaDesignRepository";
import { DesignUseCases } from "@/core/application/use-cases/DesignUseCases";
import { PrismaTemplateRepository } from "@/infrastructure/adapters/PrismaTemplateRepository";
import { CloudinaryService } from "@/infrastructure/services/CloudinaryService";
import {auth} from "@/auth";

export async function GET(req: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return new Response(JSON.stringify({ message: "Authentication required12" }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }

  const prismaDesignRepository = new PrismaDesignRepository();
  const prismaTemplateRepository = new PrismaTemplateRepository();
  const cloudinaryService = new CloudinaryService();
  const designUseCases = new DesignUseCases(prismaDesignRepository, prismaTemplateRepository, cloudinaryService);

  try {
    const designs = await designUseCases.getUserDesigns(userId);
    return new Response(JSON.stringify({ status: 'success', data: { designs } }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error processing request" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}
