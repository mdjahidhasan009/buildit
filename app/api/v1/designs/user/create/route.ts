import {NextRequest, NextResponse} from "next/server";
import {PrismaDesignRepository} from "@/infrastructure/adapters/PrismaDesignRepository";
import {DesignUseCases} from "@/core/application/use-cases/DesignUseCases";
import {PrismaTemplateRepository} from "@/infrastructure/adapters/PrismaTemplateRepository";
import {CloudinaryService} from "@/infrastructure/services/CloudinaryService";
import {getUserId} from "@/utils/authUtils";

export async function POST(req: NextRequest, res: NextResponse){
  const { userId, response } = await getUserId();
  if (!userId) return response;

  const data = await req.formData();
  const base64Image = data.get('image')
  let componentsString: string | File = data.get('design') || "";

  const designRepository = new PrismaDesignRepository();
  const templateRepository = new PrismaTemplateRepository();
  const cloudinaryService = new CloudinaryService();
  const designUseCases = new DesignUseCases(designRepository, templateRepository, cloudinaryService);

  try {
    const createdDesign = await designUseCases.createDesign(userId, componentsString, base64Image as string);
    return new Response(JSON.stringify({ message: "Design Created", data: { design: createdDesign } }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error processing request" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}