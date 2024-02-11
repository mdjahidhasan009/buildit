import {NextApiRequest, NextApiResponse} from "next";
import designController from "@/controllers/DesignController";
import {NextRequest, NextResponse} from "next/server";
import {requestHandler} from "@/utils/requestHandlerFactory";
import {PrismaUserImageRepository} from "@/infrastructure/adapters/PrismaUserImageRepository";
import {UserImageUseCases} from "@/core/application/use-cases/UserImageUseCases";
import {CloudinaryService} from "@/infrastructure/services/CloudinaryService";

export async function GET(req: NextRequest, res: NextResponse){
  // const data = await designController.getUserImages(req, res);
  // return NextResponse.json(data, { status: 200 });

  const [_, userId, earlyAbortRequest] = await requestHandler({ requireAuth: true, expectBody: false })(req);
  if (earlyAbortRequest || !userId) return earlyAbortRequest;

  const userImageRepository = new PrismaUserImageRepository();
  const cloudinaryService = new CloudinaryService();
  const userImageUseCases = new UserImageUseCases(userImageRepository, cloudinaryService);

  try {
    const images = await userImageUseCases.getUserImages(userId);
    return NextResponse.json(
      {
        status: 'success',
        data: {
            images
        }
      }, { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error processing request", detail: error.message }, { status: 400 });
  }
}

export async function POST (req: NextRequest, params, res: NextResponse){
  // const data = await designController.uploadImage(req, res, params);
  // return NextResponse.json(data, { status: 200 });

  const [_, userId, earlyAbortRequest] = await requestHandler({ requireAuth: true, expectBody: false })(req);
  if (earlyAbortRequest || !userId) return earlyAbortRequest;

  const data = await req.formData();
  const image = data.get('image') as string;
  if(!image) return NextResponse.json({ message: "No image found in request" }, { status: 400 });

  const userImageRepository = new PrismaUserImageRepository();
  const cloudinaryService = new CloudinaryService();
  const userImageUseCases = new UserImageUseCases(userImageRepository, cloudinaryService);

  try {
    const userImage = await userImageUseCases.uploadUserImage(userId, image);
    return NextResponse.json({
      status: 'success',
      data: {
        image: userImage
      }
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error processing request", detail: error.message }, { status: 400 });
  }

}