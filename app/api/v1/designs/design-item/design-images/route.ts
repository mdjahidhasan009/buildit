import {NextRequest, NextResponse} from "next/server";
import {PrismaDesignImageRepository} from "@/infrastructure/adapters/PrismaDesignImageRepository";
import {DesignImageUseCases} from "@/core/application/use-cases/DesignImageUseCases";
import {getUserId} from "@/utils/authUtils";

export async function GET(req: NextRequest, res: NextResponse){
  const { userId, response } = await getUserId();
  if (!userId) return response;

  const designImageRepository = new PrismaDesignImageRepository();
  const designUseCases = new DesignImageUseCases(designImageRepository);

  try {
    const images = await designUseCases.getDesignImages();
    return new Response(JSON.stringify({ status: 'success', data: { images } }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error processing request" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}