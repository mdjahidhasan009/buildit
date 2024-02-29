import {NextRequest, NextResponse} from "next/server";
import {requestHandler} from "@/utils/requestHandlerFactory";
import {PrismaUserImageRepository} from "@/infrastructure/adapters/PrismaUserImageRepository";
import {UserImageUseCases} from "@/core/application/use-cases/UserImageUseCases";
import {CloudinaryService} from "@/infrastructure/services/CloudinaryService";

export async function GET(req: NextRequest, res: NextResponse){
  // const data = await designController.getUserImages(req, res);
  // return NextResponse.json(data, { status: 200 });

  const [_, userId, earlyAbortRequest] = await requestHandler({ requireAuth: true, expectBody: false })(req);
  if (earlyAbortRequest) return earlyAbortRequest;
  if(!userId) return new Response(JSON.stringify({ message: "Authentication required" }), { status: 401, headers: { 'Content-Type': 'application/json' } });

  const userImageRepository = new PrismaUserImageRepository();
  const cloudinaryService = new CloudinaryService();
  const userImageUseCases = new UserImageUseCases(userImageRepository, cloudinaryService);

  try {
    const images = await userImageUseCases.getUserImages(userId);
    return new Response(JSON.stringify({ status: 'success', data: { images } }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    // return NextResponse.json(
    //   {
    //     status: 'success',
    //     data: {
    //         images
    //     }
    //   }, { status: 200 }
    // );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error processing request" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    // return NextResponse.json({ message: "Error processing request", detail: error.message }, { status: 400 });
  }
}

export async function POST (req: NextRequest, res: NextResponse){
  const [_, userId, earlyAbortRequest] = await requestHandler({ requireAuth: true, expectBody: false })(req);
  if (earlyAbortRequest) return earlyAbortRequest;
  if(!userId) return new Response(JSON.stringify({ message: "Authentication required" }), { status: 401, headers: { 'Content-Type': 'application/json' } });

  const data = await req.formData();
  const image = data.get('image') as string;
  if(!image) return new Response(JSON.stringify({ message: "No image found in request" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  // if(!image) return NextResponse.json({ message: "No image found in request" }, { status: 400 });

  const userImageRepository = new PrismaUserImageRepository();
  const cloudinaryService = new CloudinaryService();
  const userImageUseCases = new UserImageUseCases(userImageRepository, cloudinaryService);

  try {
    const userImage = await userImageUseCases.uploadUserImage(userId, image);
    return new Response(JSON.stringify({ status: 'success', data: { image: userImage } }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    // return NextResponse.json({
    //   status: 'success',
    //   data: {
    //     image: userImage
    //   }
    // }, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error processing request" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    // return NextResponse.json({ message: "Error processing request", detail: error.message }, { status: 400 });
  }

}