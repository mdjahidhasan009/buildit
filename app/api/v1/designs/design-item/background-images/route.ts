import {NextRequest, NextResponse} from "next/server";
import {PrismaBackgroundImageRepository} from "@/infrastructure/adapters/PrismaBackgroundImageRepository";
import {BackgroundImageUseCases} from "@/core/application/use-cases/BackgroundImageUseCases";
import {getUserId} from "@/utils/authUtils";

export async function GET(req: NextRequest, res: NextResponse){
  const { userId, response } = await getUserId();
  if (!userId) return response;

  const backgroundImageRepository = new PrismaBackgroundImageRepository();
  const backgroundImageUseCases = new BackgroundImageUseCases(backgroundImageRepository);

  try {
    const images = await backgroundImageUseCases.getBackgroundImages();
    return new Response(JSON.stringify({ status: 'success', data: { images } }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error processing request" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}