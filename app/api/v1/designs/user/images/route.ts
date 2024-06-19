import {NextRequest, NextResponse} from "next/server";
import {PrismaUserImageRepository} from "@/infrastructure/adapters/PrismaUserImageRepository";
import {UserImageUseCases} from "@/core/application/use-cases/UserImageUseCases";
import {CloudinaryService} from "@/infrastructure/services/CloudinaryService";
import {getUserId} from "@/utils/authUtils";

export async function GET(req: NextRequest, res: NextResponse){
  const { userId, response } = await getUserId();
  if (!userId) return response;

  const userImageRepository = new PrismaUserImageRepository();
  const cloudinaryService = new CloudinaryService();
  const userImageUseCases = new UserImageUseCases(userImageRepository, cloudinaryService);

  try {
    const images = await userImageUseCases.getUserImages(userId);
    return new Response(JSON.stringify({ status: 'success', data: { images } }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error processing request" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function POST (req: NextRequest, res: NextResponse){
  const { userId, response } = await getUserId();
  if (!userId) return response;

  const data = await req.formData();
  const image = data.get('image') as string;
  if(!image) return new Response(JSON.stringify({ message: "No image found in request" }), { status: 400, headers: { 'Content-Type': 'application/json' } });

  const userImageRepository = new PrismaUserImageRepository();
  const cloudinaryService = new CloudinaryService();
  const userImageUseCases = new UserImageUseCases(userImageRepository, cloudinaryService);

  try {
    const userImage = await userImageUseCases.uploadUserImage(userId, image);
    return new Response(JSON.stringify({ status: 'success', data: { image: userImage } }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error processing request" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

}