import {NextRequest, NextResponse} from "next/server";
import {PrismaTemplateRepository} from "@/infrastructure/adapters/PrismaTemplateRepository";
import {TemplateUseCases} from "@/core/application/use-cases/TemplateUseCases";
import {getUserId} from "@/utils/authUtils";

export async function GET(req: NextRequest, res: NextResponse){
  const { userId, response } = await getUserId();
  if (!userId) return response;

  const templateRepository = new PrismaTemplateRepository();
  const templateUseCases = new TemplateUseCases(templateRepository);

  try {
    const templates = await templateUseCases.getAllTemplates();
    return new Response(JSON.stringify({ status: 'success', data: { templates } }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error processing request" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}