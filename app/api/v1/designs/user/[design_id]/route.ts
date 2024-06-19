import { NextRequest, NextResponse } from "next/server";
import {PrismaDesignRepository} from "@/infrastructure/adapters/PrismaDesignRepository";
import {PrismaTemplateRepository} from "@/infrastructure/adapters/PrismaTemplateRepository";
import {CloudinaryService} from "@/infrastructure/services/CloudinaryService";
import {DesignUseCases} from "@/core/application/use-cases/DesignUseCases";
import {getUserId} from "@/utils/authUtils";

export async function GET(req: NextRequest, params: { params: { design_id: string } }, res: NextResponse){
  const { userId, response } = await getUserId();
  if (!userId) return response;

  const { params: { design_id } }  = params;
  if(!design_id) return new Response(JSON.stringify({ message: "Design id is required" }), { status: 400, headers: { 'Content-Type': 'application/json' } });

  const designRepository = new PrismaDesignRepository();
  const templateRepository = new PrismaTemplateRepository();
  const cloudinaryService = new CloudinaryService();
  const designUseCases = new DesignUseCases(designRepository, templateRepository, cloudinaryService);

  try {
    const userDesign = await designUseCases.getUserDesignById(userId, design_id);
    return new Response(JSON.stringify({ status: 'success', data: { design: userDesign?.components } }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error processing request" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function PUT (req: NextRequest, params: { params: { design_id: string } }, res: NextResponse){
  const { userId, response } = await getUserId();
  if (!userId) return response;

  const data = await req.formData();
  const base64Image = data.get('image')
  let componentsString: string | File = data.get('design') || "";
  const { params: { design_id } }  = params;

  const designRepository = new PrismaDesignRepository();
  const templateRepository = new PrismaTemplateRepository();
  const cloudinaryService = new CloudinaryService();
  const designUseCases = new DesignUseCases(designRepository, templateRepository, cloudinaryService);

  try {
    const createdDesign = await designUseCases.updateDesign(design_id, componentsString, base64Image as string);
    return new Response(JSON.stringify({ status: 'success', data: { message: 'Design updated successfully' } }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error processing request" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function DELETE(req: NextRequest, params: { params: { design_id: string } }, res: NextResponse){
  const { userId, response } = await getUserId();
  if (!userId) return response;

  const { params: { design_id } }  = params;
  if(!design_id) return new Response(JSON.stringify({ message: "Design id is required" }), { status: 400, headers: { 'Content-Type': 'application/json' } });

  const designRepository = new PrismaDesignRepository();
  const templateRepository = new PrismaTemplateRepository();
  const cloudinaryService = new CloudinaryService();
  const designUseCases = new DesignUseCases(designRepository, templateRepository, cloudinaryService);

  try {
    const userDesign = await designUseCases.deleteUserDesign(userId, design_id);
    return new Response(JSON.stringify({ status: 'success', data: { message: 'Design deleted successfully' } }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error processing request" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}